import javaIcon from '@iconify/icons-logos/java';
import javascriptIcon from '@iconify/icons-logos/javascript';
import microsoftPowerBi from '@iconify/icons-logos/microsoft-power-bi';
import mongodbIcon from '@iconify/icons-logos/mongodb';
import mysqlIcon from '@iconify/icons-logos/mysql';
import pythonIcon from '@iconify/icons-logos/python';
import rLang from '@iconify/icons-logos/r-lang';
import tableauIcon from '@iconify/icons-logos/tableau';
import { CgProfile } from 'react-icons/cg';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FiVideo } from 'react-icons/fi';
import { IoLogoYoutube } from 'react-icons/io';
import { MdContentCopy, MdReviews } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';

export const navItems = [
  {
    id: 'nav-1',
    title: 'Home',
    slug: '',
    titleBang: 'হোম',
    link: '/',
  },
  {
    id: 'nav-2',
    title: 'About',
    slug: 'about-us',
    titleBang: 'সম্পর্ক',
    link: '/about-us',
  },

  {
    id: 'nav-3',
    title: 'Services',
    slug: 'services',
    titleBang: 'সার্ভিস',
    link: '/services',
    dropdown: [
      {
        id: 'dropdown-1',
        title: 'Ed-Tech',
        link: '/services/edTech',
      },
      {
        id: 'dropdown-2',
        title: 'B2B',
        link: '/services/b2b',
      },
      {
        id: 'dropdown-3',
        title: 'Consultancy',
        link: '/services/consultancy',
      },
    ],
  },
  {
    id: 'nav-4',
    title: 'Courses',
    slug: 'courses',
    titleBang: 'কোর্স',
    link: '/courses',
  },
  {
    id: 'nav-5',
    title: 'Blog',
    slug: 'blog',
    titleBang: 'ব্লগ',
    link: '/blog',
  },
];

export const navItems2 = [
  {
    id: 'nav-6',
    title: 'Subscribe',
    titleBang: 'সাবস্ক্রাইব',
    link: '/#subscribe',
  },
  {
    id: 'nav-7',
    title: 'Free Course',
    titleBang: 'ফ্রী কোর্স',
    link: '/free-course',
  },
];

export const navDropItems = [
  {
    id: 'nav-1',
    title: 'My Profile',
    slug: 'dashboard',
    titleBang: 'ড্যাশবোর্ড',
    link: '/students/dashboard',
  },
  {
    id: 'nav-5',
    title: 'Settings',
    slug: 'settings',
    titleBang: 'প্রোফাইল',
    link: '/students/settings',
  },
  {
    id: 'nav-5',
    title: 'My wishlist',
    slug: 'profile',
    titleBang: 'প্রোফাইল',
    link: '/students/profile',
  },
  {
    id: 'nav-2',
    title: 'Terms and Condition',
    slug: 'terms-and-conditions',
    titleBang: 'টার্মস এন্ড কন্ডিশন',
    link: '/terms-and-conditions',
  },
  {
    id: 'nav-3',
    title: 'Return Policy',
    slug: 'return-policy',
    titleBang: 'রিটার্ন পলিসি',
    link: '/return-and-refund-policy',
  },
  {
    id: 'nav-4',
    title: 'Help Center',
    slug: 'help',
    titleBang: 'হেল্প',
    link: '/contact',
  },
];

export const slidesData = [
  {
    id: '1',
    img: '/course/data-science.jpg',
  },
  {
    id: '2',
    img: '/course/data-science-2.jpg',
  },
  {
    id: '3',
    img: '/course/data-science-2-c.jpg',
  },
  {
    id: '4',
    img: '/course/data-science111.jpg',
  },
  {
    id: '5',
    img: '/course/data-science-3.jpg',
  },
];

