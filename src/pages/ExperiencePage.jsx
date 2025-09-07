import React, { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiBriefcase, FiMonitor } from 'react-icons/fi';
import axios from 'axios';
import { buildGoogleSheetsURL, formatExperienceData, GOOGLE_SHEETS_CONFIG } from '@/utils';

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {experience.designation}
          </h3>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
            {experience.company}
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {experience.mode}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <FiCalendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {experience.from} - {experience.upto || 'Present'}
          </span>
          <FiMapPin className="w-4 h-4 m-2" />
          <span className="text-sm">{experience.location}</span>
        </div>
      </div>

      {/* Tech Stack */}
      {experience.techStack && (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <FiMonitor className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {experience.techStack.split(',').map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Work Descriptions */}
      {experience.workDescriptions && (
        <div>
          <div className="flex items-center mb-2">
            <FiBriefcase className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Key Responsibilities
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {experience.workDescriptions.split('.').filter(desc => desc.trim()).map((desc, descIndex) => (
              <p key={descIndex} className="mb-1">
                • {desc.trim()}
              </p>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const LoadingCard = ({ index }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
  >
    <div className="animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </motion.div>
);

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperienceData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const url = buildGoogleSheetsURL(GOOGLE_SHEETS_CONFIG.experienceSheet);
      const response = await axios.get(url);

      const formattedData = formatExperienceData(response.data);

      // Save to sessionStorage
      sessionStorage.setItem('experienceData', JSON.stringify(formattedData));

      setExperiences(formattedData);
    } catch (error) {
      console.error('Error fetching sheet data:', error);
      setError('Failed to load experience data. Please try again later.');
      setExperiences([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if data is already cached
    const cachedData = sessionStorage.getItem('experienceData');
    if (cachedData) {
      try {
        setExperiences(JSON.parse(cachedData));
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing cached data:', error);
        fetchExperienceData();
      }
    } else {
      fetchExperienceData();
    }
  }, []);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Professional Experience
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A journey through my professional career, showcasing the roles, technologies, and achievements that have shaped my expertise.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {isLoading ? (
            // Loading state
            Array.from({ length: 3 }).map((_, index) => (
              <LoadingCard key={index} index={index} />
            ))
          ) : error ? (
            // Error state
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                <button
                  onClick={fetchExperienceData}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          ) : experiences.length === 0 ? (
            // Empty state
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  No experience data available at the moment.
                </p>
              </div>
            </motion.div>
          ) : (
            // Experience cards
            experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ExperiencePage;
