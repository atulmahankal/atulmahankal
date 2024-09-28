import React from "react";
import MainLayout from '@/layouts/MainLayout';
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import conferancePhoto from '@/assets/img/mySelf_at_conferance.png';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="flex justify-between w-full">
        <div className='grow flex flex-col items-center justify-center text-center'>
          <div className="rounded-md text-orange-800 font-bold supports-backdrop-blur:bg-green-50/100 bg-green-100/100 p-3">
            <h1 className="text-5xl">Atul D. Mahankal</h1>
            <p className="text-3xl">
              I'm&nbsp;
              <span className="border-b-4 border-[#149ddd]">
                <ReactTyped
                  strings={ [
                    "Designer", "Programer", "Developer", "Freelancer",
                  ] }
                  typeSpeed={ 100 }
                  backSpeed={ 50 }
                  loop
                />
              </span>
            </p>
          </div>
          <motion.div
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            transition={ { duration: 3 } }
            className="hero-content"
          >
            <p className="pt-2">Your one-stop solution for Web Application Development.</p>
          </motion.div>
        </div>
        <div className="grow flex flex-col items-center justify-center text-center">
          <img className="photo" alt="Profile Photo" src={ conferancePhoto } style={ { height: 400, width: 400 } } />
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