export const crashCourseData = [
  {
    id: '1',
    link: '/course-details/python-for-data-analysis',
    slug: 'python-for-data-analysis',
    title: 'Python for data analysis',
    point1: 'Live class',
    point2: 'Access recorded video',
    img: '/course/data-science.jpg',
    details:
      "In this course ,you will learn the fundamentals of  Python for data analysis techniques.You'll discover how to organize data for analysis, carry out basic statistical calculations, make insightful data visualizations, detect patterns using data, and more! ",
    additional: '',
  },
  {
    id: '4',
    link: '/course-details/expert-in-python',
    slug: 'expert-in-python',
    title: 'Expert in Python',
    point1: 'Live class',
    point2: 'Access recorded video',
    img: '/course/data-science-4.jpg',
    details:
      "If you're looking for a comprehensive, hands-on guide to learning Python in a advance way, you've come to the right place.",
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
    id: '2',
    link: '/course-details/microsoft-power-bi',
    slug: 'microsoft-power-bi',
    title: 'Microsoft Power BI',
    point1: 'Live class',
    point2: 'Access recorded video',
    img: '/course/data-science-2.jpg',
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
    id: '3',
    link: '/course-details/amazon-web-services',
    slug: 'amazon-web-services',
    title: 'Amazon Web Services',
    point1: 'Live class',
    point2: 'Access recorded video',
    img: '/course/data-science-3.jpg',
    details:
      "If you're looking for a comprehensive, hands-on guide to learning Amazon Web Services, you've come to the right place.",
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
];

export const services = [
  {
    id: '1',
    title: ' Quality delivery & content',
    details:
      'The training program emphasizes quality delivery and engaging content.',
    img: '/services/quality.png',
  },
  {
    id: '2',
    title: 'Class recorded content',
    details: 'After every class students will get class record.',
    img: '/services/liveclass.png',
  },
  {
    id: '3',
    title: 'Efficient learning system',
    details: 'Effective learning approach maximizes knowledge retention.',
    img: '/services/practice.png',
  },
  {
    id: '4',
    title: 'One to one solutions',
    details: 'Providing one to one solutions if any student needed.',
    img: '/services/qa.png',
  },
  {
    id: '5',
    title: 'Class Materials ',
    details:
      'Full course materials and practice resources provided for students.',
    img: '/services/resource.png',
  },
  {
    id: '6',
    title: 'Live support',
    details: 'You will get live support during whole course.',
    img: '/services/support.png',
  },
];

export const technologyStack = [
  {
    id: '1',
    title: 'Language',
    technology: [
      {
        id: '1',
        img: javaIcon,
      },
      {
        id: '4',
        img: rLang,
      },
      {
        id: '2',
        img: javascriptIcon,
      },
      {
        id: '3',
        img: pythonIcon,
      },
    ],
  },
  {
    id: '2',
    title: 'Data Analysis',
    technology: [
      {
        id: '1',
        img: pythonIcon,
      },

      {
        id: '3',
        logoImg: '/technology/excel.png',
      },
      {
        id: '4',
        logoImg: '/technology/spss.png',
      },
      {
        id: '4',
        logoImg: '/technology/stata.png',
      },
    ],
  },
  {
    id: '3',
    title: 'Data Visualization',
    technology: [
      {
        id: '1',
        img: microsoftPowerBi,
      },
      {
        id: '2',
        img: tableauIcon,
      },

      {
        id: '3',
        logoImg: '/technology/excel.png',
      },
    ],
  },
  {
    id: '4',
    title: 'Database',
    technology: [
      {
        id: '1',
        img: mongodbIcon,
      },
      {
        id: '2',
        img: mysqlIcon,
      },
      {
        id: '3',
        logoImg: '/technology/postgresql.jpg',
      },
    ],
  },
  {
    id: '4',
    title: 'AI',
    technology: [
      {
        id: '1',
        logoImg: '/technology/chatgpt.png',
      },
    ],
  },
];

export const faqDataPage = [
  {
    id: '1',
    question:
      '১. যেকানো কোর্সে প্রতি ক্লাস শেষে ক্লাস রেকর্ডিং পাওয়া যাবে কি না?',
    answer: (
      <p>
        অবশ্যই। প্রতিটি ক্লাস শেষ হওয়ার ২৪ ঘন্টার মধ্যে ইমেইলে রেকর্ডিং পাঠিয়ে
        দেয়া হবে।
      </p>
    ),
  },
  {
    id: '2',
    question: '২. কোর্সগুলো কাদের জন্য?',
    answer: (
      <p>
        এই কোর্সগুলো সবার বোঝার উপযোগী করেই তৈরি করা হয়েছে। স্টুডেন্ট এবং
        প্রফেশনাল উভয়ই এই কোর্সটি করতে পারবেন। {<br />} {<br />}
        যেহেতু বর্তমানে ডেটা এনালাইসিস একটি গুরুত্বপূর্ণ বিষয়, তাই যেকোনো ধরণের
        ক্যারিয়ার এর জন্য এই কোর্সগুলো খুবই প্রয়োজনীয়। কোর্সগুলো মূলত তাদের জন্য
        যারা নিজেদের ক্যরিয়ারকে সময়ের চাহিদা অনুযায়ী ডাইনামিক করতে চায় এবং
        বর্তমান বিশ্বের সবচেয়ে চাহিদাপূর্ণ জবগুলো এবং ইনকাম সোর্সগুলো সহজেই পেতে
        চায়।
      </p>
    ),
  },
  {
    id: '3',
    question: '৩. কোর্সগুলো করার জন্য কি কি জানা থাকা লাগবে?',
    answer: (
      <p>
        যেহেতু কোর্সগুলো একদম বেসিক লেভেল থেকে শুরু হবে তাই এই কোর্সটি করার জন্য
        স্পেশাল কোন কিছু জানা থাকার প্রয়োজন নেই। শুধু বেসিক গণিত এবং কম্পিউটারের
        ব্যবহার জানা থাকাটা প্রয়োজন। সেই সাথে দরকার হবে ইন্টারনেট সংযোগ।
      </p>
    ),
  },
  {
    id: '4',
    question: '৪. পেশাজীবি হিসেবে কোর্সগুলো কি আমার করা উচিত?',
    answer: (
      <p>
        একজন প্রফেশনাল চাকুরীজীবী, যিনি যেই পেশাতেই থাকুন না কেন, তাকে
        প্রতিনিয়তই ডেটা সম্পর্কিত সমস্যার সম্মুখিন হতে হচ্ছে। এর পাশাপাশি অনেক
        পেশাজীবী যুগের চাহিদা অনুযায়ী তাদের ক্যরিয়ার ডেটা এনালাইসিস এ সুইচ করতে
        চাচ্ছেন। এই সমস্ত বিষয় বিবেচনায় নিলে সহজেই বোঝা যায়, কোর্সগুলো
        পেশাজীবীদের জন্য কতটা গুরুত্বপূর্ণ। {<br />} {<br />}
        পাশাপাশি -
        <ul>
          <li>
            ১. বর্তমানে ডাটা এনালাইসিস শিখলে চাকরিতে এবং ক্যারিয়ারে আপনার
            প্রমোশন ত্বরান্বিত হবে।
          </li>
          <li>২. আপনার কর্মক্ষেত্রে আপনার অবস্থান শক্ত হবে।</li>
          <li>৩. আপনি অফিসিয়াল ডিসিশন মেকিংয়ে আরও দক্ষ হয়ে উঠবেন।</li>
        </ul>
      </p>
    ),
  },
  {
    id: '5',
    question:
      '৫. স্কুল, কলেজ বা বিশ্ববিদ্যালয়ের শিক্ষার্থী হিসেবে কোর্সগুলো কি আমার করা উচিত?',
    answer: (
      <p>
        অবশ্যই উচিত। কারণ ছাত্রজীবনের এই সময়টা হচ্ছে স্কিল ডেভলপমেন্ট এর সময়। আর
        যেহেতু এটা বর্তমান বিশ্বের একটি টপ ডিমান্ডিং স্কিল তাই গ্রাজুয়েশন শেষ
        করে দ্রুততম সময়ের মধ্যে নিজের ক্যরিয়ারকে সমৃদ্ধ করার জন্য এবং ইনকাম
        সোর্স পাবার জন্যে এটা খুবই ভালো একটা অপশন।
        {<br />}
        {<br />}এছাড়াও ফ্রিল্যান্স মার্কেটপ্লেসে একজন দক্ষ ডেটা এনালিস্ট এর
        প্রচুর চাহিদা রয়েছে। সেই দিকটা বিবেচনায় নিলে স্কুল-কলেজ পড়ুয়া
        শিক্ষার্থীদের জন্য পার্টটাইম আয়ের একটা ভালো সুযোগ তৈরি করতে সহায়তা করবে
        এই কোর্স।
      </p>
    ),
  },
  {
    id: '6',
    question: '৬. আমি অনলাইন কোর্সগুলোতে কিভাবে ভর্তি হবো? ',
    answer: <p>কোর্সগুলোতে ভর্তি হওয়ার জন্য কোর্স কলামগুলো ফলো করুন।</p>,
  },
  {
    id: '7',
    question: '৭. আমি কি অনলাইন ক্লাস ম্যাটেরিয়াল গুলো পাবো?',
    answer: (
      <p>
        অবশ্যই পাবেন। ক্লাস শেষে প্রয়োজনীয় ম্যাটেরিয়ালগুলো মেসেঞ্জার গ্রুপে এবং
        গুগল ক্লাসরুমে শেয়ার করে দেয় হবে; যেখান থেকে আপনি খুব সহজেই সেগুলো
        ডাউনলোড করে নিতে পারবেন।
      </p>
    ),
  },
  {
    id: '7',
    question: '৮. কোর্সগুলো কিভাবে আমার ক্যারিয়ার সমৃদ্ধ করবে?',
    answer: (
      <p>
        আপনি শিক্ষার্থী, ব্যবসায়ী বা চাকরিজীবী - যেই হোন না কেন, কোর্সগুলো আপনার
        জন্যে খুবই উপযোগী করে তৈরি করা হয়েছে। একজন প্রফেশনাল চাকুরীজীবীকে
        প্রতিনিয়তই ডেটা সম্পর্কিত সমস্যার সম্মুখীন হতে হচ্ছে। এর পাশাপাশি অনেক
        পেশাজীবী যুগের চাহিদা অনুযায়ী তাদের ক্যরিয়ার ডেটা এনালাইসিস এ সুইচ করতে
        চাচ্ছেন। {<br />}
        {<br />}
        চাকুরীর বাজার হোক কিংবা ফ্রিল্যান্স মার্কেটপ্লেস, একজন দক্ষ ডেটা
        এনালিস্ট এর সব ক্ষেত্রেই প্রচুর চাহিদা রয়েছে। কারণ ডেটা এনালাইসিস
        বর্তমান বিশ্বের টপ ৫ টি প্রফেশন এর মধ্যে একটি। এসব কিছু বিবেচনায় নিলে
        এটা নিশ্চিত ভাবেই বলা যায় যে, এই কোর্স অবশ্যই আপনার ক্যারিয়ারের জন্য অতি
        গুরুত্বপূর্ণ ।
      </p>
    ),
  },
];

export const faqDataHome = [
  {
    id: '1',
    question: '1. What is data science?',
    answer:
      'Data science is the field of study that combines domain expertise, programming skills, and knowledge of mathematics and statistics to extract meaningful insights from data.',
  },
  {
    id: '2',
    question: '2. Is Data Science a Good Career?',
    answer:
      'Yes, data science is a very good career with tremendous opportunities for advancement in the future. Already, demand is high, salaries are competitive, and the perks are numerous – which is why Data Scientist has been called “the most promising career” by LinkedIn and the “best job in America” by Glassdoor.',
  },
  {
    id: '3',
    question: '3. What is different between data science and data analytics?',
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
    id: '4',
    question: '4. What is Power BI?',
    answer:
      'Power BI is a technology-driven business intelligence tool provided by Microsoft for analyzing and visualizing raw data to present actionable information. It combines business analytics, data visualization, and best practices that help an organization to make data-driven decisions.',
  },
  {
    id: '5',
    question: '5. Why should you learn Power BI?',
    answer: (
      <p>
        1) Great opportunity to enter the freelancing sector. {<br />}
        {<br />} 2)Remote Job opportunities in big multinational companies in
        the country and abroad {<br />}
        {<br />} 3) Part time job as well as study. {<br />}
        {<br />}
        {<br />}4) The demand in the corporate sector is increasing day by day.{' '}
        {<br />}
        {<br />}5) Opportunity to build a career as a Data Analyst / Data
        Scientist.
      </p>
    ),
  },
];

