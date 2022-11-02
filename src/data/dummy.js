import React from "react";
import {
  AiOutlineFundView,
  AiOutlineHome,
  AiOutlineVideoCameraAdd,
} from "react-icons/ai";
import { FiLogOut, FiActivity, FiHelpCircle } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { ImBlog } from "react-icons/im";
import { FaUserEdit } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineContentPaste } from "react-icons/md";

export const linksAdmin = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Home",
        link: "/admin/dashboard",
        icon: <AiOutlineHome />,
      },
      {
        name: "Progress",
        link: "/admin/progress",
        icon: <GiProgression />,
      },
      {
        name: "Overview",
        link: "/admin/overview",
        icon: <BsGraphUp />,
      },
      {
        name: "My Activity",
        link: "/admin/myActivity",
        icon: <FiActivity />,
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        name: "Add a course",
        link: "/admin/add-course",
        icon: <AiOutlineVideoCameraAdd />,
      },
      {
        name: "Add blog content",
        link: "/admin/addBlogContent",
        icon: <ImBlog />,
      },
      {
        name: "Manage my blogs",
        link: "/admin/myBlogs",
        icon: <AiOutlineFundView />,
      },
    ],
  },
  {
    title: "More",
    links: [
      {
        name: "Edit profile",
        link: "/admin/editProfile",
        icon: <FaUserEdit />,
      },
      {
        name: "Help",
        link: "/admin/help",
        icon: <FiHelpCircle />,
      },
      {
        name: "Log out",
        link: "/admin/logout",
        icon: <FiLogOut />,
      },
    ],
  },
];

export const linksStudents = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Home",
        link: "/students/dashboard",
        icon: <AiOutlineHome />,
      },
      {
        name: "Profile",
        link: "/students/profile",
        icon: <CgProfile />,
      },
      {
        name: "My Courses",
        link: "/students/myCourse",
        icon: <MdOutlineContentPaste />,
      },
      {
        name: "My Activity",
        link: "/students/myActivity",
        icon: <FiActivity />,
      },
    ],
  },

  {
    title: "More",
    links: [
      {
        name: "Edit profile",
        link: "/students/editProfile",
        icon: <FaUserEdit />,
      },
      {
        name: "Help",
        link: "/students/help",
        icon: <FiHelpCircle />,
      },
      {
        name: "Log out",
        link: "/students/logout",
        icon: <FiLogOut />,
      },
    ],
  },
];
