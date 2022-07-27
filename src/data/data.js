import rLang from "@iconify/icons-logos/r-lang";
import javaIcon from "@iconify/icons-logos/java";
import javascriptIcon from "@iconify/icons-logos/javascript";
import pythonIcon from "@iconify/icons-logos/python";
import microsoftPowerBi from "@iconify/icons-logos/microsoft-power-bi";
import tableauIcon from "@iconify/icons-logos/tableau";
import mongodbIcon from "@iconify/icons-logos/mongodb";
import mysqlIcon from "@iconify/icons-logos/mysql";

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
  {
    id: "nav-5",
    title: "Dashboard",
    titleBang: "ড্যাশবোর্ড",
    link: "/admin/dashboard",
  },
];

export const crashCourseData = [
  {
    id: "1",
    link: "/course-details/python-for-data-analysis",
    slug: "python-for-data-analysis",
    title: "Python for data analysis",
    point1: "Live class",
    point2: "Access recorded video",
    img: "/course/data-science.jpg",
    details:
      "In this course ,you will learn the fundamentals of  Python for data analysis techniques.You'll discover how to organize data for analysis, carry out basic statistical calculations, make insightful data visualizations, detect patterns using data, and more! ",
    additional: "",
  },
  {
    id: "2",
    link: "/course-details/microsoft-power-bi",
    slug: "microsoft-power-bi",
    title: "Microsoft Power BI",
    point1: "Live class",
    point2: "Access recorded video",
    img: "/course/data-science-2.jpg",
    details:
      "If you're looking for a comprehensive, hands-on guide to learning Microsoft Power BI Desktop, you've come to the right place.",
    additional: (
      <ul>
        <li> 1) Great opportunity to enter the freelancing sector.</li>
        <li>
          2)RemoteJob opportunities in big multinational companies in the
          country and abroad
        </li>
        <li> 3) Part time job as well as study.</li>
        <li>4) The demand in the corporate sector is increasing day by day.</li>
        <li>
          5) Opportunity to build a career as a Data Analyst / Data Scientist.
        </li>
      </ul>
    ),
  },
  {
    id: "3",
    link: "/",
    slug: "",
    title: "Coming Soon",
    point1: "Live class",
    point2: "Access recorded video",
    img: "/course/data-science-3.jpg",
    additional: "",
  },
];

export const services = [
  {
    id: "1",
    title: "Live Workshop",
    details: "Daily live classes help you maintain your routine",
    img: "/services/liveclass.png",
  },
  {
    id: "2",
    title: "Daily Assignment",
    details: "Access our lecture sheets and interactive books",
    img: "/services/notes.png",
  },
  {
    id: "3",
    title: "Daily Quiz ",
    details: "Practicing your daily home tasks helps you improve your skills.",
    img: "/services/practice.png",
  },
  {
    id: "4",
    title: "Q & A Facilities",
    details: "A team member is always with you for your questions.",
    img: "/services/qa.png",
  },
  {
    id: "5",
    title: "Class Materials ",
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
      {
        id: "2",
        img: mysqlIcon,
      },
      {
        id: "3",
        logoImg: "/technology/postgresql.jpg",
      },
    ],
  },
];

export const faqData = [
  {
    id: "1",
    question: "1. What is data science?",
    answer:
      "Data science is the field of study that combines domain expertise, programming skills, and knowledge of mathematics and statistics to extract meaningful insights from data.",
  },
  {
    id: "2",
    question: "2. Is Data Science a Good Career?",
    answer:
      "Yes, data science is a very good career with tremendous opportunities for advancement in the future. Already, demand is high, salaries are competitive, and the perks are numerous – which is why Data Scientist has been called “the most promising career” by LinkedIn and the “best job in America” by Glassdoor.",
  },
  {
    id: "3",
    question: "3. What is different between data science and data analytics?",
    answer: (
      <p>
        Data Science is an umbrella that encompasses Data Analytics. {<br />}
        Data Science focuses on finding meaningful correlations between large
        datasets, {<br />}
        Data Analytics is designed to uncover the specifics of extracted
        insights.Data Science seeks to discover new and unique questions that
        can drive business innovation. In contrast, Data Analytics is a branch
        of Data Science that focuses on more specific answers to the questions
        that Data Science brings forth
      </p>
    ),
  },
  {
    id: "4",
    question: "4. What is Power BI?",
    answer:
      "Power BI is a technology-driven business intelligence tool provided by Microsoft for analyzing and visualizing raw data to present actionable information. It combines business analytics, data visualization, and best practices that help an organization to make data-driven decisions.",
  },
  {
    id: "5",
    question: "5. Why should you learn Power BI?",
    answer: (
      <p>
        1) Great opportunity to enter the freelancing sector. {<br />}
        {<br />} 2)Remote Job opportunities in big multinational companies in
        the country and abroad {<br />}
        {<br />} 3) Part time job as well as study. {<br />}
        {<br />}
        {<br />}4) The demand in the corporate sector is increasing day by day.{" "}
        {<br />}
        {<br />}5) Opportunity to build a career as a Data Analyst / Data
        Scientist.
      </p>
    ),
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
    title: "Address: Dhaka Mawa High Way",
    icon: <MdLocationOn className="text-xl mr-1 " />,
  },

  {
    id: "2",
    title: "Phone: +8801996104096",
    icon: <ImPhone className="text-lg mr-2  " />,
  },

  {
    id: "3",
    title: "Email: datasolution360.business@gmail.com",
    icon: <MdEmail className="text-lg mr-2  " />,
  },

  // {
  //   id: "4",
  //   title: "Skype: hello_name",
  //   icon: <FaSkype className="text-lg mr-2  " />,
  // },
];

export const footerFollowUs = [
  {
    id: "1",
    link: "https://www.facebook.com/Datasolution360",
    title: "Facebook",
    icon: <AiFillFacebook />,
  },

  {
    id: "2",
    link: "https://www.linkedin.com/company/data-solution-360",
    title: "LinkedIn",
    icon: <AiFillLinkedin />,
  },

  {
    id: "3",
    link: "https://wa.me/+8801996104096",
    title: "Whatsapp",
    icon: <IoLogoWhatsapp />,
  },

  // {
  //   id: "4",
  //   link: "/",
  //   title: "Twitter",
  //   icon: <AiFillTwitterCircle />,
  // },

  {
    id: "5",
    link: "/",
    title: "Youtube",
    icon: <IoLogoYoutube />,
  },
];
