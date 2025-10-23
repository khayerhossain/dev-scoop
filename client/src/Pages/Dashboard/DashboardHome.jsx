import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  Plus,
  BookOpen,
  Heart,
  TrendingUp,
  Eye,
  MessageCircle,
  Users,
  Calendar,
  BarChart3,
  Brain,
  Search,
  Star,
  BookmarkCheck,
} from "lucide-react";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalViews: 0,
    totalComments: 0,
    totalWishlist: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/allblogsdata`
      );
      const blogs = await response.json();

      // Calculate stats (simulated for demo)
      setStats({
        totalBlogs: blogs.length,
        totalViews: blogs.reduce(
          (sum, blog) => sum + (Math.floor(Math.random() * 1000) + 100),
          0
        ),
        totalComments: blogs.reduce(
          (sum, blog) => sum + Math.floor(Math.random() * 50),
          0
        ),
        totalWishlist: blogs.reduce(
          (sum, blog) => sum + Math.floor(Math.random() * 100),
          0
        ),
      });

      // Get recent blogs (last 5)
      setRecentBlogs(blogs.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    change,
    changeType,
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {value.toLocaleString()}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  changeType === "increase" ? "text-green-600" : "text-red-600"
                }`}
              >
                {changeType === "increase" ? "+" : "-"}
                {change}%
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, href, color }) => (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        to={href}
        className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
      >
        <div className="flex items-center space-x-4">
          <div
            className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-200`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome to Your Dashboard
            </h1>
            <p className="text-blue-100 text-lg">
              Manage your blogs, track performance, and grow your audience
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Blogs"
          value={stats.totalBlogs}
          icon={BookOpen}
          color="bg-blue-500"
          change={12}
          changeType="increase"
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews}
          icon={Eye}
          color="bg-green-500"
          change={8}
          changeType="increase"
        />
        <StatCard
          title="Comments"
          value={stats.totalComments}
          icon={MessageCircle}
          color="bg-purple-500"
          change={15}
          changeType="increase"
        />
        <StatCard
          title="Wishlist Saves"
          value={stats.totalWishlist}
          icon={Heart}
          color="bg-red-500"
          change={22}
          changeType="increase"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickActionCard
            title="Write New Blog"
            description="Create and publish a new blog post"
            icon={Plus}
            href="/dashboard/add-blog"
            color="bg-blue-500"
          />
          <QuickActionCard
            title="View Analytics"
            description="Check your blog performance metrics"
            icon={BarChart3}
            href="/dashboard/analytics"
            color="bg-green-500"
          />
          <QuickActionCard
            title="Manage Blogs"
            description="View and edit your blog posts"
            icon={BookOpen}
            href="/dashboard/my-blogs"
            color="bg-purple-500"
          />
          <QuickActionCard
            title="Wishlist"
            description="View and edit your blog posts"
            icon={BookmarkCheck}
            href="/dashboard/wishlist"
            color="bg-red-500"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Blogs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Blogs</h3>
            <Link
              to="/dashboard/my-blogs"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {new Date(
                      blog.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Eye className="w-3 h-3" />
                  <span>{Math.floor(Math.random() * 1000) + 100}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Performance Overview
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Engagement Rate
                </span>
              </div>
              <span className="text-lg font-bold text-green-600">+12.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  New Followers
                </span>
              </div>
              <span className="text-lg font-bold text-blue-600">+8</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Top Performing Blog
                </span>
              </div>
              <span className="text-sm text-gray-600">React Hooks Guide</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Last Published
                </span>
              </div>
              <span className="text-sm text-gray-600">2 days ago</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
