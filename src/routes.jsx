import { BiGridAlt, BiSolidBriefcase, BiSolidCamera, BiSolidContact } from "react-icons/bi";
import { AiOutlineSolution } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";

// Page components
import HomePage from './pages/HomePage';
// import AboutMePage from './pages/AboutMePage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
// import ProjectsPage from './pages/ProjectsPage';
// import PhotographyPage from './pages/PhotographyPage';
import ErrorPage from './pages/ErrorPage';

export const routes = [
  {
    path: '/',
    title: 'Home',
    component: HomePage,
    icon: <BiGridAlt />,
    metas: {
      name: {
        title: "",
        description: "This is the homepage of my awesome website.",
        url: "",
        keywords: "",
      },
      property:{
        "og:image": "/src/assets/img/profile-img.jpg",
        "og:image:width": "120",
        "og:image:height": "62",
      }
    }
  },
  {
    path: '/aboutme',
    title: 'About Me',
    component: null, //AboutMePage,
    icon: <AiOutlineSolution />,
  },
  {
    path: '/experience',
    title: 'Experience',
    component: ExperiencePage,
    icon: <BiSolidBriefcase />,
  },
  {
    path: '/projects',
    title: 'Projects',
    component: null, //ProjectsPage,
    icon: <FaHandshake />,
  },
  {
    path: '/applications',
    title: 'Applications',
    component: null, //ProjectsPage,
    icon: <FaHandshake />,
  },
  {
    path: '/photography',
    title: 'Photography',
    component: null, //PhotographyPage,
    icon: <BiSolidCamera />,
  },
  {
    path: '/contact',
    title: 'Contact',
    component: ContactPage,
    icon: <BiSolidContact />,
    metas: {
      name: {
        description: "Contact Details of Atul Mahankal.",
      },
      property:null
    }
  },
  {
    path: '*',
    title: 'Error',
    component: (props) => <ErrorPage errorCode="404" errorMessage="Page Not Found" {...props} />,
    icon: null,
  }
];
