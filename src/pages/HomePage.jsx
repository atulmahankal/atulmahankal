import React from "react";
import { Link } from "react-router-dom";
import MainLayout from '@/layouts/MainLayout';
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import conferancePhoto from '@/assets/img/mySelf_at_conferance.png';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
        <div className="flex-1 flex flex-col items-end justify-start lg:items-center lg:justify-center order-1 lg:order-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-lg opacity-20"></div>
            <img
              className="relative rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
              alt="Profile Photo"
              src={ conferancePhoto }
              style={ { height: 350, width: 350 } }
            />
          </div>
        </div>
        <div className='flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1'>
          <div className="p-8">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Atul D. Mahankal
            </h1>
            <div className="text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-6">
              I'm a&nbsp;
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                <ReactTyped
                  strings={ [
                    "Full-Stack Developer", "UI/UX Designer", "Software Engineer", "Freelancer",
                  ] }
                  typeSpeed={ 100 }
                  backSpeed={ 50 }
                  loop
                />
              </span>
            </div>
          </div>
          <motion.div
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 1, delay: 0.5 } }
            className="hero-content"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
              Crafting innovative web solutions with modern technologies.
              Your one-stop destination for professional web application development.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/projects"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-block text-center"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors inline-block text-center"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
