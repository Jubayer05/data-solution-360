import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import firebase from '../../firebase';

const db = firebase.firestore();
const auth = firebase.auth();

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Login = ({ loginStatePhone, setLoginStatePhone }) => {
  const [haveAccount, setHaveAccount] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [userData, setUserData] = useState([]);
  const [adminData, setAdminData] = useState([]);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    db.collection('users').onSnapshot((snap) => {
      const userData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(userData);
    });
    db.collection('dashboard_users').onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAdminData(data);
    });
  }, []);

  const findAdminData = adminData.find((item) => item.email === formData.email);

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
            if (validUser) {
              if (validUser.status === 'student') {
                Swal.fire(
                  'Hey!',
                  'You are successfully logged in.',
                  'success',
                ).then(() => {
                  window.location.href = '/students/dashboard';
                });
              }
            }
          })
          .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
          });
      } else if (
        adminData.find((item) => item.email === formData.email) !== undefined
      ) {
        auth
          .signInWithEmailAndPassword(formData.email, formData.password)
          .then((userCredential) => {
            const user = userCredential.user;
            if (findAdminData) {
              if (findAdminData.role === 'admin') {
                Swal.fire(
                  'Hey!',
                  'You are successfully logged in.',
                  'success',
                ).then(() => {
                  window.location.href = '/students/dashboard';
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
      Swal.fire('Hey!', 'Please Provide a valid email', 'error');
    }
  };

  const handleCreateAccount = () => {
    if (findAdminData) {
      if (validateEmail(formData.email)) {
        if (formData.password === formData.confirmPassword) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then((userCredential) => {
              const user = userCredential.user;
              if (user) {
                db.collection('users')
                  .add({
                    email: user.email,
                    role: 'admin',
                  })
                  .then(() => {
                    Swal.fire(
                      'Hey!',
                      'You are successfully registered.',
                      'success',
                    ).then(() => {
                      window.location.href = '/';
                    });
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
    } else {
      Swal.fire(
        'Something went wrong!',
        'Please try to login with phone number.',
        'error',
      );
    }
    // alert('Comming soon. Use google login now.');
  };

  return (
    <div className="font-body bg-cover bg-center bg-no-repeat py-2 px-5">
      <div className="flex justify-center items-center ">
        <div className="bg-white w-80 sm:w-[450px] rounded-md">
          <p className="pt-4 text-sm font-bold text-gray-500 after:content-['*'] after:ml-0.5 after:text-red-500 ">
            Email
          </p>
          <div
            className="flex items-end"
            style={{ borderBottomColor: '#c6c6c6' }}
          >
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full px-3 py-3 text-lg border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 block w-full px-3 py-3 text-lg border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              size="large"
              placeholder="Enter password"
              type="password"
            />
          </div>

          {haveAccount && (
            <>
              <p className="pt-4 text-sm font-bold text-gray-500 after:content-['*'] after:ml-0.5 after:text-red-500 ">
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
                  className="mt-1 block w-full px-3 py-3 text-lg border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  size="large"
                  placeholder="Retype password"
                  type="password"
                />
              </div>
            </>
          )}

          {/* {!haveAccount && (
                <p className="text-right text-xs mt-1 font-semibold text-input">
                  <span className="cursor-pointer hover:underline">
                    forgot password
                  </span>
                </p>
              )} */}

          <div className="mt-2">
            <button
              className="w-full bg-primary-bg text-white px-4 py-3 rounded-md hover:bg-[#d85403] 
            transition duration-300 flex items-center justify-center gap-2 text-lg"
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

          <p className="text-center text-sm mt-3">
            {loginStatePhone
              ? ' Or Login with Email and Password'
              : 'Or Login with Phone Number'}
          </p>
          <div className="mt-2">
            <button
              onClick={() => setLoginStatePhone(!loginStatePhone)}
              type="submit"
              className="w-full bg-[#f7d5c0] border-[#fd6404] border-2 px-4 py-3 rounded-md hover:bg-[#f5b993] 
            transition duration-300 flex items-center justify-center gap-2 text-lg font-semibold"
            >
              {loginStatePhone ? 'Login with Email' : 'Login with Phone'}{' '}
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
