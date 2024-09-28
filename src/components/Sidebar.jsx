import React from 'react'
import { Link } from 'react-router-dom';
import SideMenu from './SideMenu'

import { BiSolidContact, BiGridAlt, BiSolidCamera, BiSolidBriefcase } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa";
import { AiOutlineSolution } from "react-icons/ai";

function Sidebar({ isSidebarOpen }) {
  const menus = [
    { title: "Home", route: "/", component: <BiGridAlt /> },
    { title: "About Me", route: "/aboutme", component: <AiOutlineSolution /> },
    { title: "Experience", route: "/experience", component: <BiSolidBriefcase /> },
    { title: "Projects", route: "/projects", component: <FaHandshake /> },
    { title: "Photography", route: "/photography", component: <BiSolidCamera /> },
    { title: "Contact", route: "/contact", component: <BiSolidContact /> },
  ];

  return (
    <aside id="logo-sidebar" className={ `fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-slate-200 dark:bg-black/50 supports-backdrop-blur:bg-purple-50/25 bg-green-900/25 transition-transform transform transform-gpu ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:transform-none` }>
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          { menus.map((item, index) => (
            <li key={ index }><Link to={ item.route }>
             <SideMenu icon={ item.component } title={ item.title  } />
            </Link></li>
          )) }
          {/* <li><Link to="/"><SideMenu icon={<BiGridAlt />} title="Home" /></Link></li>
          <li><Link to="/aboutme" ><SideMenu icon={<BiSolidBriefcase />} title="Experience" /></Link></li>
          <li><Link to="/experience" ><SideMenu icon={<BiSolidBriefcase />} title="Experience" /></Link></li>
          <li><Link to="/contact" ><SideMenu icon={<BiSolidContact />} title="Contact" /></Link></li> */}

          {/* <SideMenu title="Projects" badge="New" >
            <Link to="/project1"><SideMenu title="Project 1" /></Link>
            <Link to="/project2"><SideMenu title="Project 2" /></Link>
            <Link to="/project3"><SideMenu title="Project 3" /></Link>
            </SideMenu> */}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar