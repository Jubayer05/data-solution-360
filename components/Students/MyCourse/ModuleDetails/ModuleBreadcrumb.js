import { Breadcrumb } from 'antd';
import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';

const ModuleBreadcrumb = () => {
  const globalStyle =
    'text-black hover:bg-transparent hover:text-[#ffaf0e] transition-all duration-200';
  return (
    <Breadcrumb
      className="mt-4 text-base font-semibold "
      itemColor="#000000"
      linkColor="#000000"
      linkHoverColor="rgba(44, 90, 0, 0.88)"
      colorBgTextHover="rgba(255, 255, 255, 1)"
      items={[
        {
          href: '',
          title: (
            <AiOutlineHome
              className={globalStyle + ' ' + 'text-lg mt-[6px] text-black'}
            />
          ),
        },
        {
          href: '/students/my-course/',
          title: (
            <>
              <span className={globalStyle}>My Course</span>
            </>
          ),
        },
        {
          href: '/students/my-course/',
          title: (
            <>
              <span className={globalStyle}>Course Details</span>
            </>
          ),
        },
        {
          title: (
            <span className={globalStyle + ' ' + 'cursor-pointer'}>
              Module 1
            </span>
          ),
        },
      ]}
    />
  );
};

export default ModuleBreadcrumb;
