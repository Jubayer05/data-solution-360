import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import firebase from '../../../firebase';
import Countdown from './CountDown';

const db = firebase.firestore();

const Discount = () => {
  const [countdownData, setCountdownData] = useState([]);
  const [targetDate, setTargetDate] = useState();

  useEffect(() => {
    db.collection('countdown_time').onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      }));
      setCountdownData(data);
      setTargetDate(new Date(`${data[0]?.countdownEnd}T23:59:59`));
    });
  }, []);

  return (
    <>
      {countdownData[0]?.countdownStatus && (
        <div className="bg-green-600 sticky top-0 z-20">
          <Link href={`${countdownData[0]?.courseLink}`}>
            <div className="flex justify-around text-center pt-3 pb-3 cursor-pointer">
              <Countdown data={countdownData} targetDate={targetDate} />
              <h2 className="font-heading text-xs md:text-base text-white hover:underline">
                Signup Today and get 10% extra discount!
              </h2>
              <h2 className="font-heading text-xs md:text-base text-white hover:underline">
                Click Here
              </h2>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Discount;
