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
    component: (props) => (
      <ErrorPage
        errorCode="Coming Soon"
        errorMessage="This page is under development"
        {...props}
      />
    ),
    icon: <AiOutlineSolution />,
    metas: {
      name: {
        title: "About Me - Atul Mahankal",
        description: "Learn more about Atul Mahankal's background and experience.",
        url: "/aboutme",
        keywords: "about, profile, biography",
      },
      property: {
        "og:image": "/src/assets/img/profile-img.jpg",
        "og:image:width": "120",
        "og:image:height": "62",
      }
    }
  },
  {
    path: '/experience',
    title: 'Experience',
    component: ExperiencePage,
    icon: <BiSolidBriefcase />,
    metas: {
      name: {
        title: "Experience - Atul Mahankal",
        description: "Professional experience and work history of Atul Mahankal.",
        url: "/experience",
        keywords: "experience, work, career, professional",
      },
      property: {
        "og:image": "/src/assets/img/profile-img.jpg",
        "og:image:width": "120",
        "og:image:height": "62",
      }
    }
  },
  {
    path: '/projects',
    title: 'Projects',
    component: (props) => (
      <ErrorPage
        errorCode="Coming Soon"
        errorMessage="This page is under development"
        {...props}
      />
    ),
    icon: <FaHandshake />,
    metas: {
      name: {
        title: "Projects - Atul Mahankal",
        description: "Portfolio of projects by Atul Mahankal.",
        url: "/projects",
        keywords: "projects, portfolio, work, development",
      },
      property: {
        "og:image": "/src/assets/img/profile-img.jpg",
        "og:image:width": "120",
        "og:image:height": "62",
      }
    }
  },
  {
    path: '/applications',
    title: 'Applications',
    component: (props) => <ErrorPage errorCode="Coming Soon" errorMessage="This page is under development" {...props} />,
    icon: <FaHandshake />,
    metas: {
      name: {
        title: "Applications - Atul Mahankal",
        description: "Web applications and software developed by Atul Mahankal.",
        url: "/applications",
        keywords: "applications, software, development, web apps",
      },
      property: {
        "og:image": "/src/assets/img/profile-img.jpg",
        "og:image:width": "120",
        "og:image:height": "62",
      }
    }
  },
  {
    path: '/photography',
    title: 'Photography',
    component: (props) => (
      <ErrorPage
        errorCode="Coming Soon"
        errorMessage="This page is under development"
        {...props}
      />
    ),
    icon: <BiSolidCamera />,
    metas: {
      name: {
        title: "Photography - Atul Mahankal",
        description: "Photography portfolio by Atul Mahankal.",
        url: "/photography",
        keywords: "photography, photos, portfolio, gallery",
      },
      property: {
        "og:image": "/src/assets/img/profile-img.jpg",
        "og:image:width": "120",
        "og:image:height": "62",
      }
    }
  },
  {
    path: '/contact',
    title: 'Contact',
    component: ContactPage,
    icon: <BiSolidContact />,
    metas: {
      name: {
        title: "Contact - Atul Mahankal",
        description: "Contact Details of Atul Mahankal.",
        url: "/contact",
      },
      property:null
    }
  },
  {
    path: '*',
    title: 'Error',
    component: (props) => (
      <ErrorPage
        errorCode="404"
        errorMessage="Page Not Found"
        {...props}
      />
    ),
    icon: null,
    metas: {
      name: {
        title: "Page Not Found - Atul Mahankal",
        description: "The requested page could not be found.",
        url: "",
        keywords: "error, 404, not found",
      },
      property: null
    }
  }
];

// Export only the valid page paths for vite.config.js (ignore "*")
export const routePaths = routes
  .map(r => r.path)
  .filter(p => p && p !== '*');
