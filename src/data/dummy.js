import React from 'react';
import {
  AiOutlineFundView,
  AiOutlineHome,
  AiOutlineVideoCameraAdd,
} from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaUserEdit } from 'react-icons/fa';
import { FiHelpCircle, FiLogOut } from 'react-icons/fi';
import { GiTeacher } from 'react-icons/gi';
import { ImBlog } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';
import {
  MdCastForEducation,
  MdOutlineContentPaste,
  MdOutlineUnsubscribe,
} from 'react-icons/md';
import { RiVideoAddLine } from 'react-icons/ri';

import { RiHomeGearFill, RiTeamLine } from 'react-icons/ri';

export const linksAdmin = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Home',
        link: '/admin/dashboard',
        icon: <AiOutlineHome />,
      },
      {
        name: 'Customize Home Page',
        link: '/admin/home-page',
        icon: <RiHomeGearFill />,
      },
      // {
      //   name: 'Overview',
      //   link: '/admin/overview',
      //   icon: <BsGraphUp />,
      // },
      // {
      //   name: 'My Activity',
      //   link: '/admin/myActivity',
      //   icon: <FiActivity />,
      // },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'Add a course',
        link: '/admin/add-course',
        icon: <AiOutlineVideoCameraAdd />,
      },
      {
        name: 'Manage Courses',
        link: '/admin/manage-course',
        icon: <MdCastForEducation />,
      },
      {
        name: 'Add blog content',
        link: '/admin/addBlogContent',
        icon: <ImBlog />,
      },
      {
        name: 'Manage my blogs',
        link: '/admin/myBlogs',
        icon: <AiOutlineFundView />,
      },
      {
        name: 'Subscribed Users',
        link: '/admin/subscribed-user',
        icon: <MdOutlineUnsubscribe />,
      },
      {
        name: 'Team Member',
        link: '/admin/team_member',
        icon: <RiTeamLine />,
      },
      {
        name: 'Instructor',
        link: '/admin/instructors',
        icon: <GiTeacher />,
      },
    ],
  },
  {
    title: 'More',
    links: [
      {
        name: 'Edit profile',
        link: '/admin/editProfile',
        icon: <FaUserEdit />,
      },
      {
        name: 'Help',
        link: '/admin/help',
        icon: <FiHelpCircle />,
      },
      {
        name: 'Log out',
        link: '/admin/logout',
        icon: <FiLogOut />,
      },
    ],
  },
];

export const linksStudents = [
  {
    name: 'Home',
    link: '/students/dashboard',
    icon: <AiOutlineHome />,
  },
  {
    name: 'Class Joining',
    link: '/students/class-joining',
    icon: <RiVideoAddLine />,
  },
  {
    name: 'Profile',
    link: '/students/profile',
    icon: <CgProfile />,
  },
  {
    name: 'My Courses',
    link: '/students/my-course',
    icon: <MdOutlineContentPaste />,
  },

  {
    name: 'Settings',
    link: '/students/settings/editProfile',
    icon: <IoMdSettings />,
  },
  {
    name: 'Help',
    link: '/contact',
    icon: <FiHelpCircle />,
  },
  {
    name: 'Log out',
    link: '/students/logout',
    icon: <FiLogOut />,
  },
];