export const footerExploreData = [
  {
    id: '1',
    title: 'About Us',
    Link: '/about-us',
  },
  {
    id: '2',
    title: 'Career',
    Link: '/career',
  },
  {
    id: '3',
    title: 'Blog & News',
    Link: '/blog',
  },
  {
    id: '4',
    title: 'FAQ Questions',
    Link: '/faq',
  },

  {
    id: '5',
    title: 'Testimonials',
    Link: '/#testimonials',
  },
];

export const footerUsefulLinksData = [
  {
    id: '1',
    title: 'Contact Us',
    Link: '/contact',
  },
  {
    id: '2',
    title: 'View Courses',
    Link: '/#courses',
  },
  {
    id: '3',
    title: 'Gallery',
    Link: '/gallery',
  },
  {
    id: '5',
    title: 'Purchase Guide',
    Link: '/purchase-guide',
  },
];

export const footerAboutData = [
  {
    id: '1',
    title: 'Prospectus',
    Link: '/prospectus',
  },
  {
    id: '2',
    title: 'Team',
    Link: '/about-us',
  },
  {
    id: '3',
    title: 'Privacy Policy',
    Link: '/privacy-policy',
  },
  {
    id: '4',
    title: 'Terms and Conditions',
    Link: '/terms-and-conditions',
  },
  {
    id: '5',
    title: 'Return and Refund Policy',
    Link: '/return-and-refund-policy',
  },
];

