import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const RecentBlogCards = ({ blog, addToWishlist }) => {
  const [showFull, setShowFull] = useState(false);

  const handleWishlistClick = () => {
    addToWishlist(blog);
  };

  const buttonBaseClass =
    "flex-1 h-10 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-sm focus:outline-none cursor-pointer";

  return (
    <motion.div
      className="max-w-md mx-auto bg-gradient-to-br from-white/90 to-gray-100 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 mt-8 flex flex-col h-[420px]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Image */}
      <img
        className="w-full h-44 object-cover rounded-t-xl"
        src={blog.imageURL}
        alt="Blog Banner"
      />

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
            {blog.category}
          </span>
          <span>{blog.date}</span>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
          {blog.title}
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
          {showFull ? blog.longDescription : blog.shortDescription}
        </p>

        {/* Buttons always at bottom */}
        <div className="flex justify-between gap-3 text-sm mt-auto">
          {/* Read More */}
          <motion.button
            onClick={() => setShowFull(!showFull)}
            className={`${buttonBaseClass} ${
              showFull
                ? "bg-blue-500 text-white border border-blue-500 hover:bg-blue-600"
                : "text-blue-600 bg-white/70 border border-blue-500 hover:bg-blue-500 hover:text-white"
            } focus:ring-2 focus:ring-blue-400`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {showFull ? "Hide" : "Read"}
          </motion.button>

          {/* Details */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1"
          >
            <Link
              to={`blogdetails/${blog._id}`}
              className={`${buttonBaseClass} border border-emerald-500 text-emerald-600 bg-white/70 hover:bg-emerald-500 hover:text-white focus:ring-2 focus:ring-emerald-400 flex items-center justify-center`}
            >
              Details
            </Link>
          </motion.div>

          {/* Wishlist */}
          <motion.button
            onClick={handleWishlistClick}
            className={`${buttonBaseClass} border border-rose-500 text-rose-500 bg-white/70 hover:bg-rose-500 hover:text-white focus:ring-2 focus:ring-rose-400`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Wishlist
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentBlogCards;
