import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const RecentBlogCards = ({ blog, addToWishlist }) => {
  const [showFull, setShowFull] = useState(false);

  const handleWishlistClick = () => {
    addToWishlist(blog);
  };

  return (
    <motion.div
      className="group bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <motion.img
          src={blog.imageURL}
          alt="Blog Banner"
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Category + Date */}
        <div className="flex justify-between items-center mb-2">
          <span className="px-3 py-1 text-xs font-medium bg-gray-900 text-white rounded-full shadow-sm">
            {blog.category}
          </span>
          <span className="text-xs text-gray-500">{blog.date}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-tight hover:text-gray-700 transition">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
          {showFull ? blog.longDescription : blog.shortDescription}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          {/* Read More */}
          <motion.button
            onClick={() => setShowFull(!showFull)}
            className={`flex-1 h-10 rounded-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium transition-all duration-300 focus:outline-none`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showFull ? "Hide" : "Read"}
          </motion.button>

          {/* Details */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Link
              to={`blogdetails/${blog._id}`}
              className="flex items-center justify-center h-10 rounded-full border border-gray-800 text-gray-900 bg-white hover:bg-gray-900 hover:text-white font-medium transition-all duration-300"
            >
              Details
            </Link>
          </motion.div>

          {/* Wishlist */}
          <motion.button
            onClick={handleWishlistClick}
            className="flex-1 h-10 rounded-full border border-pink-500 text-pink-600 bg-white hover:bg-pink-500 hover:text-white font-medium transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Wishlist
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentBlogCards;
