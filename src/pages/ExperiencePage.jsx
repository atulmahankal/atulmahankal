import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiBriefcase, FiMonitor } from 'react-icons/fi';
import axios from 'axios';
import { buildGoogleSheetsURL, formatExperienceData, GOOGLE_SHEETS_CONFIG, SEARCH_CATEGORIES } from '@/utils';
import AdvancedSearch from '@/components/AdvancedSearch';

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
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <FiMapPin className="w-4 h-4 mr-2" />
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
  const [searchFilters, setSearchFilters] = useState({ filters: {}, excludeFilters: {} });
  const [searchParams, setSearchParams] = useSearchParams();

  // Get available values for search categories
  const getCategoryValues = () => {
    const values = {};

    if (experiences.length > 0) {
      // Extract unique values for each category
      values.company = [...new Set(experiences.map(exp => exp.company).filter(Boolean))];
      values.designation = [...new Set(experiences.map(exp => exp.designation).filter(Boolean))];
      values.location = [...new Set(experiences.map(exp => exp.location).filter(Boolean))];
      values.mode = [...new Set(experiences.map(exp => exp.mode).filter(Boolean))];
      values.tech = [...new Set(experiences.flatMap(exp =>
        exp.techStack ? exp.techStack.split(',').map(tech => tech.trim()) : []
      ).filter(Boolean))];
      values.from = [...new Set(experiences.map(exp => exp.from).filter(Boolean))];
      values.upto = [...new Set(experiences.map(exp => exp.upto).filter(Boolean))];
    }

    return values;
  };


  // Filter experiences based on search criteria
  const filteredExperiences = useMemo(() => {
    const { filters = {}, excludeFilters = {} } = searchFilters;

    if (!filters || (Object.keys(filters).length === 0 && Object.keys(excludeFilters).length === 0)) {
      return experiences;
    }

    return experiences.filter((experience) => {
      const searchableText = [
        experience.company,
        experience.designation,
        experience.location,
        experience.mode,
        experience.techStack,
        experience.workDescriptions,
        experience.from,
        experience.upto
      ].join(' ').toLowerCase();

      // Apply include filters
      // Company filter
      if (filters.company && !experience.company.toLowerCase().includes(filters.company.toLowerCase())) {
        return false;
      }

      // Designation filter
      if (filters.designation && !experience.designation.toLowerCase().includes(filters.designation.toLowerCase())) {
        return false;
      }

      // Location filter
      if (filters.location && !experience.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Mode filter
      if (filters.mode && !experience.mode.toLowerCase().includes(filters.mode.toLowerCase())) {
        return false;
      }

      // Tech stack filter
      if (filters.tech && !experience.techStack.toLowerCase().includes(filters.tech.toLowerCase())) {
        return false;
      }

      // From year filter
      if (filters.from && !experience.from.includes(filters.from)) {
        return false;
      }

      // Until year filter
      if (filters.upto && !experience.upto.includes(filters.upto)) {
        return false;
      }

      // General text search (searches across all text fields)
      if (filters.general) {
        const searchTerm = filters.general.toLowerCase();
        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      // Apply exclude filters
      // Company exclude filter
      if (excludeFilters.company && experience.company.toLowerCase().includes(excludeFilters.company.toLowerCase())) {
        return false;
      }

      // Designation exclude filter
      if (excludeFilters.designation && experience.designation.toLowerCase().includes(excludeFilters.designation.toLowerCase())) {
        return false;
      }

      // Location exclude filter
      if (excludeFilters.location && experience.location.toLowerCase().includes(excludeFilters.location.toLowerCase())) {
        return false;
      }

      // Mode exclude filter
      if (excludeFilters.mode && experience.mode.toLowerCase().includes(excludeFilters.mode.toLowerCase())) {
        return false;
      }

      // Tech stack exclude filter
      if (excludeFilters.tech && experience.techStack.toLowerCase().includes(excludeFilters.tech.toLowerCase())) {
        return false;
      }

      // From year exclude filter
      if (excludeFilters.from && experience.from.includes(excludeFilters.from)) {
        return false;
      }

      // Until year exclude filter
      if (excludeFilters.upto && experience.upto.includes(excludeFilters.upto)) {
        return false;
      }

      // General text exclude (searches across all text fields)
      if (excludeFilters.general) {
        const excludeTerm = excludeFilters.general.toLowerCase();
        if (searchableText.includes(excludeTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [experiences, searchFilters]);

  // Serialize filters to URL format
  const serializeFiltersToURL = (searchData) => {
    const { filters = {}, excludeFilters = {} } = searchData;
    const params = new URLSearchParams();

    // Add include filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    // Add exclude filters with minus prefix
    Object.entries(excludeFilters).forEach(([key, value]) => {
      if (value) {
        params.set(`-${key}`, value);
      }
    });

    return params;
  };

  // Parse URL parameters to filters
  const parseURLToFilters = (searchParams) => {
    const filters = {};
    const excludeFilters = {};

    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('-')) {
        // Exclude filter
        const actualKey = key.substring(1);
        excludeFilters[actualKey] = value;
      } else {
        // Include filter
        filters[key] = value;
      }
    }

    return { filters, excludeFilters };
  };

  // Build search query from filters
  const buildSearchQueryFromFilters = (searchData) => {
    const { filters = {}, excludeFilters = {} } = searchData;
    const queryParts = [];

    // Add include filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === 'general') {
          queryParts.push(value);
        } else {
          queryParts.push(`${key}:${value}`);
        }
      }
    });

    // Add exclude filters
    Object.entries(excludeFilters).forEach(([key, value]) => {
      if (value) {
        if (key === 'general') {
          queryParts.push(`-${value}`);
        } else {
          queryParts.push(`-${key}:${value}`);
        }
      }
    });

    return queryParts.join(' ');
  };

  // Handle search
  const handleSearch = (searchData) => {
    setSearchFilters(searchData);

    // Update URL parameters
    const params = serializeFiltersToURL(searchData);
    setSearchParams(params);
  };

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
    // Parse URL parameters on component mount
    const urlFilters = parseURLToFilters(searchParams);
    if (Object.keys(urlFilters.filters).length > 0 || Object.keys(urlFilters.excludeFilters).length > 0) {
      setSearchFilters(urlFilters);
    }

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

  // Effect to sync search query with URL parameters
  useEffect(() => {
    const urlFilters = parseURLToFilters(searchParams);
    const currentQuery = buildSearchQueryFromFilters(urlFilters);

    // Update search input if URL has parameters
    if (currentQuery) {
      // You would need to expose setSearchQuery from AdvancedSearch component
      // For now, we just set the filters
      setSearchFilters(urlFilters);
    }
  }, [searchParams]);

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
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            A journey through my professional career, showcasing the roles, technologies, and achievements that have shaped my expertise.
          </p>

          {/* Search Component */}
          <AdvancedSearch
            onSearch={handleSearch}
            searchCategories={SEARCH_CATEGORIES.experience}
            categoryValues={getCategoryValues()}
            placeholder="Search experiences..."
            exampleQuery="mode:Remote -location:Mumbai Tally"
            initialQuery={buildSearchQueryFromFilters(searchFilters)}
          />

          {/* Results Count */}
          {!isLoading && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {filteredExperiences.length === experiences.length ? (
                `Showing all ${experiences.length} experience${experiences.length !== 1 ? 's' : ''}`
              ) : (
                `Found ${filteredExperiences.length} of ${experiences.length} experience${experiences.length !== 1 ? 's' : ''}`
              )}
            </div>
          )}
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
            filteredExperiences.map((experience, index) => (
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
