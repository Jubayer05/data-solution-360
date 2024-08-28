import Image from 'next/image';
import React from 'react';

const People = () => {
  const peoples = [
    {
      name: 'Ashzad Ferdous Rup',
      profession: 'Intern',
      email: 'ashzad2013@gmail.com',
      img: '/team/ashzad.jpg',
    },
    {
      name: 'Ishtiak Ahammed Tanvir',
      profession: 'Intern',
      email: 'ishtiakahammed1@gmail.com',
      img: '/team/ishtiak.jpg',
    },
    {
      name: 'Md. Sairul Islam',
      profession: 'Intern',
      email: 'sahirulislam.70@gmail.com',
      img: '/team/sairul.jpg',
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-5 lg:gap-7 pb-20 px-3 ">
        {peoples.map((item) => (
          <div
            key={item.name}
            className="w-full border-1 rounded-lg overflow-hidden"
          >
            <Image
              width={500}
              height={300}
              className="h-[300px] w-full transition-all 0.2s"
              src={item.img}
              alt=""
            />
            <div className="px-4 pb-4 font-heading">
              <p className="text-[20px] text-gray-900 font-semibold mt-2">
                {item.name}
              </p>
              <p className="text-md -mt-4 text-[tomato]">{item.profession}</p>
              <p className="text-base font-semibold">
                Contact Information: <br />{' '}
                <span className="text-[#9b9b9b] font-normal">{item.email}</span>
              </p>
              <p className="text-base font-semibold">
                Project Completed:{' '}
                <span className="text-[#9b9b9b] font-normal">upcoming</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
