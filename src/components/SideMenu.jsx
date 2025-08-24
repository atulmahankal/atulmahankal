import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function SideMenu({ key = null, icon = null, title, badge = null, children: wrapperChildren, ...props }) {
  const [isExpanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded(!isExpanded);
  };

  return (
    <>
      <div className="cursor-pointer rounded-lg bg-white dark:bg-gray-800 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:border-b-2 dark:hover:border-b-2 group">
        <div className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
          {/* { icon } */}
          {icon ?? <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" />}
        </div>
        <span className="flex-1 ms-3 whitespace-nowrap">{ title }</span>
        { badge && (
          <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
            { badge }
          </span>
        ) }
        { wrapperChildren &&
          <>
            { isExpanded ? (
              <>
                <IoIosArrowUp onClick={ toggleMenu } />
              </>
            ) : (
              <>
                <IoIosArrowDown onClick={ toggleMenu } />
              </>
            ) }
          </>
        }
      </div>

      {/* Nested Items */ }
      { isExpanded && wrapperChildren && (
        <>
            <ul className="ml-6 cursor-pointer rounded-lg bg-white dark:bg-gray-800 items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          { React.Children.map(wrapperChildren, (child, index) => (
              React.cloneElement(child, { key: index })
            )) }
            </ul>
        </>
      ) }
    </>
  )
}

export default SideMenu