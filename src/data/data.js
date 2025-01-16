import {
  BarChart,
  Clipboard,
  ClipboardList,
  DollarSign,
  Edit,
  Facebook,
  FileMinus,
  FilePlus,
  FileSearch,
  FileText,
  Home,
  Linkedin,
  MessageCircle,
  PieChart,
  PlayCircle,
  User,
  UserPlus,
  Users,
  Video,
  Youtube,
} from 'lucide-react';

// NOTE: FOCUS
export const linksAdmin = [
  {
    title: 'Dashboard',
    key: '1',
    links: [
      {
        name: 'Home',
        link: '/admin/dashboard',
        icon: <Home />,
        role: ['admin'],
      },
      {
        name: 'Edit Home Page',
        link: '/admin/home-page',
        icon: <Edit />,
        role: ['content_manager', 'admin'],
      },
      {
        name: 'Set User Role',
        link: '/admin/user-role',
        icon: <Users />,
        role: ['admin'],
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
        icon: <FilePlus />,
        role: ['admin', 'content_manager'],
      },
      {
        name: 'Manage Courses',
        link: '/admin/course/manage-course',
        icon: <Clipboard />,
        role: ['admin', 'content_manager'],
      },
      {
        name: 'New batch',
        link: '/admin/course/create-new-batch',
        icon: <FileText />,
        role: ['admin', 'content_manager'],
      },
      {
        name: 'All batch',
        link: '/admin/course/all-batch',
        icon: <ClipboardList />,
        role: ['admin', 'content_manager'],
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
        icon: <FilePlus />,
        role: ['admin', 'content_manager'],
      },
      {
        name: 'Edit Blog',
        link: '/admin/myBlogs',
        icon: <FileText />,
        role: ['admin', 'content_manager'],
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
        icon: <UserPlus />,
        role: ['admin'],
      },
      {
        name: 'All Students',
        link: '/admin/all-student',
        icon: <Users />,
        role: ['admin'],
      },
    ],
  },
  {
    title: 'Forms',
    key: '5',
    links: [
      {
        name: 'Create form',
        link: '/admin/forms/new-form',
        icon: <FileText />,
        role: ['admin', 'content_manager'],
      },
      {
        name: 'Form data',
        link: '/admin/forms/form-data',
        icon: <ClipboardList />,
        role: ['admin'],
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
        icon: <DollarSign />,
        role: ['admin', 'content_manager'],
      },
      {
        name: 'Coupon data',
        link: '/admin/coupons/coupon-data',
        icon: <BarChart />,
        role: ['admin', 'content_manager'],
      },
    ],
  },
  {
    title: 'Lead & Sells',
    key: '6',
    links: [
      {
        name: 'Lead Tracking',
        link: '/admin/lead-sells/lead-tracking',
        icon: <PieChart />,
        role: ['admin', 'lead_member'],
      },
      {
        name: 'Sells Tracking',
        link: '/admin/lead-sells/sells-tracking',
        icon: <DollarSign />,
        role: ['admin', 'sells_member'],
      },
      {
        name: 'All Reports',
        link: '/admin/lead-sells/all-reports',
        icon: <FileSearch />,
        role: ['admin'],
      },
      {
        name: 'Summary',
        link: '/admin/lead-sells/summary-reports',
        icon: <FileMinus />,
        role: ['admin'],
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
        icon: <FileText />,
        role: ['admin'],
      },
      {
        name: 'Team Member',
        link: '/admin/team_member',
        icon: <Users />,
        role: ['admin', 'content_manager'],
      },
      {
        name: 'Instructor',
        link: '/admin/instructors',
        icon: <UserPlus />,
        role: ['admin', 'content_manager'],
      },
    ],
  },
];

// NOTE: FOCUS
export const linksStudents = [
  {
    name: 'Class Joining',
    link: '/students/class-joining',
    icon: <PlayCircle />,
  },
  {
    name: 'My Course',
    link: '/students/my-course',
    icon: <Clipboard />,
  },
  {
    name: 'Resource',
    link: '/students/resource',
    icon: <FileText />,
  },
  {
    name: 'Recording',
    link: '/students/recording',
    icon: <Video />,
  },
  {
    name: 'Profile',
    link: '/students/profile',
    icon: <User />,
  },
];

// NOTE: FOCUS
export const footerFollowUs = [
  {
    id: '1',
    link: 'https://www.facebook.com/Datasolution360',
    title: 'Facebook',
    icon: <Facebook />,
    brandColor: '#1877F2',
  },

  {
    id: '2',
    link: 'https://www.linkedin.com/company/data-solution-360',
    title: 'LinkedIn',
    icon: <Linkedin />,
    brandColor: '#0A66C2',
  },

  {
    id: '3',
    link: 'https://wa.me/+8801996104096',
    title: 'Whatsapp',
    icon: <MessageCircle />,
    brandColor: '#25D366',
  },
  {
    id: '4',
    link: 'https://www.youtube.com/@datasolution-3607',
    title: 'Youtube',
    icon: <Youtube />,
    brandColor: '#FF0000',
  },
];

// NOTE: FOCUS
export const dashboardAdmin = [
  {
    id: '1',
    title: 'Total Students',
    gridClass: false,
    classes: '',
    bgFrom: ' #1a9f53',
    bgTo: '#4eda89',
    icon: <Users />,
  },

  {
    id: '2',
    title: 'Total Courses',
    gridClass: false,
    classes: '',
    bgFrom: '#be0ee1',
    bgTo: '#ed68ff',
    icon: <Clipboard />,
  },
  {
    id: '3',
    title: 'Total Reviews',
    gridClass: true,
    bgTo: '#ff5648',
    bgFrom: '#da5568',
    icon: <Users />,
  },
  {
    id: '4',
    title: ' Total Video Lessons',
    gridClass: false,
    classes: '',
    bgFrom: '#2b77e5',
    bgTo: '#64b3f6',
    icon: <Video />,
  },
  {
    id: '5',
    title: 'Total Blog',
    gridClass: false,
    classes: '',
    bgFrom: '#e1940e',
    bgTo: '#f4d02b',
    icon: <PlayCircle />,
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
