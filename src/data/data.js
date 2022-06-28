import rLang from "@iconify/icons-logos/r-lang";
import javaIcon from "@iconify/icons-logos/java";
import javascriptIcon from "@iconify/icons-logos/javascript";
import pythonIcon from "@iconify/icons-logos/python";
import microsoftPowerBi from "@iconify/icons-logos/microsoft-power-bi";
import tableauIcon from "@iconify/icons-logos/tableau";
import mongodbIcon from "@iconify/icons-logos/mongodb";

export const navItems = [
  {
    id: "nav-1",
    title: "Home",
    titleBang: "হোম",
    link: "/",
  },
  {
    id: "nav-2",
    title: "About",
    titleBang: "সম্পর্ক",
    link: "/about",
  },
  {
    id: "nav-3",
    title: "Services",
    titleBang: "সার্ভিস",
    link: "/services",
  },
  {
    id: "nav-4",
    title: "Blog",
    titleBang: "ব্লগ",
    link: "/blog",
  },
];

export const crashCourseData = [
  {
    id: "1",
    title: "Python for data analysis",
    point1: "This is point no 1",
    point2: "This is point no 2",
    img: "/course/data-science.jpg",
  },
  {
    id: "2",
    title: "Microsoft Power BI",
    point1: "This is point no 1",
    point2: "This is point no 2",
    img: "/course/data-science-2.jpg",
  },
  {
    id: "3",
    title: "Coming Soon",
    point1: "This is point no 1",
    point2: "This is point no 2",
    img: "/course/data-science-3.jpg",
  },
];

export const services = [
  {
    id: "1",
    title: "Attend live classes",
    details: "Daily live classes help you maintain your routine",
    img: "/services/liveclass.png",
  },
  {
    id: "2",
    title: "Daily class notes",
    details: "Access our lecture sheets and interactive books",
    img: "/services/notes.png",
  },
  {
    id: "3",
    title: "Practice your given tasks",
    details: "Practicing your daily home tasks helps you improve your skills.",
    img: "/services/practice.png",
  },
  {
    id: "4",
    title: "Q&A Facilities",
    details: "A team member is always with you for your questions.",
    img: "/services/qa.png",
  },
  {
    id: "5",
    title: "Unlimited resources",
    details:
      "You will get unlimited resources during whole course. That'll helps you your data science carrier.",
    img: "/services/resource.png",
  },
  {
    id: "6",
    title: "Live support",
    details: "You will get live support during whole course.",
    img: "/services/support.png",
  },
];

export const technologyStack = [
  {
    id: "1",
    title: "Language",
    technology: [
      {
        id: "1",
        img: javaIcon,
      },
      {
        id: "2",
        img: javascriptIcon,
      },
      {
        id: "3",
        img: pythonIcon,
      },
    ],
  },
  {
    id: "2",
    title: "Data Analysis",
    technology: [
      {
        id: "1",
        img: pythonIcon,
      },
      {
        id: "2",
        img: rLang,
      },
      {
        id: "3",
        logoImg: "/technology/excel.png",
      },
      {
        id: "4",
        logoImg: "/technology/spss.png",
      },
      {
        id: "4",
        logoImg: "/technology/stata.png",
      },
    ],
  },
  {
    id: "3",
    title: "Data Visualization",
    technology: [
      {
        id: "1",
        img: microsoftPowerBi,
      },
      {
        id: "2",
        img: tableauIcon,
      },

      {
        id: "3",
        logoImg: "/technology/excel.png",
      },
    ],
  },
  {
    id: "4",
    title: "Database",
    technology: [
      {
        id: "1",
        img: mongodbIcon,
      },
    ],
  },
];

export const faqData = [
  {
    id: "1",
    question: "1. What is data science?",
    answer:
      "Data science is the domain of study that deals with vast volumes of data using modern tools and techniques to find unseen patterns, derive meaningful information, and make business decisions. Data science uses complex machine learning algorithms to build predictive models.",
  },
  {
    id: "2",
    question: "2. Question no 2?",
    answer:
      "Data science is the domain of study that deals with vast volumes of data using modern tools and techniques to find unseen patterns, derive meaningful information, and make business decisions. Data science uses complex machine learning algorithms to build predictive models.",
  },
  {
    id: "3",
    question: "3. Question no 3?",
    answer:
      "Data science is the domain of study that deals with vast volumes of data using modern tools and techniques to find unseen patterns, derive meaningful information, and make business decisions. Data science uses complex machine learning algorithms to build predictive models.",
  },
  {
    id: "4",
    question: "4. Question no 4?",
    answer:
      "Data science is the domain of study that deals with vast volumes of data using modern tools and techniques to find unseen patterns, derive meaningful information, and make business decisions. Data science uses complex machine learning algorithms to build predictive models.",
  },
  {
    id: "5",
    question: "5. This Question no 5?",
    answer:
      "Data science is the domain of study that deals with vast volumes of data using modern tools and techniques to find unseen patterns, derive meaningful information, and make business decisions. Data science uses complex machine learning algorithms to build predictive models.",
  },
];

import { MdLocationOn, MdEmail } from "react-icons/md";
import { ImPhone } from "react-icons/im";
import { FaSkype } from "react-icons/fa";
import { IoLogoWhatsapp, IoLogoYoutube } from "react-icons/io";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

export const footerContactData = [
  {
    id: "1",
    title: "Palbari, Jashore Sadar, Jashore",
    icon: <MdLocationOn className="text-xl mr-1 " />,
  },

  {
    id: "2",
    title: "Phone: +8801700000000",
    icon: <ImPhone className="text-lg mr-2  " />,
  },

  {
    id: "3",
    title: "Email: email@gmail.com",
    icon: <MdEmail className="text-lg mr-2  " />,
  },

  {
    id: "4",
    title: "Skype: hello_name",
    icon: <FaSkype className="text-lg mr-2  " />,
  },
];

export const footerFollowUs = [
  {
    id: "1",
    link: "https://www.facebook.com/groups/371272054987030/",
    title: "Facebook",
    icon: <AiFillFacebook />,
  },

  {
    id: "2",
    link: "/",
    title: "LinkedIn",
    icon: <AiFillLinkedin />,
  },

  {
    id: "3",
    link: "/",
    title: "Whatsapp",
    icon: <IoLogoWhatsapp />,
  },

  {
    id: "4",
    link: "/",
    title: "Twitter",
    icon: <AiFillTwitterCircle />,
  },

  {
    id: "5",
    link: "/",
    title: "Youtube",
    icon: <IoLogoYoutube />,
  },
];
