
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { FiSmartphone, FiMail, FiMap, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import AutoLink from '@/components/AutoLink';

const ContactPage = () => {
  const contacts = [
    { 
      icon: <FiSmartphone className='text-blue-600 dark:text-blue-400' />, 
      title: 'Call Me', 
      detail: '+919967181952',
      description: 'Mon-Fri from 10am to 6pm IST'
    },
    { 
      icon: <FiMail className='text-green-600 dark:text-green-400' />, 
      title: 'Email Me', 
      detail: 'atulmahankal@gmail.com',
      description: 'Send me an email anytime!'
    },
    { 
      icon: <FiMap className='text-purple-600 dark:text-purple-400' />, 
      title: 'Visit Me', 
      detail: 'Neral, Karjat, Maharashtra',
      description: 'Mumbai Metropolitan Region'
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Let's Work Together
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it. Get in touch and let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Ready to start your next project? Contact me through any of the following methods:
              </p>
            </div>

            <div className="space-y-6">
              {contacts.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="card hover:shadow-lg transition-professional group"
                >
                  <div className='flex items-start space-x-4'>
                    <div className='flex-shrink-0 w-14 h-14 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300'>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-1'>
                        {item.title}
                      </h3>
                      <div className='text-lg text-gray-700 dark:text-gray-300 mb-1'>
                        <AutoLink value={item.detail} />
                      </div>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Connect on Social Media
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Follow me for updates on my latest projects and tech insights.
              </p>
              <div className="flex space-x-3">
                <a 
                  href="https://twitter.com/atulmahankal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  Follow on Twitter
                </a>
                <a 
                  href="https://linkedin.com/in/atulmahankal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Send a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <form method='post' action='/' className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    required
                    id="full-name"
                    name="full-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project Discussion"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or ask any questions..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Minimum 10 characters required.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button 
                  type="reset" 
                  className="btn-secondary"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center space-x-2"
                >
                  <FiSend className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Response Time Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-green-700 dark:text-green-400 font-medium">
              Typically responds within 24 hours
            </span>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
