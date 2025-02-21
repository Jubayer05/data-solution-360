import React, { useEffect, useState } from 'react';
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

const Login = ({ state, setState }) => {
  const [haveAccount, setHaveAccount] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [userData, setUserData] = useState([]);

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
  }, []);

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!validateEmail(email)) {
      return Swal.fire('Hey!', 'Please provide a valid email', 'error');
    }

    const validUser = userData.find((item) => item.email === email);

    if (validUser) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          if (user) {
            // Call API to generate and set the token in cookies
            try {
              const response = await fetch('/api/auth/loginAdmin', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
              });

              if (response.ok) {
                Swal.fire(
                  'Success!',
                  'You are successfully logged in.',
                  'success',
                ).then(() => {
                  window.location.href = '/admin/dashboard'; // Redirect user after login
                });
              } else {
                Swal.fire(
                  'Error!',
                  'Something went wrong while setting authentication.',
                  'error',
                );
              }
            } catch (error) {
              Swal.fire('Error!', 'Failed to set authentication.', 'error');
            }
          }
        })
        .catch(() => {
          Swal.fire('Error!', 'No user found with this email.', 'error');
        });
    } else {
      Swal.fire('Hey!', 'Please check your email and password again!', 'error');
    }
  };

  const handleCreateAccount = () => {
    const findAdminData = userData.find(
      (item) => item.email === formData.email,
    );
    if (findAdminData) {
      if (validateEmail(formData.email)) {
        if (formData.password === formData.confirmPassword) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then((userCredential) => {
              const user = userCredential.user;
              if (user) {
                Swal.fire(
                  'Hey!',
                  'You are successfully registered.',
                  'success',
                ).then(() => {
                  window.location.href = '/';
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

          <div className="flex justify-center mt-3">
            <button
              onClick={() => setState('phone_login')}
              className="text-primary-bg hover:text-[#f0772c] text-sm font-semibold"
            >
              {state == 'phone_login' || state == 'phone_signup'
                ? 'Or Login with Email'
                : 'Or Login with Phone Number'}
            </button>
          </div>
          {/* <div className="mt-2">
            <button
              onClick={() => setState('phone_login')}
              type="submit"
              className="w-full bg-[#f7d5c0] border-[#fd6404] border-2 px-4 py-3 rounded-md hover:bg-[#f5b993] 
            transition duration-300 flex items-center justify-center gap-2 text-lg font-semibold"
            >
              {state == 'phone_login' || state == 'phone_signup'
                ? 'Login with Email'
                : 'Login with Phone'}{' '}
              <ArrowRight size={16} />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
