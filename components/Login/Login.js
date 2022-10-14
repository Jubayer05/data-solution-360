/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import firebase from "../../firebase";

const db = firebase.firestore();
const auth = firebase.auth();

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
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
    db.collection("userLogin").onSnapshot((snap) => {
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
        fbGoogleLoginFunction(validUser);
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
        fbGoogleLoginFunction(validUser);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const fbGoogleLoginFunction = (validUser) => {
    if (validUser) {
      if (validUser.status === "student" && validUser.registered === false) {
        window.location.href = "/students/register";
      } else if (
        validUser.status === "student" &&
        validUser.registered === true
      ) {
        window.location.href = "/students/dashboard";
      } else if (validUser.status === "admin") {
        window.location.href = "/admin/dashboard";
      }
      localStorage.setItem("userName", user.displayName);
      localStorage.setItem("emailUser", user.email);
    } else {
      db.collection("userLogin").add({
        name: user.displayName,
        email: user.email,
        status: "student",
        registered: false,
      });

      Router.push("/");
      window.location.href = "/";
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
            localStorage.setItem("emailUser", user.email);
            if (validUser) {
              if (validUser.status === "student") {
                Router.push("/join-us/intern");
              } else if (validUser.status === "teacher") {
                Router.push("/dashboard/teacher");
              } else if (validUser.status === "admin") {
                Router.push("/dashboard/admin");
              }
            }
          })
          .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
          });
      } else {
        alert("You are not a seller. Create an account first.");
      }
    } else {
      alert("Please Provide a valid email");
    }
  };

  const handleCreateAccount = () => {
    // if (validateEmail(formData.email)) {
    //   if (formData.password === formData.confirmPassword) {
    //     firebase
    //       .auth()
    //       .createUserWithEmailAndPassword(formData.email, formData.password)
    //       .then((userCredential) => {
    //         const user = userCredential.user;

    //         const validUser = userData.find(
    //           (item) => item.email === user.email
    //         );

    //         // NOTE: HANDLE VERIFICATION EMAIL MESSAGE
    //         if (user !== null) {
    //           user.sendEmailVerification({
    //             url: "https://robo-stem.vercel.app/",
    //           });
    //           alert(
    //             "A verification email has been sent to your email. Please verify your email."
    //           );
    //         }

    //         // NOTE: ADD FIRESTORE DB
    //         if (!validUser) {
    //           db.collection("userLogin").add({
    //             name: formData.email,
    //             email: formData.email,
    //             status: "student",
    //           });
    //         }
    //         localStorage.setItem("emailUser", user.email);
    //         Router.push("/join-us/intern");
    //       })
    //       .catch((error) => {
    //         const errorMessage = error.message;
    //         alert(errorMessage);
    //       });
    //   } else {
    //     alert("Password Doesn't Match");
    //   }
    // } else {
    //   alert("Please Provide a valid email");
    // }
    alert("Comming soon. Use google login now.");
  };

  return (
    <div
      className="py-14"
      style={{ backgroundImage: "linear-gradient(30deg,#62d7e1, #b933dc)" }}
    >
      <div className="flex justify-center items-center min-h-screen	">
        <div className="">
          <div
            className="bg-white  w-72 sm:w-96 p-9 rounded-md"
            style={{ marginTop: "30px" }}
          >
            <h3 className="text-center text-xl font-bold">Login</h3>

            <p className="pt-4 text-xs font-bold text-gray-500 after:content-['*'] after:ml-0.5 after:text-red-500 ">
              Email
            </p>
            <div
              className="flex items-end pb-2 border-b-2	mt-1"
              style={{ borderBottomColor: "#c6c6c6" }}
            >
              <Icon
                icon="clarity:email-line"
                className="text-xl text-gray-400"
              />
              <input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-0 outline-0 block w-full ml-2 text-sm text-input"
                size="large"
                placeholder="Your Email"
                type="email"
              />
            </div>

            <p className="pt-4 text-xs font-bold text-gray-500 after:content-['*'] after:ml-0.5 after:text-red-500 ">
              Password
            </p>
            <div className="flex items-end pb-2 border-b-2	mt-1">
              <Icon icon="bx:lock-alt" className="text-xl text-gray-400" />
              <input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="border-0 outline-0 block w-full ml-2 text-sm text-input"
                size="large"
                placeholder="Enter password"
                type="password"
              />
            </div>

            {haveAccount && (
              <>
                <p className="pt-4 text-xs font-bold text-gray-500 after:content-['*'] after:ml-0.5 after:text-red-500 ">
                  {" "}
                  Confirm Password
                </p>
                <div className="flex items-end pb-2 border-b-2	mt-1">
                  <Icon icon="bx:lock-alt" className="text-xl text-gray-400" />
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="border-0 outline-0 block w-full ml-2 text-sm text-input"
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
                className="w-full border-0 text-white p-2 rounded-full block mt-5"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #64d2db, #e63df6)",
                }}
                onClick={haveAccount ? handleCreateAccount : handleLogin}
              >
                {haveAccount ? "Create Account" : "Login"}
              </button>
            </div>

            <p className="text-xs font-semibold text-input text-center mt-9">
              or sign up using
            </p>

            <div className="flex justify-center items-center mt-4">
              <Icon
                onClick={handleFacebookLogin}
                icon="akar-icons:facebook-fill"
                className="m-1 cursor-pointer text-4xl"
                style={{ color: "#3e548d" }}
              />

              <Icon
                onClick={handleGoogleSignIn}
                icon="akar-icons:google-contained-fill"
                className="m-1 cursor-pointer text-4xl"
                style={{ color: "#d95447" }}
              />
            </div>

            <p className="text-center mt-9">
              {haveAccount ? (
                <span>Already have an account?</span>
              ) : (
                <span>Don&apos;t have an account?</span>
              )}
            </p>
            <p className="text-center uppercase font-semibold text-xs mt-1 text-input">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
