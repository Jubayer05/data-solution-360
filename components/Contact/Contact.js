import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../firebase';

const initialState = {
  name: '',
  email: '',
  message: '',
  subject: '',
};

const Contact = () => {
  const [inputData, setInputData] = useState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputData.name !== '' &&
      inputData.email !== '' &&
      inputData.subject !== '' &&
      inputData.message !== ''
    ) {
      firebase
        .firestore()
        .collection('userContactList')
        .add({
          ...inputData,
          id: uuidv4().split('-')[0],
        })
        .then(() => {
          alert('Your message was successfully sent!');
          window.location.reload();
        })
        .catch((error) => {
          alert(error.message + '' + 'Something went wrong');
        });
    } else {
      alert('Please check your input data.');
    }
  };
  return (
    <div className="bg-[#ffffff]">
      <div className="px-4 pt-24 max-w-6xl mx-auto ">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-4xl font-bold font-heading mb-12 text-headerMain	">
            Contact Us / Help Center
          </h2>
          <div className="text-lg text-justify">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="font-semibold mt-3 block">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })
                }
                className="w-full px-4 py-2 outline-none rounded-sm border-1 text-lg mt-3 "
              />
              <label htmlFor="email" className="font-semibold mt-3 block">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) =>
                  setInputData({ ...inputData, email: e.target.value })
                }
                className="w-full px-4 py-2 outline-none rounded-sm border-1 text-lg mt-3 "
              />

              <label htmlFor="subject" className="font-semibold mt-3 block">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                onChange={(e) =>
                  setInputData({ ...inputData, subject: e.target.value })
                }
                className="w-full px-4 py-2 outline-none rounded-sm border-1 text-lg mt-3 "
              />

              <label htmlFor="message" className="font-semibold mt-3 block">
                Message
              </label>
              <textarea
                id="message"
                type="text"
                rows="6"
                onChange={(e) =>
                  setInputData({ ...inputData, message: e.target.value })
                }
                className="w-full px-4 py-2 outline-none rounded-sm border-1 text-lg mt-3 "
              />
              <div className="text-center flex justify-center">
                <button
                  type="submit"
                  style={{
                    borderRadius: '5px',
                  }}
                  className={`text-md px-3 py-2 hover:drop-shadow-xl flex items-center text-gray-300 
                bg-primary-bg transition-all duration-300 ease-linear `}
                  onClick={() => {}}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
