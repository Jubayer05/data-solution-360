import { Breadcrumb } from 'antd';
import { Home } from 'lucide-react';
import React from 'react';

const ModuleBreadcrumb = () => {
  const globalStyle =
    'text-black hover:bg-transparent hover:text-[#ffaf0e] transition-all duration-200';
  return (
    <Breadcrumb
      className="mt-4 text-base font-semibold "
      colorBgTextHover="rgba(255, 255, 255, 1)"
      items={[
        {
          href: '',
          title: (
            <Home
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
