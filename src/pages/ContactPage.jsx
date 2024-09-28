import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { FiSmartphone, FiMail, FiMap } from "react-icons/fi";
import AutoLink from '@/components/AutoLink';

const ContactPage = () => {
  const contacts = [
    { icon: <FiSmartphone className='p-3 text-5xl' />, title: 'Call on', detail: '+919967181952' },
    { icon: <FiMail className='p-3 text-5xl' />, title: 'Mail to', detail: 'atulmahankal@gmail.com' },
    { icon: <FiMap className='p-3 text-5xl' />, title: 'Visit at', detail: 'Neral, Karjat, Maharashtra' },
  ];

  return (
    <MainLayout>
      <div>
        <p className="text-4xl font-bold text-center my-2 pb-3">Contact me to get your work done.</p>

        <div className="flex justify-between w-full p-2">
          <div className='flex flex-col'>
            { contacts.map((item, index) => (
              <div key={ index } className='flex items-center py-2'>
                <div className='rounded-full border border-black dark:border-white justify-center'>
                  {/* <FaMobileAlt className='p-3 text-5xl' /> */ }
                  { item.icon }
                </div>
                <div className="p-2">
                  <div className='text-2xl font-bold'>{ item.title }</div>
                  <div className='text-1xl'><AutoLink value={ item.detail } /></div>
                </div>
              </div>
            )) }
          </div>
          <form className='grow text-center bg-white rounded-md p-8 m-4' method='post' action='/'>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Your Name
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        id="full-name"
                        name="full-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact" className="block text-sm font-medium leading-6 text-gray-900">
                     Contact Number
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        id="contact"
                        name="contact"
                        type="tel"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                      Your Message
                    </label>
                    <div className="mt-2">
                      <textarea
                        required
                        id="message"
                        name="message"
                        autoComplete="message"
                        rows={5}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences.</p>
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end gap-x-6">
              <button type="reset" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;