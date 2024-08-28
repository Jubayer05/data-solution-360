import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../firebase';
import Image from 'next/image';

const db = firebase.firestore();
const auth = firebase.auth();

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

const Login = () => {
  const [haveAccount, setHaveAccount] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [userData, setUserData] = useState([]);

  const Router = useRouter();
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    db.collection('userLogin').onSnapshot((snap) => {
      const userData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(userData);
    });
  }, []);

  const handleFacebookLogin = () => {
    auth
      .signInWithPopup(facebookProvider)
      .then((result) => {
        const user = result.user;
        const validUser = userData.find((item) => item.email === user.email);
        fbGoogleLoginFunction(validUser, user);
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        const validUser = userData.find((item) => item.email === user.email);
        fbGoogleLoginFunction(validUser, user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const fbGoogleLoginFunction = (validUser, user) => {
    localStorage.setItem('userName', user.displayName);
    localStorage.setItem('emailUser', user.email);
    localStorage.setItem('photoUrl', user.photoURL);

    if (validUser) {
      if (validUser.status === 'student' && validUser.registered === false) {
        window.location.href = '/students/register';
      } else if (
        validUser.status === 'student' &&
        validUser.registered === true
      ) {
        window.location.href = '/students/dashboard';
      } else if (validUser.status === 'admin') {
        window.location.href = '/admin/dashboard';
      }
    } else {
      db.collection('userLogin')
        .add({
          name: user.displayName,
          photoUrl: user.photoURL,
          email: user.email,
          status: 'student',
          registered: false,
        })
        .then(() => {
          window.location.href = '/';
        });
    }
  };

  const handleLogin = () => {
    const validUser = userData.find((item) => item.email === formData.email);

    if (validateEmail(formData.email)) {
      if (
        userData.find((item) => item.email === formData.email) !== undefined
      ) {
        auth
          .signInWithEmailAndPassword(formData.email, formData.password)
          .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('emailUser', user.email);
            if (validUser) {
              if (validUser.status === 'student') {
                Swal.fire(
                  'Hey!',
                  'You are successfully logged in.',
                  'success',
                ).then(() => {
                  window.location.href = '/students/dashboard';
                });
              } else if (validUser.status === 'teacher') {
                Swal.fire(
                  'Hey!',
                  'You are successfully logged in.',
                  'success',
                ).then(() => {
                  window.location.href = '/teacher/dashboard';
                });
              } else if (validUser.status === 'admin') {
                Swal.fire(
                  'Hey!',
                  'You are successfully logged in.',
                  'success',
                ).then(() => {
                  window.location.href = '/admin/dashboard';
                });
              }
            }
          })
          .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
          });
      } else {
        Swal.fire(
          'Hey!',
          'Please check your email and password again!',
          'error',
        );
      }
    } else {
      console.log(formData.email);
      Swal.fire('Hey!', 'Please Provide a valid email', 'error');
    }
  };

  const handleCreateAccount = () => {
    if (validateEmail(formData.email)) {
      if (formData.password === formData.confirmPassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(formData.email, formData.password)
          .then((userCredential) => {
            const user = userCredential.user;

            const validUser = userData.find(
              (item) => item.email === user.email,
            );

            // NOTE: ADD FIRESTORE DB
            if (!validUser) {
              db.collection('userLogin')
                .add({
                  name: formData.email,
                  email: formData.email,
                  status: 'student',
                })
                .then(() => {
                  localStorage.setItem('emailUser', user.email);
                  // NOTE: HANDLE VERIFICATION EMAIL MESSAGE
                  if (user !== null) {
                    user.sendEmailVerification({
                      url: 'https://datasolution360.com/',
                    });
                    Swal.fire(
                      'Hey!',
                      'A verification email has been sent to your email. Please verify your email.',
                      'success',
                    ).then(() => {
                      window.location.href = '/students/register';
                    });
                  }
                })
                .catch(() => {
                  Swal.fire('Can not create account', 'error');
                });
            }
          })
          .catch((error) => {
            const errorMessage = error.message;
            Swal.fire(errorMessage, 'error');
            // alert(errorMessage);
          });
      } else {
        Swal.fire('Hey!', 'Your password does not match!', 'error');
      }
    } else {
      Swal.fire('Hey!', 'Please Provide a valid email', 'error');
    }
    // alert('Comming soon. Use google login now.');
  };

  return (
    <div
      className=" bg-slate-200 font-body bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Background/login.jpg')" }}
    >
      <div className="bg-[#000000dd] py-2">
        <div className="flex justify-center items-center min-h-[90vh]	">
          <div className="">
            <div
              className="bg-white w-80 sm:w-[450px] p-9 rounded-md"
              style={{ marginTop: '30px' }}
            >
              <Link href="/">
                <Image
                  width={500}
                  height={300}
                  className="w-[100px] mx-auto mb-5"
                  src="/logo/logo.png"
                  alt=""
                />
              </Link>
              <h3 className="text-center text-2xl font-bold">Login</h3>

              <p className="pt-4 text-sm font-bold text-gray-500 after:content-['*'] after:ml-0.5 after:text-red-500 ">
                Email
              </p>
              <div
                className="flex items-end pb-2"
                style={{ borderBottomColor: '#c6c6c6' }}
              >
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border-2 rounded-md outline-0 block w-full px-2 py-3 text-base text-input"
                  size="large"
                  placeholder="Your Email"
                  type="email"
                />
              </div>

              <p className="pt-4 text-sm font-bold text-gray-500 after:content-['*'] after:ml-0.5 after:text-red-500 ">
                Password
              </p>
              <div className="flex items-end pb-2">
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="border-2 rounded-md outline-0 block w-full px-2 py-3 text-base text-input"
                  size="large"
                  placeholder="Enter password"
                  type="password"
                />
              </div>

              {haveAccount && (
                <>
                  <p className="pt-4 text-sm font-bold text-gray-500 after:content-['*'] after:ml-0.5 after:text-red-500 ">
                    {' '}
                    Confirm Password
                  </p>
                  <div className="flex items-end pb-2 ">
                    <input
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="border-2 rounded-md outline-0 block w-full px-2 py-3 text-base text-input"
                      size="large"
                      placeholder="Retype password"
                      type="password"
                    />
                  </div>
                </>
              )}

              {!haveAccount && (
                <p className="text-right text-xs mt-1 font-semibold text-input">
                  <span className="cursor-pointer hover:underline">
                    forgot password
                  </span>
                </p>
              )}

              <div>
                <button
                  className="w-full border-0 text-white p-2 rounded-full block mt-5 bg-primary-bg"
                  onClick={haveAccount ? handleCreateAccount : handleLogin}
                >
                  {haveAccount ? 'Create Account' : 'Login'}
                </button>
              </div>

              <p className="text-center mt-5 text-sm">
                {haveAccount ? (
                  <span>Already have an account?</span>
                ) : (
                  <span>Don&apos;t have an account?</span>
                )}
              </p>
              <p className="text-center uppercase font-semibold text-sm mt-1 text-input">
                {haveAccount ? (
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => setHaveAccount(!haveAccount)}
                  >
                    sign in
                  </span>
                ) : (
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => setHaveAccount(!haveAccount)}
                  >
                    sign up
                  </span>
                )}
              </p>

              <p className="text-sm font-semibold text-input text-center mt-9">
                or sign up using
              </p>

              <div className="flex justify-center items-center mt-4">
                {/* <PhoneLogin /> */}

                <Icon
                  onClick={handleFacebookLogin}
                  icon="akar-icons:facebook-fill"
                  className="m-2 cursor-pointer text-5xl"
                  style={{ color: '#3e548d' }}
                />

                <Icon
                  onClick={handleGoogleSignIn}
                  icon="akar-icons:google-contained-fill"
                  className="m-2 cursor-pointer text-5xl"
                  style={{ color: '#d95447' }}
                />
              </div>

              <p className="text-center mt-4">
                By continuing, you are indicating that you accept our{' '}
                <Link
                  href="/terms-and-conditions"
                  className="text-blue-500 visited:text-blue-500 font-medium"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy-policy"
                  className="text-blue-500 visited:text-blue-500 font-medium"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
