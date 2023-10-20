/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Modal from 'react-modal';

const Team = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (item) => {
    setModalData(item);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      background: '#fff',
      // innerWidth: '768px',
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: '-30%',
      // marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 100,
    },
  };

  const teamMembers = [
    {
      name: 'Nazmus Sakib',
      profession: 'Founder and CEO at Data Solution 360',
      img: '/team/sakib.jpg',
      details: '',
    },
    {
      name: 'Shaikh Farhad Hossain, PhD',
      profession: 'Trainer and Advisor Data Scientist and AI Researcher',
      img: '/team/Farhad.jpg',
      details: '',
    },
    {
      name: 'Noor Ahmad Sarker',
      profession: 'Analytics Engineer & CTO at Data Solution 360',
      img: '/team/noor.jpeg',
      details: `<p>At the moment, Mr. Noor Ahmad Sarker is serving as an Analytics Engineer (Full-time) & CTO in Data Solution 360. In 2021, he graduated with a Bachelor of Science (B.Sc.) from Rajshahi University of Engineering & Technology (RUET). After that, he started working for Data Solution 360 as a “Trainee Analytics Engineer” in October 2022. Later, he was promoted & still working as a full-time “Analytics Engineer” in March 2023. Besides, he is currently serving as Data Solution 360's CTO. <br/> <br/> Mr. Noor enjoys learning about and researching data science. He is currently working on some projects related to Data Analytics & Machine Learning after successfully completing several projects on data analysis. His ambition is to work as a researcher in the field of data science. <br/><br/> Mr. Noor is very knowledgeable about various data analytics and visualization tools. He utilized well-known Python libraries like Numpy, Pandas, and others to work on a variety of data analysis and machine learning projects.</p>`,
    },
    {
      name: 'Md. Monjur',
      profession: 'Business development manager at Data Solution 360',
      img: '/team/monjur.jpeg',
      details: `<p>Md. Monjur is working as business development manager at Data Solution 360. He has completed his BBA from the university of Dhaka recently and he was the president of Dhaka University Entrepreneurship Development Club and Bizniverse Today. <br/><br/> He loves to learn and explore business. He reads marketing and branding related books a lot. Apert from that, he has a great knack on literature.</p>`,
    },
  ];

  return (
    <div className="bg-[#f9f9fa] pt-10 pb-6 mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl text-center font-heading my-8">
          Meet our team
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 pb-20 px-3 ">
          {teamMembers.map((item) => (
            <div
              key={item.name}
              className="w-full overflow-hidden rounded-md shadow-lg cursor-pointer group"
            >
              <img
                className="h-[240px] w-full transition-all 0.2s group-hover:scale-105"
                src={item.img}
                alt=""
              />
              <div className="p-5">
                <p className="text-gray-900 font-heading font-semibold mt-2 text-xl">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600 -mt-3">{item.profession}</p>

                <>
                  <a type="button" onClick={() => openModal(item)}>
                    view details
                  </a>
                  <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <div className="max-w-xl mx-5 z-30">
                      <div className="flex items-center justify-center mb-[15px] text-center">
                        <img
                          className="mx-auto w-[300px] h-[300px] object-cover rounded-[3px]"
                          src={modalData?.img}
                          alt={modalData?.name}
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold leading-8 text-[#231f40]">
                          {modalData?.name}
                        </h2>
                        <p className="text-[#525fe1] font-medium -mt-2">
                          {modalData?.profession}
                        </p>
                        <div
                          className="text-sm text-gray-600 mt-5"
                          dangerouslySetInnerHTML={{
                            __html: modalData?.details,
                          }}
                        />
                      </div>
                      <p className="text-base leading-7 text-[#6f6b80] mb-[24px]">
                        {modalData?.reviewDetails}
                      </p>

                      <div className="text-center pt-6">
                        <button
                          className="bg-[#ff3f3f] text-white rounded-lg px-5 py-2"
                          onClick={closeModal}
                        >
                          close
                        </button>
                      </div>
                    </div>
                  </Modal>
                </>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
