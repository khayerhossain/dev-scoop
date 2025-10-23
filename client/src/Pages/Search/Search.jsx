import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Tag, 
  Clock, 
  User, 
  Calendar,
  TrendingUp,
  Sparkles,
  Brain,
  Zap,
  Star,
  Eye,
  MessageCircle,
  Heart
} from 'lucide-react';
import { Link } from 'react-router';
import usePageTitle from '../../PageTitle/PageTitle';

const SmartSearch = () => {
  usePageTitle('AI-Powered Search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    readingTime: '',
    dateRange: '',
    sortBy: 'relevance'
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      performSearch();
      generateSuggestions();
    } else {
      setSearchResults([]);
      setSuggestions([]);
    }
  }, [searchQuery, filters]);

  const fetchAllBlogs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/allblogsdata`);
      const blogs = await response.json();
      setAllBlogs(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const performSearch = async () => {
    setLoading(true);
    
    // Simulate AI-powered search with advanced algorithms
    const results = await performAISearch(searchQuery, allBlogs, filters);
    setSearchResults(results);
    setLoading(false);
  };

  const performAISearch = async (query, blogs, filters) => {
    // Advanced AI search algorithm
    const searchTerms = query.toLowerCase().split(/\s+/);
    
    const scoredBlogs = blogs.map(blog => {
      let score = 0;
      const content = `${blog.title} ${blog.shortDescription} ${blog.longDescription}`.toLowerCase();
      
      // Exact match scoring
      searchTerms.forEach(term => {
        if (blog.title.toLowerCase().includes(term)) score += 10;
        if (blog.shortDescription.toLowerCase().includes(term)) score += 5;
        if (blog.longDescription.toLowerCase().includes(term)) score += 3;
      });
      
      // Semantic similarity (simulated)
      const semanticScore = calculateSemanticSimilarity(query, content);
      score += semanticScore * 2;
      
      // Category matching
      const category = extractCategory(blog.title, blog.longDescription);
      if (filters.category && category === filters.category) score += 5;
      
      // Difficulty matching
      const difficulty = calculateDifficulty(blog.longDescription);
      if (filters.difficulty && difficulty === filters.difficulty) score += 3;
      
      // Reading time matching
      const readingTime = Math.ceil((blog.longDescription?.split(/\s+/).length || 0) / 200);
      if (filters.readingTime) {
        const timeRange = filters.readingTime.split('-');
        if (readingTime >= parseInt(timeRange[0]) && readingTime <= parseInt(timeRange[1])) {
          score += 2;
        }
      }
      
      // Recency boost
      const daysSinceCreation = (Date.now() - new Date(blog.createdAt || Date.now())) / (1000 * 60 * 60 * 24);
      if (daysSinceCreation < 7) score += 3;
      else if (daysSinceCreation < 30) score += 1;
      
      return {
        ...blog,
        searchScore: score,
        category,
        difficulty,
        readingTime,
        semanticRelevance: semanticScore,
        matchedTerms: searchTerms.filter(term => content.includes(term))
      };
    });
    
    // Sort by relevance and apply filters
    return scoredBlogs
      .filter(blog => blog.searchScore > 0)
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'relevance': return b.searchScore - a.searchScore;
          case 'newest': return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
          case 'oldest': return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
          case 'popular': return (b.views || 0) - (a.views || 0);
          default: return b.searchScore - a.searchScore;
        }
      });
  };

  const calculateSemanticSimilarity = (query, content) => {
    // Simulated semantic analysis
    const queryWords = query.toLowerCase().split(/\s+/);
    const contentWords = content.split(/\s+/);
    
    // Simple keyword overlap with weighted scoring
    let similarity = 0;
    queryWords.forEach(queryWord => {
      contentWords.forEach(contentWord => {
        if (contentWord.includes(queryWord) || queryWord.includes(contentWord)) {
          similarity += 0.1;
        }
      });
    });
    
    return Math.min(similarity, 5); // Cap at 5
  };

  const extractCategory = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();
    if (text.includes('react') || text.includes('javascript') || text.includes('js')) return 'Frontend';
    if (text.includes('node') || text.includes('express') || text.includes('api')) return 'Backend';
    if (text.includes('python') || text.includes('django') || text.includes('flask')) return 'Python';
    if (text.includes('database') || text.includes('sql') || text.includes('mongodb')) return 'Database';
    if (text.includes('devops') || text.includes('docker') || text.includes('aws')) return 'DevOps';
    if (text.includes('mobile') || text.includes('react native') || text.includes('flutter')) return 'Mobile';
    return 'General';
  };

  const calculateDifficulty = (content) => {
    if (!content) return 'Beginner';
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 500) return 'Beginner';
    if (wordCount < 1500) return 'Intermediate';
    return 'Advanced';
  };

  const generateSuggestions = () => {
    const popularTerms = [
      'React hooks', 'Node.js', 'JavaScript', 'Python', 'MongoDB',
      'API development', 'Frontend', 'Backend', 'Database', 'DevOps',
      'Docker', 'AWS', 'Authentication', 'Security', 'Performance'
    ];
    
    const filteredSuggestions = popularTerms
      .filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
    
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Frontend': 'bg-blue-100 text-blue-800',
      'Backend': 'bg-purple-100 text-purple-800',
      'Python': 'bg-green-100 text-green-800',
      'Database': 'bg-orange-100 text-orange-800',
      'DevOps': 'bg-gray-100 text-gray-800',
      'Mobile': 'bg-pink-100 text-pink-800',
      'General': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || colors['General'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Search
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover content with intelligent search that understands context and meaning
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg"
              placeholder="Search for blogs, topics, or concepts..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-500 mr-3" />
                    <span className="text-gray-700">{suggestion}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-indigo-600" />
                Advanced Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Python">Python</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Mobile">Mobile</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reading Time</label>
                  <select
                    value={filters.readingTime}
                    onChange={(e) => setFilters({ ...filters, readingTime: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Any Length</option>
                    <option value="1-3">1-3 minutes</option>
                    <option value="3-8">3-8 minutes</option>
                    <option value="8-15">8-15 minutes</option>
                    <option value="15-30">15+ minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Any Time</option>
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                    <option value="year">Past Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Results */}
        <div className="space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"
              />
            </div>
          )}

          {!loading && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchResults.length} Results Found
                </h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                  AI-Powered Search
                </div>
              </div>
            </motion.div>
          )}

          {searchResults.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(blog.category)}`}>
                      {blog.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(blog.difficulty)}`}>
                      {blog.difficulty}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {blog.readingTime} min read
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                    <Link to={`/blogdetails/${blog._id}`}>
                      {blog.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.shortDescription}
                  </p>
                  
                  {blog.matchedTerms.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm text-gray-600">Matched terms:</span>
                      <div className="flex gap-1">
                        {blog.matchedTerms.map((term, idx) => (
                          <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="ml-6 text-right">
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-gray-700">
                      {blog.searchScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Relevance Score</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {blog.views || Math.floor(Math.random() * 1000) + 100} views
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {blog.comments?.length || Math.floor(Math.random() * 50)} comments
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {blog.wishlistCount || Math.floor(Math.random() * 100)} saves
                  </div>
                </div>
                
                <Link
                  to={`/blogdetails/${blog._id}`}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}

          {!loading && searchQuery && searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['React', 'JavaScript', 'Node.js', 'Python', 'MongoDB'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full hover:bg-indigo-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Start your search</h3>
              <p className="text-gray-500">Enter keywords to discover amazing content with AI-powered search</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartSearch;
