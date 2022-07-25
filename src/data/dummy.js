import React from "react";
import {
  AiOutlineFundView,
  AiOutlineHome,
  AiOutlineVideoCameraAdd,
} from "react-icons/ai";
import { FiLogOut, FiActivity, FiHelpCircle } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { BiAddToQueue } from "react-icons/bi";
import { ImBlog } from "react-icons/im";
import { FaUserEdit } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";

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
        name: "Add blog content",
        link: "/admin/addBlogContent",
        icon: <ImBlog />,
      },
      // {
      //   name: "Add Quiz",
      //   link: "/admin/addQuiz",
      //   icon: <BiAddToQueue />,
      // },
      {
        name: "Manage my blogs",
        link: "/admin/myBlogs",
        icon: <AiOutlineFundView />,
      },
      {
        name: "Add video lesson",
        link: "/admin/addVideoLesson",
        icon: <AiOutlineVideoCameraAdd />,
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

export const linksStudent = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Home",
        link: "/students",
        icon: <AiOutlineHome />,
      },
      {
        name: "Progress",
        link: "/students/progress",
        icon: <GiProgression />,
      },
      {
        name: "Overview",
        link: "/students/overview",
        icon: <BsGraphUp />,
      },
      {
        name: "My Activity",
        link: "/students/myActivity",
        icon: <FiActivity />,
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        name: "Take a quiz",
        link: "/students/quiz",
        icon: <BiAddToQueue />,
      },

      {
        name: "Watch video lesson",
        link: "/students/addVideoLesson",
        icon: <AiOutlineVideoCameraAdd />,
      },
      {
        name: "Read blog content",
        link: "/students/addBlogContent",
        icon: <ImBlog />,
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
        link: "/teacher/logout",
        icon: <FiLogOut />,
      },
    ],
  },
];