export const footerFollowUs = [
  {
    id: '1',
    link: 'https://www.facebook.com/Datasolution360',
    title: 'Facebook',
    icon: <FaFacebookF />,
    brandColor: '#1877F2',
  },

  {
    id: '2',
    link: 'https://www.linkedin.com/company/data-solution-360',
    title: 'LinkedIn',
    icon: <FaLinkedinIn />,
    brandColor: '#0A66C2',
  },

  {
    id: '3',
    link: 'https://wa.me/+8801996104096',
    title: 'Whatsapp',
    icon: <FaWhatsapp />,
    brandColor: '#25D366',
  },
  {
    id: '4',
    link: 'https://www.youtube.com/@datasolution-3607',
    title: 'Youtube',
    icon: <IoLogoYoutube />,
    brandColor: '#FF0000',
  },
];

export const dashboardAdmin = [
  {
    id: '1',
    title: 'Total Students',
    gridClass: false,
    classes: '',
    bgFrom: ' #1a9f53',
    bgTo: '#4eda89',
    icon: <CgProfile />,
  },

  {
    id: '2',
    title: 'Total Courses',
    gridClass: false,
    classes: '',
    bgFrom: '#be0ee1',
    bgTo: '#ed68ff',
    icon: <MdContentCopy />,
  },
  {
    id: '3',
    title: 'Total Reviews',
    gridClass: true,
    bgTo: '#ff5648',
    bgFrom: '#da5568',
    icon: <RiAdminFill />,
  },
  {
    id: '4',
    title: ' Total Video Lessons',
    gridClass: false,

    classes: '',
    bgFrom: '#2b77e5',
    bgTo: '#64b3f6',
    icon: <MdReviews />,
  },
  {
    id: '5',
    title: 'Total Blog',
    gridClass: false,
    classes: '',
    bgFrom: '#e1940e',
    bgTo: '#f4d02b',
    icon: <FiVideo />,
  },
];

