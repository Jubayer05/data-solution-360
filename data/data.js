// Framework
// import angularIcon from "@iconify/icons-logos/angular-icon";
import angularIcon from "@iconify/icons-logos/angular-icon";
import flutterIcon from "@iconify/icons-logos/flutter";
import nodejsIcon from "@iconify/icons-logos/nodejs";
import springIcon from "@iconify/icons-logos/spring";
import unityIcon from "@iconify/icons-logos/unity";

// qaAutomations
import appiumIcon from "@iconify/icons-logos/appium";
// import apachejmeterIcon from "@iconify-icons/simple-icons/apachejmeter";

// Language
import javaIcon from "@iconify/icons-logos/java";
import javascriptIcon from "@iconify/icons-logos/javascript";
import pythonIcon from "@iconify/icons-logos/python";
// import golangIcon from "@iconify-icons/grommet-icons/golang";

// Devops
import terraformIcon from "@iconify/icons-logos/terraform";
import ansibleIcon from "@iconify/icons-logos/ansible";
import awsIcon from "@iconify/icons-logos/aws";
import consulIcon from "@iconify/icons-logos/consul";
import dockerIcon from "@iconify/icons-logos/docker";
import gitIcon from "@iconify/icons-logos/git";
import kubernetesIcon from "@iconify/icons-logos/kubernetes";
import jenkinsIcon from "@iconify/icons-logos/jenkins";
import nomadIcon from "@iconify/icons-logos/nomad";
import prometheusIcon from "@iconify/icons-logos/prometheus";
// import fluentdIcon from "@iconify-icons/simple-icons/fluentd";
import grafanaIcon from "@iconify/icons-logos/grafana";

// Data Analysis
import airflowIcon from "@iconify/icons-logos/airflow";
// import apacheSpark from "@iconify-icons/cib/apache-spark";
// import apachenetbeansideIcon from "@iconify-icons/simple-icons/apachenetbeanside";

// Database
import mongodbIcon from "@iconify/icons-logos/mongodb";
import cassandraIcon from "@iconify/icons-logos/cassandra";
// import sqlIcon from "@iconify-icons/carbon/sql";
import redisIcon from "@iconify/icons-logos/redis";
import postgresqlIcon from "@iconify/icons-logos/postgresql";
import elasticsearchIcon from "@iconify/icons-logos/elasticsearch";

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
    title: "This is the course heading",
    point1: "This is point no 1",
    point2: "This is point no 2",
    img: "/course/data-science.jpg",
  },
  {
    id: "2",
    title: "This is the course heading",
    point1: "This is point no 1",
    point2: "This is point no 2",
    img: "/course/data-science-2.jpg",
  },
  {
    id: "3",
    title: "This is the course heading",
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
    title: "Database",
    technology: [
      {
        id: "1",
        img: mongodbIcon,
      },
      {
        id: "2",
        img: cassandraIcon,
      },
      {
        id: "3",
        img: redisIcon,
      },
      {
        id: "4",
        img: postgresqlIcon,
      },
      {
        id: "5",
        img: elasticsearchIcon,
      },
    ],
  },
  {
    id: "3",
    title: "Data Analysis",
    technology: [
      {
        id: "4",
        img: airflowIcon,
      },
      {
        id: "5",
        img: elasticsearchIcon,
      },
    ],
  },
  {
    id: "4",
    title: "Devops",
    technology: [
      {
        id: "1",
        img: terraformIcon,
      },
      {
        id: "2",
        img: ansibleIcon,
      },
      {
        id: "3",
        img: awsIcon,
      },
      {
        id: "4",
        img: consulIcon,
      },
      {
        id: "5",
        img: dockerIcon,
      },
      {
        id: "6",
        img: gitIcon,
      },
      {
        id: "7",
        img: kubernetesIcon,
      },
      {
        id: "8",
        img: jenkinsIcon,
      },
      {
        id: "9",
        img: nomadIcon,
      },
      {
        id: "10",
        img: prometheusIcon,
      },
      {
        id: "11",
        img: grafanaIcon,
      },
    ],
  },
  {
    id: "5",
    title: "QA automation",
    technology: [
      {
        id: "1",
        img: appiumIcon,
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
    question: "5. Question no 5?",
    answer:
      "Data science is the domain of study that deals with vast volumes of data using modern tools and techniques to find unseen patterns, derive meaningful information, and make business decisions. Data science uses complex machine learning algorithms to build predictive models.",
  },
];
