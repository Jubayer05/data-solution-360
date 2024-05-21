/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import 'sweetalert2/dist/sweetalert2.css';

const ShortCut = () => {
  const contentList = [
    {
      id: '8',
      title: 'Slide Main Banner',
      link: '/admin/home-page/#slide_main_banner',
    },
    {
      id: '9',
      title: 'Countdown',
      link: '/admin/home-page/#countdown_admin',
    },

    { id: '1', title: 'Add Faq', link: '/admin/home-page/#add_faq' },
    {
      id: '2',
      title: 'Customize Faq',
      link: '/admin/home-page/#customize_faq',
    },
    {
      id: '3',
      title: 'Trending Course',
      link: '/admin/home-page/#trending_course',
    },
    {
      id: '4',
      title: 'Popup Image',
      link: '/admin/home-page/#popup_image',
    },

    {
      id: '5',
      title: 'Manage Home Youtube',
      link: '/admin/home-page/#home_youtube',
    },
    {
      id: '6',
      title: 'Technology Stack',
      link: '/admin/home-page/#technology_stack',
    },
    {
      id: '9',
      title: 'Youtube Students Feedback',
      link: '/admin/home-page/#students_feedback_video',
    },
    {
      id: '7',
      title: 'Students Feedback',
      link: '/admin/home-page/#student_feedback',
    },
  ];
  return (
    <div className="fixed -right-4 top-5 ">
      <div className="pt-10 pb-4 px-5 ">
        <div
          className="w-44 mx-auto bg-[#ddd] shadow-md border-solid rounded-lg border-gray-300 
        p-5 my-4 "
        >
          {/* <p className="text-center">Shortcut</p> */}
          {contentList?.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="block text-right my-1 text-[#444444] visited:text-[#444444] 
              hover:text-[#1976d2] hover:underline"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShortCut;
