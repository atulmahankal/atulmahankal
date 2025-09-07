import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiChevronDown, FiX, FiInfo } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedSearch = ({
  onSearch,
  searchCategories = [],
  categoryValues = {},
  placeholder = "Search...",
  exampleQuery = "category:value search term",
  initialQuery = "",
  className = ""
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [showCategories, setShowCategories] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isExcludeMode, setIsExcludeMode] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Detect if user is typing a category with colon
  const getCurrentCategory = () => {
    const beforeCursor = searchQuery.substring(0, cursorPosition);
    const words = beforeCursor.split(' ');
    const currentWord = words[words.length - 1];

    if (currentWord.includes(':')) {
      const [category] = currentWord.split(':');
      // Remove minus prefix if it exists
      const cleanCategory = category.startsWith('-') ? category.substring(1) : category;
      return cleanCategory.toLowerCase();
    }
    return null;
  };

  // Get available values for current category
  const getCurrentCategoryValues = () => {
    const currentCategory = getCurrentCategory();
    if (currentCategory && categoryValues[currentCategory]) {
      return categoryValues[currentCategory];
    }
    return [];
  };

  // Check if we should show values dropdown
  const shouldShowValues = () => {
    const currentCategory = getCurrentCategory();
    return currentCategory && categoryValues[currentCategory] && categoryValues[currentCategory].length > 0;
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    const prefix = isExcludeMode ? `-${category.key}:` : `${category.key}:`;
    const newQuery = searchQuery + prefix;
    setSearchQuery(newQuery);
    setShowCategories(true); // Keep open to show values
    setIsExcludeMode(false); // Reset exclude mode after category selection

    // Focus input and position cursor after the prefix
    setTimeout(() => {
      inputRef.current?.focus();
      const newPosition = newQuery.length;
      inputRef.current?.setSelectionRange(newPosition, newPosition);
      setCursorPosition(newPosition);
    }, 0);
  };

  // Handle value selection
  const handleValueSelect = (value) => {
    const beforeCursor = searchQuery.substring(0, cursorPosition);
    const afterCursor = searchQuery.substring(cursorPosition);
    const words = beforeCursor.split(' ');
    const currentWord = words[words.length - 1];

    if (currentWord.includes(':')) {
      const [category] = currentWord.split(':');
      const newWord = `${category}:${value}`;
      words[words.length - 1] = newWord;
      const newQuery = words.join(' ') + afterCursor;
      setSearchQuery(newQuery);
      setShowCategories(false);

      // Trigger search
      handleSearch(newQuery);

      // Focus input
      setTimeout(() => {
        inputRef.current?.focus();
        const newPosition = words.join(' ').length;
        inputRef.current?.setSelectionRange(newPosition + 1, newPosition + 1);
      }, 0);
    }
  };

  // Handle search input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart;
    setSearchQuery(value);
    setCursorPosition(cursorPos);

    // Check if we should show dropdown
    const beforeCursor = value.substring(0, cursorPos);
    const words = beforeCursor.split(' ');
    const currentWord = words[words.length - 1];

    if (currentWord.endsWith(':')) {
      setShowCategories(true);
    }

    // Trigger search on every change
    handleSearch(value);
  };

  // Handle search execution
  const handleSearch = (query = searchQuery) => {
    const { filters, excludeFilters } = parseSearchQuery(query);
    onSearch({ filters, excludeFilters });
  };

  // Parse search query into filters
  const parseSearchQuery = (query) => {
    // Initialize filters with all possible category keys
    const filters = {};
    const excludeFilters = {};
    searchCategories.forEach(category => {
      filters[category.key] = '';
      excludeFilters[category.key] = '';
    });
    filters.general = '';
    excludeFilters.general = '';

    // Split by spaces but preserve quoted strings
    const tokens = query.match(/[^\s"]+|"([^"]*)"/g) || [];
    const generalTerms = [];
    const excludeGeneralTerms = [];

    tokens.forEach(token => {
      const cleanToken = token.replace(/"/g, '');

      // Check if this is an exclude filter (starts with minus)
      const isExclude = cleanToken.startsWith('-');
      const searchToken = isExclude ? cleanToken.substring(1) : cleanToken;

      // Check if token contains a category filter
      const colonIndex = searchToken.indexOf(':');
      if (colonIndex > 0) {
        const category = searchToken.substring(0, colonIndex).toLowerCase();
        const value = searchToken.substring(colonIndex + 1);

        // Check if this category exists in our search categories
        const categoryExists = searchCategories.some(cat =>
          cat.key.toLowerCase() === category ||
          cat.aliases?.some(alias => alias.toLowerCase() === category)
        );

        if (categoryExists) {
          if (isExclude) {
            excludeFilters[category] = value;
          } else {
            filters[category] = value;
          }
        } else {
          // If category doesn't exist, treat as general search
          if (isExclude) {
            excludeGeneralTerms.push(searchToken);
          } else {
            generalTerms.push(cleanToken);
          }
        }
      } else {
        // General search term
        if (isExclude) {
          excludeGeneralTerms.push(searchToken);
        } else {
          generalTerms.push(cleanToken);
        }
      }
    });

    filters.general = generalTerms.join(' ');
    excludeFilters.general = excludeGeneralTerms.join(' ');

    return { filters, excludeFilters };
  };

  // Handle key events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowCategories(false);
    } else if (e.key === 'Escape') {
      setShowCategories(false);
    } else if (e.key === ' ' && searchQuery.endsWith(':')) {
      // Show categories when typing after a colon
      setShowCategories(true);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    handleSearch('');
    inputRef.current?.focus();
  };

  // Update search query when initialQuery changes
  useEffect(() => {
    if (initialQuery !== undefined && initialQuery !== searchQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get active filters for display
  const getActiveFilters = () => {
    const { filters, excludeFilters } = parseSearchQuery(searchQuery);
    const activeFilters = [];

    if (filters.general) {
      activeFilters.push({ type: 'general', value: filters.general, isExclude: false });
    }

    if (excludeFilters.general) {
      activeFilters.push({ type: 'general', value: excludeFilters.general, isExclude: true });
    }

    searchCategories.forEach(category => {
      if (filters[category.key]) {
        activeFilters.push({
          type: 'category',
          key: category.key,
          value: filters[category.key],
          label: category.label,
          isExclude: false
        });
      }
      if (excludeFilters[category.key]) {
        activeFilters.push({
          type: 'category',
          key: category.key,
          value: excludeFilters[category.key],
          label: category.label,
          isExclude: true
        });
      }
    });

    return activeFilters;
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`} ref={dropdownRef}>
      <div className="relative">
        {/* Search Input */}
        <div className="relative flex items-center">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-10 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />

          {/* Action Buttons */}
          <div className="absolute right-2 flex items-center gap-1">
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Clear search"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
            {searchCategories.length > 0 && (
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Show search categories"
              >
                <FiChevronDown className={`w-4 h-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
              </button>
            )}
            {/* Example tooltip */}
            {exampleQuery && (
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Show example"
                >
                  <FiInfo className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full right-0 mt-2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap z-50"
                    >
                      {exampleQuery}
                      <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900 dark:border-b-gray-700"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Search Categories/Values Dropdown */}
        <AnimatePresence>
          {showCategories && searchCategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
            >
              <div className="p-2">
                {shouldShowValues() ? (
                  <>
                    <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 mb-1">
                      Available values for {getCurrentCategory()}:
                    </div>
                    {getCurrentCategoryValues().map((value, index) => (
                      <button
                        key={index}
                        onClick={() => handleValueSelect(value)}
                        className="w-full text-left px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          {value}
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 mb-1">
                      {isExcludeMode ? 'Select category to exclude:' : 'Search Categories'}
                    </div>
                    {!isExcludeMode && (
                      <button
                        onClick={() => {
                          setIsExcludeMode(true);
                        }}
                        className="w-full text-left px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors mb-1 border-b border-gray-200 dark:border-gray-600"
                      >
                        <div className="font-medium text-red-600 dark:text-red-400">
                          Exclude
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Add '-' (minus) to exclude results
                        </div>
                      </button>
                    )}
                    {searchCategories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => handleCategorySelect(category)}
                        className="w-full text-left px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          {isExcludeMode ? '-' : ''}{category.key}:
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {category.description}
                        </div>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Filters Display */}
      {searchQuery && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex flex-wrap gap-2">
            {getActiveFilters().map((filter, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded ${
                  filter.isExclude
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    : filter.type === 'general'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                }`}
              >
                {filter.isExclude ? '-' : ''}{filter.type === 'general' ? (
                  `Text: "${filter.value}"`
                ) : (
                  `${filter.label || filter.key}: ${filter.value}`
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
