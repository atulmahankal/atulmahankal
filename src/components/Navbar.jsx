import React from 'react'
import DarkMode from './DarkMode'
import { routes } from '../routes';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { FaTwitter, FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaSkype } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const currentRoute = routes.find(route => route.path === location.pathname);
  const title = currentRoute ? currentRoute.title : '';

  const socialLink = [
    { icon: <FaTwitter className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 text-2xl mx-2 dark:text-white" />, link: 'https://twitter.com/atulmahankal' },
    { icon: <FaFacebookSquare className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 text-2xl mx-2 dark:text-white" />, link: 'https://www.facebook.com/atulmahankal' },
    { icon: <FaInstagramSquare className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 text-2xl mx-2 dark:text-white" />, link: 'https://www.instagram.com/atulmahankal/' },
    { icon: <FaLinkedin className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 text-2xl mx-2 dark:text-white" />, link: 'https://www.linkedin.com/in/atulmahankal' },
    // { icon: <FaSkype className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 text-2xl mx-2 dark:text-white" />, link: 'https://join.skype.com/invite/wk3d18mj9vyZ' },
  ];

  const metaname = currentRoute.metas?.name ?? null;
  const metaproperty = currentRoute.metas?.property ?? null;

  return (
    <>
      <Helmet>
        <title>{ currentRoute.title }</title>

        { metaname && Object.keys(metaname).map((name, index) => (
          <meta key={ index } name={ name } content={ metaname[name] } />
        )) }

        { metaproperty && Object.keys(metaproperty).map((name, index) => (
          <meta key={ index } property={ name } content={ metaproperty[name] } />
        )) }
      </Helmet>

      <nav className="fixed top-0 z-50 w-full px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
        {/* supports-backdrop-blur:bg-slate-50/75 bg-slate-900/75 */ }
        <div className="flex items-center justify-between rounded-md">
          <a href="/" className="flex ms-2 sm:me-24">
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap hidden sm:block">Freelancer Atul</span>
          </a>
          <button type="button" onClick={ toggleSidebar } className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
        </div>
        <div className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap font-bold'>
          { title }
        </div>
        <div className="flex items-center rounded p-1 drop-shadow hover:drop-shadow-none"> {/* bg-white dark:bg-gray-800"> */ }
          <div className="flex items-center">
            { socialLink.map((item, index) => (
              <Link key={ index } to={ item.link } target='_blank'>
                { item.icon }
              </Link>
            )) }
            <DarkMode className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 mx-2 cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar