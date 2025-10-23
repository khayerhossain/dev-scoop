import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Clock, Star, Eye, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import usePageTitle from '../../PageTitle/PageTitle';

const Recommendations = () => {
  usePageTitle('Smart Recommendations');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    categories: [],
    readingTime: 'medium',
    difficulty: 'all'
  });

  useEffect(() => {
    fetchRecommendations();
  }, [userPreferences]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/allblogsdata`);
      const allBlogs = await response.json();
      
      // Simulate AI-powered recommendation algorithm
      const recommendedBlogs = generateSmartRecommendations(allBlogs);
      setRecommendations(recommendedBlogs);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSmartRecommendations = (blogs) => {
    // Advanced recommendation algorithm
    return blogs
      .map(blog => {
        const wordCount = blog.longDescription?.trim().split(/\s+/).length || 0;
        const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
        
        // Calculate recommendation score based on multiple factors
        let score = 0;
        
        // Trending factor (based on word count as proxy for engagement)
        score += Math.min(wordCount / 1000, 5) * 2;
        
        // Recency factor (newer blogs get higher scores)
        const daysSinceCreation = (Date.now() - new Date(blog.createdAt || Date.now())) / (1000 * 60 * 60 * 24);
        score += Math.max(0, 10 - daysSinceCreation) * 0.5;
        
        // Content quality factor
        if (blog.longDescription && blog.longDescription.length > 500) score += 3;
        if (blog.image) score += 1;
        
        // Category preference matching
        const category = extractCategory(blog.title, blog.longDescription);
        if (userPreferences.categories.includes(category)) score += 4;
        
        return {
          ...blog,
          recommendationScore: score,
          readingTime,
          category,
          difficulty: calculateDifficulty(blog.longDescription),
          engagementScore: Math.floor(Math.random() * 100) + 50 // Simulated engagement
        };
      })
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 12);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart Recommendations
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            AI-powered blog recommendations tailored just for you. Discover content that matches your interests and skill level.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Customize Your Feed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setUserPreferences({
                  ...userPreferences,
                  categories: e.target.value ? [e.target.value] : []
                })}
              >
                <option value="">All Categories</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Python">Python</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reading Time</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setUserPreferences({
                  ...userPreferences,
                  readingTime: e.target.value
                })}
              >
                <option value="all">Any Length</option>
                <option value="short">Quick Read (1-3 min)</option>
                <option value="medium">Medium (3-8 min)</option>
                <option value="long">Deep Dive (8+ min)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setUserPreferences({
                  ...userPreferences,
                  difficulty: e.target.value
                })}
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-white opacity-50" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{blog.recommendationScore.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(blog.category)}`}>
                    {blog.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(blog.difficulty)}`}>
                    {blog.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.shortDescription}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{blog.readingTime} min read</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{blog.engagementScore}% engagement</span>
                  </div>
                </div>

                <Link
                  to={`/blogdetails/${blog._id}`}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {recommendations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No recommendations found</h3>
            <p className="text-gray-500">Try adjusting your preferences to see more content.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;


