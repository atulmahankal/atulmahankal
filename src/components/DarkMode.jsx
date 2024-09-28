import React, { useState, useEffect } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";

const DarkMode = ({ className }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ?? "light",
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  return (
    <>
      { theme === "dark" ? (
        <BiSolidSun onClick={ () => setTheme("light") } className={`text-2xl text-white ${className}`} />
      ) : (
        <BiSolidMoon onClick={ () => setTheme("dark") } className={`text-2xl ${className}`} />
      ) }
    </>
  );
};

export default DarkMode;