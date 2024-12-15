import { CgProfile } from 'react-icons/cg';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FiVideo } from 'react-icons/fi';
import { IoLogoYoutube } from 'react-icons/io';
import {
  MdContentCopy,
  MdOutlineCreateNewFolder,
  MdOutlineDiscount,
  MdReviews,
} from 'react-icons/md';
import { RiAdminFill, RiCoupon3Line } from 'react-icons/ri';

import {
  AiOutlineFundView,
  AiOutlineHome,
  AiOutlineVideoCameraAdd,
} from 'react-icons/ai';
import { FiBookOpen } from 'react-icons/fi';
import { GiTeacher } from 'react-icons/gi';
import { RiFileVideoFill } from 'react-icons/ri';

import { ImBlog } from 'react-icons/im';
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
    key: '1',
    links: [
      {
        name: 'Home',
        link: '/admin/dashboard',
        icon: <AiOutlineHome />,
      },
      {
        name: 'Edit Home Page',
        link: '/admin/home-page',
        icon: <RiHomeGearFill />,
      },
    ],
  },
  {
    title: 'Courses',
    key: '2',
    links: [
      {
        name: 'Add a course',
        link: '/admin/course/add-course',
        icon: <AiOutlineVideoCameraAdd />,
      },
      {
        name: 'Manage Courses',
        link: '/admin/course/manage-course',
        icon: <MdCastForEducation />,
      },
      {
        name: 'New batch',
        link: '/admin/course/create-new-batch',
        icon: <MdOutlineCreateNewFolder />,
      },
      {
        name: 'All batch',
        link: '/admin/course/all-batch',
        icon: <MdOutlineContentPaste />,
      },
    ],
  },
  {
    title: 'Blog',
    key: '3',
    links: [
      {
        name: 'Add blog',
        link: '/admin/addBlogContent',
        icon: <ImBlog />,
      },
      {
        name: 'Edit Blog',
        link: '/admin/myBlogs',
        icon: <AiOutlineFundView />,
      },
    ],
  },
  {
    title: 'Students',
    key: '4',
    links: [
      {
        name: 'New Students',
        link: '/admin/new-student',
        icon: <MdOutlineUnsubscribe />,
      },
      {
        name: 'All Students',
        link: '/admin/all-student',
        icon: <RiTeamLine />,
      },
    ],
  },
  {
    title: 'Forms',
    key: '5',
    links: [
      {
        name: 'Add a new form',
        link: '/admin/forms/new-form',
        icon: <MdOutlineUnsubscribe />,
      },
      {
        name: 'Form data',
        link: '/admin/forms/form-data',
        icon: <RiTeamLine />,
      },
    ],
  },
  {
    title: 'Coupons',
    key: '6',
    links: [
      {
        name: 'Add Coupon',
        link: '/admin/coupons/new-coupon',
        icon: <RiCoupon3Line />,
      },
      {
        name: 'Coupon data',
        link: '/admin/coupons/coupon-data',
        icon: <MdOutlineDiscount />,
      },
    ],
  },
  {
    title: 'Others',
    key: '7',
    links: [
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
];

export const linksStudents = [
  {
    name: 'Class Joining',
    link: '/students/class-joining',
    icon: <RiVideoAddLine />,
  },
  {
    name: 'My Course',
    link: '/students/my-course',
    icon: <MdOutlineContentPaste />,
  },
  {
    name: 'Resource',
    link: '/students/resource',
    icon: <FiBookOpen />,
  },
  {
    name: 'Recording',
    link: '/students/recording',
    icon: <RiFileVideoFill />,
  },
  {
    name: 'Profile',
    link: '/students/profile',
    icon: <CgProfile />,
  },
];

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
    // dropdown: [
    //   {
    //     id: 'dropdown-1',
    //     title: 'Ed-Tech',
    //     link: '/services/edTech',
    //   },
    //   // {
    //   //   id: 'dropdown-2',
    //   //   title: 'B2B',
    //   //   link: '/services/b2b',
    //   // },
    //   // {
    //   //   id: 'dropdown-3',
    //   //   title: 'Consultancy',
    //   //   link: '/services/consultancy',
    //   // },
    // ],
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
  // {
  //   id: 'nav-7',
  //   title: 'Practice Zone',
  //   titleBang: 'প্র্যাক্টিস জোন',
  //   link: '/practice-code',
  // },
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

export const footerExploreData = [
  {
    id: '1',
    title: 'Contact Us',
    Link: '/contact',
  },
  {
    id: '2',
    title: 'Upcoming Live Batch',
    Link: '/#courses',
  },
  {
    id: '3',
    title: 'Gallery',
    Link: '/gallery',
  },
  {
    id: '4',
    title: 'Blog & News',
    Link: '/blog',
  },
  {
    id: '5',
    title: 'FAQ Questions',
    Link: '/faq',
  },
];

export const footerUsefulLinksData = [];

export const footerAboutData = [
  {
    id: '1',
    title: 'Prospectus',
    Link: '/prospectus',
  },
  {
    id: '2',
    title: 'About Us',
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

export const colors = [
  '#3498db',
  '#e74c3c',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
  '#1abc9c',
  '#e67e22',
  '#34495e',
  '#d35400',
  '#27ae60',
  '#3498db',
  '#e74c3c',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
  '#1abc9c',
  '#e67e22',
  '#34495e',
  '#d35400',
  '#27ae60',
  '#3498db',
  '#e74c3c',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
  '#1abc9c',
  '#e67e22',
  '#34495e',
  '#d35400',
  '#27ae60',
  '#3498db',
  '#e74c3c',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
  '#1abc9c',
  '#e67e22',
  '#34495e',
  '#d35400',
  '#27ae60',
];

export const bg_colors = [
  'rgba(52, 152, 219, 0.2)',
  'rgba(231, 76, 60, 0.2)',
  'rgba(46, 204, 113, 0.2)',
  'rgba(243, 156, 18, 0.2)',
  'rgba(155, 89, 182, 0.2)',
  'rgba(26, 188, 156, 0.2)',
  'rgba(230, 126, 34, 0.2)',
  'rgba(52, 73, 94, 0.2)',
  'rgba(211, 84, 0, 0.2)',
  'rgba(39, 174, 96, 0.2)',
  'rgba(52, 152, 219, 0.2)',
  'rgba(231, 76, 60, 0.2)',
  'rgba(46, 204, 113, 0.2)',
  'rgba(243, 156, 18, 0.2)',
  'rgba(155, 89, 182, 0.2)',
  'rgba(26, 188, 156, 0.2)',
  'rgba(230, 126, 34, 0.2)',
  'rgba(52, 73, 94, 0.2)',
  'rgba(211, 84, 0, 0.2)',
  'rgba(39, 174, 96, 0.2)',
  'rgba(52, 152, 219, 0.2)',
  'rgba(231, 76, 60, 0.2)',
  'rgba(46, 204, 113, 0.2)',
  'rgba(243, 156, 18, 0.2)',
  'rgba(155, 89, 182, 0.2)',
  'rgba(26, 188, 156, 0.2)',
  'rgba(230, 126, 34, 0.2)',
  'rgba(52, 73, 94, 0.2)',
  'rgba(211, 84, 0, 0.2)',
  'rgba(39, 174, 96, 0.2)',
  'rgba(52, 152, 219, 0.2)',
  'rgba(231, 76, 60, 0.2)',
  'rgba(46, 204, 113, 0.2)',
  'rgba(243, 156, 18, 0.2)',
  'rgba(155, 89, 182, 0.2)',
  'rgba(26, 188, 156, 0.2)',
  'rgba(230, 126, 34, 0.2)',
  'rgba(52, 73, 94, 0.2)',
  'rgba(211, 84, 0, 0.2)',
  'rgba(39, 174, 96, 0.2)',
];

export const userNamePrefix = [
  'Mr',
  'Mrs',
  'Ms',
  'Miss',
  'Dr',
  'Prof',
  'Rev',
  'Hon',
  'Sir',
  'Lady',
  'Lord',
  'Md',
  'Mx',
  'Mstr',
  'Capt',
  'Maj',
  'Col',
  'Gen',
  'Lt',
  'Lt Col',
  'Brig',
  'Adm',
  'Cmdr',
  'Cpl',
  'Sgt',
  'Pvt',
  'Fr',
  'Sr',
  'Br',
  'Deacon',
  'Elder',
  'Rabbi',
  'Sheikh',
  'Imam',
];
