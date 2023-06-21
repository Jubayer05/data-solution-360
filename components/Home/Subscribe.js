import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../firebase';

const Subscribe = () => {
  const [value, setValue] = useState('');
  const [emails, setEmails] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await firebase
        .firestore()
        .collection('subscripted_user')
        .get();
      const fetchedData = querySnapshot.docs.map((doc) => doc.data());
      setData(fetchedData);
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const validateEmail = (email) => {
    const regexPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regexPattern.test(email);
  };

  const handleSubscribe = () => {
    const alreadySubscribed = data.find((data) => data.email === value);
    const isValidEmail = validateEmail(value);

    if (!alreadySubscribed && isValidEmail) {
      firebase
        .firestore()
        .collection('subscripted_user')
        .add({ email: value })
        .then(() => {
          Swal.fire({
            title: 'Remember',
            text: 'By entering email, you agree to our terms, condition and privacy policy',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Okay',
          });
          setValue('');
        })
        .catch((err) => {
          Swal.fire('Hello!', 'Something went wrong!', 'error');
        });
    } else if (alreadySubscribed && isValidEmail) {
      Swal.fire('Hey!', 'You already subscribe to our newsletter.', 'warning');
    } else {
      Swal.fire('Hey!', 'Your email address is not correct', 'error');
    }
  };

  return (
    <div className=" bg-[#080817] text-white text-center py-24" id="subscribe">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold font-heading text-white">
          Subscribe to get notified about updates
        </h1>
        <p className="font-heading text-base">
          By subscribing with your mail, you will accept our privacy policy
        </p>
        <div className="flex justify-center items-center gap-3 flex-col md:flex-row mt-16">
          <div className="w-[300px] md:w-[500px]">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              className="border-white bg-[#161b2a] w-full text-base py-3 px-4 rounded-md text-[#c0c0c0] placeholder-gray-400 focus:outline-none"
              placeholder="Enter your email here..."
            />
          </div>
          <button
            className={`px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-md hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg focus:outline-none transition-colors duration-300`}
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
