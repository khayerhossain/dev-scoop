import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Clock, Sparkles } from "lucide-react";

const RecentBlogCards = ({ blog, addToWishlist }) => {
  const [showFull, setShowFull] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = () => {
    addToWishlist(blog);
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-white via-white to-gray-50 border border-gray-200/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col backdrop-blur-sm"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Gradient Overlay for Premium Look */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Image Section with Enhanced Effects */}
      <div className="relative overflow-hidden rounded-t-3xl h-56">
        <motion.img
          src={blog.imageURL}
          alt="Blog Banner"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />

        {/* Gradient Overlay on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

        {/* Floating Sparkle Icon */}
        <motion.div
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100"
          initial={{ scale: 0, rotate: -180 }}
          whileHover={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </motion.div>

        {/* Category Badge - Floating */}
        <motion.div
          className="absolute top-4 left-4 px-4 py-2 text-xs font-bold bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full shadow-xl backdrop-blur-md border border-white/20"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {blog.category}
        </motion.div>

        {/* Date Badge - Bottom Left */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
          <Clock className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-xs font-medium text-gray-700">{blog.date}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 relative z-10">
        {/* Title with Gradient Text Effect */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3 leading-tight group-hover:from-purple-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500">
          {blog.title}
        </h2>

        {/* Description with Smooth Expansion */}
        <motion.div
          initial={false}
          animate={{ height: showFull ? "auto" : "4.5rem" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden mb-6 flex-grow"
        >
          <p className="text-gray-600 text-sm leading-relaxed">
            {showFull ? blog.longDescription : blog.shortDescription}
          </p>
        </motion.div>

        {/* Action Buttons - Modern Design */}
        <div className="flex gap-2.5 mt-auto">
          {/* Read More Toggle */}
          <motion.button
            onClick={() => setShowFull(!showFull)}
            className="flex-1 h-11 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-800 font-semibold transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200/50"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {showFull ? "Show Less" : "Read More"}
          </motion.button>

          {/* Details Button with Icon */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1"
          >
            <Link
              to={`blogdetails/${blog._id}`}
              className="flex items-center justify-center gap-2 h-11 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-xl group/btn"
            >
              <span>Details</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </motion.div>

          {/* Wishlist Button with Heart Animation */}
          <motion.button
            onClick={handleWishlistClick}
            className={`flex-1 h-11 rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 ${
              isWishlisted
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                : "bg-white hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 text-pink-600 border border-pink-200"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-4 h-4 transition-all duration-300 ${
                  isWishlisted ? "fill-current" : ""
                }`}
              />
            </motion.div>
            <span>{isWishlisted ? "Saved" : "Save"}</span>
          </motion.button>
        </div>
      </div>

      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
    </motion.div>
  );
};

export default RecentBlogCards;
