import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Progress, Spin } from "antd";
import { useStateContext } from "../../src/context/ContextProvider";
import Select from "react-select";
import { districts } from "../../src/data/district";
import firebase from "../../firebase";

const Register = () => {
  const { userEmail, findCurrentUser } = useStateContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [progressData, setProgressData] = useState(0);
  const [photoUrl, setPhotoUrl] = useState(null);


  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }

    if (!values.address) {
      errors.address = "Required";
    } else if (values.address.length < 10) {
      errors.address = "Must be 10 characters or more";
    }

    if (!values.phone) {
      errors.phone = "Required";
    } else if (values.phone.length > 14) {
      errors.phone = "Must be 14 characters or less";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      photoUrl: "",
    },
    validate,
    onSubmit: (values) => {
      firebase
        .firestore()
        .collection("userLogin")
        .doc(findCurrentUser.id)
        .update({
          ...values,
          email: userEmail,
          district: selectedOption?.value,
          photoUrl: photoUrl,
        });

      alert("Profile updated successfully!");
    },
  });

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      padding: 20,
    }),
    control: (_, {}) => ({
      display: "flex",
      border: "1px solid #e5e5e5",
      padding: "5px 10px",
      borderRadius: "3px",
    }),
  };

  const handleFileSubmit = (e) => {
    const fileSize = document.getElementById("photoUrl").files[0].size;
    const profileImg = e.target.files[0];

    if (fileSize < 512000) {
      const uploadTask = firebase
        .storage()
        .ref(`profileImage/${userEmail}/${profileImg?.name}`)
        .put(profileImg);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgressData(progress);
        },
        (error) => {
          alert(error.message + "" + "Something went wrong");
        },
        () => {
          firebase
            .storage()
            .ref("profileImage")
            .child(userEmail)
            .child(profileImg?.name)
            .getDownloadURL()
            .then((url) => {
              // NOTE: use this url
              setPhotoUrl(url);
            });
        }
      );
    } else {
      alert("File Size must be under 500kb");
    }
    console.log(fileSize);
  };

  return (
    <div className="pt-20 px-5">
      <h2 className="text-center text-xl text-gray-500 mt-10 mb-6">
        Please Register Before Purchasing a course.
      </h2>

      <div className="max-w-xl mx-auto border-solid border-2 border-gray-300 p-5 my-4">
        <form onSubmit={formik.handleSubmit}>
          {/* NOTE: FIRST NAME */}
          <label htmlFor="firstName">
            First Name{" "}
            {formik.errors.firstName ? (
              <span className="text-xs text-red-600">
                ({formik.errors.firstName})
              </span>
            ) : null}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            className="w-full border px-2 py-3 mb-3 mt-1 rounded-md"
            style={formik.errors.firstName && { border: "2px solid orangered" }}
          />

          {/* NOTE: LAST NAME */}
          <label htmlFor="lastName">
            Last Name{" "}
            {formik.errors.lastName ? (
              <span className="text-xs text-red-600">
                ({formik.errors.lastName})
              </span>
            ) : null}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            className="w-full border px-2 py-3 mb-3 mt-1 rounded-md outline-none"
            style={formik.errors.lastName && { border: "2px solid orangered" }}
          />

          {/* NOTE: EMAIL */}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email || userEmail}
            className="w-full border px-2 py-3 mb-3 mt-1 rounded-md outline-none"
          />

          {/* NOTE: PHONE */}
          <label htmlFor="email">
            Phone{" "}
            {formik.errors.phone ? (
              <span className="text-xs text-red-600">
                ({formik.errors.phone})
              </span>
            ) : null}
          </label>
          <input
            id="phone"
            name="phone"
            type="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="w-full border px-2 py-3 mb-3 mt-1 rounded-md outline-none"
            style={formik.errors.phone && { border: "2px solid orangered" }}
          />

          {/* NOTE: DISTRICTS */}
          <p>District</p>
          <Select
            className="-mt-2 mb-2"
            styles={customStyles}
            options={districts}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
          />

          {/* NOTE: ADDRESS */}
          <label className="pt-2" htmlFor="lastName">
            Address{" "}
            {formik.errors.address ? (
              <span className="text-xs text-red-600">
                ({formik.errors.address})
              </span>
            ) : null}
          </label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.address}
            className="w-full border px-2 py-3 mb-3 mt-1 rounded-md outline-none"
            style={formik.errors.address && { border: "2px solid orangered" }}
          />

          {/* NOTE: UPLOAD IMAGES */}
          {/* <div style={{ textAlign: "center", margin: "15px" }}>
            <Progress
              width={60}
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              type="circle"
              percent={progressData}
            />
          </div>

          <label htmlFor="photoUrl">
            Upload Image{" "}
            <span className="text-xs text-red-500">
              (image must be under 500kb)
            </span>
          </label>
          <input
            type="file"
            id="photoUrl"
            name="photoUrl"
            onChange={handleFileSubmit}
            className="w-full border px-2 py-3 mb-3 mt-1 rounded-md outline-none"
          /> */}

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-orange-300 text-white px-3 py-2 rounded-lg "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
