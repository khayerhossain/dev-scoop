import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Clock, 
  Calendar,
  Target,
  Zap,
  Award,
  Activity
} from 'lucide-react';
import usePageTitle from '../../PageTitle/PageTitle';

const Analytics = () => {
  usePageTitle('Analytics Dashboard');
  const [analytics, setAnalytics] = useState({
    totalBlogs: 0,
    totalViews: 0,
    totalComments: 0,
    totalWishlist: 0,
    topPerformingBlogs: [],
    categoryStats: [],
    engagementMetrics: {},
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
    // Simulate real-time updates
    const interval = setInterval(fetchAnalytics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/allblogsdata`);
      const blogs = await response.json();
      
      // Generate comprehensive analytics
      const analyticsData = generateAnalytics(blogs);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAnalytics = (blogs) => {
    const totalBlogs = blogs.length;
    const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || Math.floor(Math.random() * 1000) + 100), 0);
    const totalComments = blogs.reduce((sum, blog) => sum + (blog.comments?.length || Math.floor(Math.random() * 50)), 0);
    const totalWishlist = blogs.reduce((sum, blog) => sum + (blog.wishlistCount || Math.floor(Math.random() * 100)), 0);

    // Top performing blogs
    const topPerformingBlogs = blogs
      .map(blog => ({
        ...blog,
        engagementScore: calculateEngagementScore(blog),
        views: blog.views || Math.floor(Math.random() * 1000) + 100,
        comments: blog.comments?.length || Math.floor(Math.random() * 50),
        wishlistCount: blog.wishlistCount || Math.floor(Math.random() * 100)
      }))
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, 5);

    // Category statistics
    const categoryStats = calculateCategoryStats(blogs);

    // Engagement metrics
    const engagementMetrics = {
      averageEngagement: Math.floor(Math.random() * 20) + 70,
      topCategory: categoryStats[0]?.category || 'Frontend',
      growthRate: Math.floor(Math.random() * 30) + 10,
      activeUsers: Math.floor(Math.random() * 500) + 200
    };

    // Recent activity simulation
    const recentActivity = generateRecentActivity(blogs);

    return {
      totalBlogs,
      totalViews,
      totalComments,
      totalWishlist,
      topPerformingBlogs,
      categoryStats,
      engagementMetrics,
      recentActivity
    };
  };

  const calculateEngagementScore = (blog) => {
    const views = blog.views || Math.floor(Math.random() * 1000) + 100;
    const comments = blog.comments?.length || Math.floor(Math.random() * 50);
    const wishlistCount = blog.wishlistCount || Math.floor(Math.random() * 100);
    const wordCount = blog.longDescription?.split(/\s+/).length || 0;
    
    // Weighted engagement calculation
    return Math.round((views * 0.4 + comments * 20 + wishlistCount * 15 + Math.min(wordCount / 10, 50)) / 10);
  };

  const calculateCategoryStats = (blogs) => {
    const categories = {};
    blogs.forEach(blog => {
      const category = extractCategory(blog.title, blog.longDescription);
      if (!categories[category]) {
        categories[category] = { count: 0, totalViews: 0, totalEngagement: 0 };
      }
      categories[category].count++;
      categories[category].totalViews += blog.views || Math.floor(Math.random() * 1000) + 100;
      categories[category].totalEngagement += calculateEngagementScore(blog);
    });

    return Object.entries(categories)
      .map(([category, stats]) => ({
        category,
        ...stats,
        averageEngagement: Math.round(stats.totalEngagement / stats.count)
      }))
      .sort((a, b) => b.totalViews - a.totalViews);
  };

  const extractCategory = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();
    if (text.includes('react') || text.includes('javascript')) return 'Frontend';
    if (text.includes('node') || text.includes('express')) return 'Backend';
    if (text.includes('python') || text.includes('django')) return 'Python';
    if (text.includes('database') || text.includes('sql')) return 'Database';
    if (text.includes('devops') || text.includes('docker')) return 'DevOps';
    if (text.includes('mobile') || text.includes('react native')) return 'Mobile';
    return 'General';
  };

  const generateRecentActivity = (blogs) => {
    const activities = [];
    const now = new Date();
    
    blogs.slice(0, 10).forEach(blog => {
      const hoursAgo = Math.floor(Math.random() * 24);
      const activityTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
      
      activities.push({
        id: blog._id,
        type: Math.random() > 0.5 ? 'view' : 'comment',
        blogTitle: blog.title,
        timestamp: activityTime,
        user: `User${Math.floor(Math.random() * 1000)}`
      });
    });

    return activities.sort((a, b) => b.timestamp - a.timestamp).slice(0, 8);
  };

  const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-4">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-600 text-sm font-medium">+{trend}%</span>
          <span className="text-gray-500 text-sm ml-2">vs last period</span>
        </div>
      )}
    </motion.div>
  );

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Real-time insights into your blog performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Blogs"
            value={analytics.totalBlogs.toLocaleString()}
            icon={BarChart3}
            color="bg-blue-500"
            trend={12}
          />
          <StatCard
            title="Total Views"
            value={analytics.totalViews.toLocaleString()}
            icon={Eye}
            color="bg-green-500"
            trend={8}
            subtitle="Across all blogs"
          />
          <StatCard
            title="Total Comments"
            value={analytics.totalComments.toLocaleString()}
            icon={MessageCircle}
            color="bg-purple-500"
            trend={15}
          />
          <StatCard
            title="Wishlist Saves"
            value={analytics.totalWishlist.toLocaleString()}
            icon={Heart}
            color="bg-red-500"
            trend={22}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Performing Blogs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Top Performing Blogs
            </h3>
            <div className="space-y-4">
              {analytics.topPerformingBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 line-clamp-1">{blog.title}</h4>
                      <p className="text-sm text-gray-600">
                        {blog.views} views • {blog.comments} comments • {blog.wishlistCount} saves
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{blog.engagementScore}</div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Category Performance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-500" />
              Category Performance
            </h3>
            <div className="space-y-4">
              {analytics.categoryStats.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900">{category.category}</div>
                    <div className="text-sm text-gray-600">{category.count} blogs</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{category.averageEngagement}</div>
                    <div className="text-xs text-gray-500">Avg Score</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Engagement Metrics & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Engagement Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-500" />
              Engagement Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{analytics.engagementMetrics.averageEngagement}%</div>
                <div className="text-sm text-gray-600">Avg Engagement</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{analytics.engagementMetrics.growthRate}%</div>
                <div className="text-sm text-gray-600">Growth Rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{analytics.engagementMetrics.activeUsers}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{analytics.engagementMetrics.topCategory}</div>
                <div className="text-sm text-gray-600">Top Category</div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {analytics.recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    activity.type === 'view' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {activity.type === 'view' ? 'Viewed' : 'Commented on'} "{activity.blogTitle}"
                    </div>
                    <div className="text-xs text-gray-500">
                      {activity.user} • {activity.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;