export const reviewData = [
  {
    id: '1',
    name: 'Md. Towhidul Islam',
    job: 'Student, DIU',
    photoUrl: '/review/image1.jpeg',
    reviewDetails:
      "This data analyst course can be a valuable investment in developing skills and knowledge in the field of data analysis. It's important to carefully consider my options and choose a course that aligns with my goals and needs.",
    star: 5,
  },
  {
    id: '2',
    name: 'Raiful Islam',
    job: 'Student',
    photoUrl: '/review/avatar.png',
    reviewDetails:
      "The instructor is amazing. First of all, I didn't think I will communicate with the instructor. But the instructor has given me space to talk about certain things with him. He is friendly when we just ask questions during the class. I am quite an introverted person but I was thinking it will create a problem. The instructor has given me a platform to overcome it. The best important thing is, sometimes he gives some real examples which are quite fascinating for me and I like the most. He showed me a career path.  Eventually, by his guidelines, I think I can create a career in the future. And after this course, I think I can fulfil my dream.",
    star: 5,
  },
  {
    id: '3',
    name: 'Tasmin Akter Tripty',
    job: 'Teaching Assistant, BUET',
    photoUrl: '/review/image2.jpeg',
    reviewDetails:
      "It's a great experience for me to be a student at Data Solution 360's data analysis course. The course addressed a wide range of topics in data analysis, including statistical analysis, data visualization, and Python. It is well-structured, and covered many of these themes. The instructor is always eager to offer further assistance and support In order to make sure we fully understood the content.",
    star: 5,
  },

  {
    id: '4',
    name: 'Md.Tusher Alam',
    job: '',
    photoUrl: '/review/image4.jpg',
    reviewDetails:
      'The instructor was knowledgeable and engaging, and the material was presented in a clear and concise manner. One of the best things about this course was its practical focus. Throughout the lessons, we were given plenty of opportunities to apply what we had learned by working on real-world marketing projects.  The course platform was easy to use, and the videos were high quality. The course materials, including templates and resources, were well-organized and easy to follow. Additionally, the course community was supportive and active, with a dedicated forum where students could ask questions and share their work.',
    star: 5,
  },
  {
    id: '5',
    name: 'Sumaya Akter',
    job: 'Student',
    photoUrl: '/review/woman.png',
    reviewDetails:
      "The competent and interesting lecturer in this data solution program makes difficult ideas understandable. Our academic and practical abilities are improved through hands-on exercises and assignments. It's a great course for anyone wishing to improve their data analysis skills, regardless of experience level.",
    star: 5,
  },
  {
    id: '6',
    name: 'Md. Fahad Hossain Faysal',
    job: 'Self Employed',
    photoUrl: '/review/image5.jpeg',
    reviewDetails:
      "This course covered a wide range of topics, including data visualization, statistics, database management, and programming languages such as Python. Our instructor Shakib vai is knowledgeable and experienced in data analysis fields, and were able to explain complex concepts in a clear and concise manner. But I have a recommendation to our instructor Shakib vai that please maintain the learning sequence. When you start a topics like programming or SQL or Statistics or whatever it, firstly please complete the topic fully(beginning to advanced). Don't jump from a topic to another topic. Sometimes students are confused if we jumping a topic to another topic. Please follow the sequence.",
    star: 5,
  },

  {
    id: '7',
    name: 'Mallika Talukdar Chitra',
    job: 'Student',
    photoUrl: '/review/woman.png',
    reviewDetails:
      'Previously I had no basic knowledge in Data analytics and tools. With the help of this course, I can say, I gained not only basic but also advance knowledge. I want to pay my gratitude to our mentors.',
    star: 5,
  },
  {
    id: '8',
    name: 'Ashraf shakil',
    job: 'Student',
    photoUrl: '/review/image3.jpeg',
    reviewDetails:
      'This online platform is very nice. I am very happy to join this platform. The Course Teacher is very helpful ,he all  time try to teach something very care.',
    star: 5,
  },
  {
    id: '9',
    name: 'Shaharin Mehjabin Mim',
    job: 'Student, DIU',
    photoUrl: '/review/woman.png',
    reviewDetails:
      "First of all The data analyst course's module which I liked the most. the course mentor's teaching skill is mesmerizing. He is affable and admirable. thanks to you of data solution360 team for having such course. hope for the best.",
    star: 5,
  },
];

export const freeCourseData = [
  {
    id: '1',
    title: 'Complete Data analyst boot-camp',
    photoUrl: '/course/free-course-1.jpg',
    link: '/free-course/overview/data-analyst-boot-camp',
  },
];
