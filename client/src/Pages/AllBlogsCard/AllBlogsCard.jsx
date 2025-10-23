import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Heart, BookOpen, Edit, Info } from "lucide-react";

const AllBlogsCard = ({ allBlogs: blog, addToWishlist }) => {
  const [showFull, setShowFull] = useState(false);

  const handleWishlistClick = () => addToWishlist(blog);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="max-w-md mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="w-full h-52 object-cover"
          src={blog.imageURL}
          alt={blog.title}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category & Date */}
        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-medium shadow-sm">
            {blog.category}
          </span>
          <span className="text-gray-400">{blog.date}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-tight line-clamp-2">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {showFull
            ? blog.longDescription
            : blog.shortDescription.length > 120
            ? blog.shortDescription.slice(0, 120) + "..."
            : blog.shortDescription}
        </p>

        {/* Buttons */}
        <div className="mt-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Read More */}
          <button
            onClick={() => setShowFull(!showFull)}
            className="flex items-center justify-center gap-2 h-10 text-sm font-medium border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-50 transition"
          >
            <BookOpen size={16} />
            {showFull ? "Hide" : "Read"}
          </button>

          {/* Wishlist */}
          <button
            onClick={handleWishlistClick}
            className="flex items-center justify-center gap-2 h-10 text-sm font-medium border border-rose-500 text-rose-500 rounded-lg hover:bg-rose-50 transition"
          >
            <Heart size={16} />
            Save
          </button>

          {/* Details */}
          <Link
            to={`/blogdetails/${blog._id}`}
            className="flex items-center justify-center gap-2 h-10 text-sm font-medium border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 transition"
          >
            <Info size={16} />
            View
          </Link>

          {/* Edit */}
          <Link
            to={`/updateblog/${blog._id}`}
            className="flex items-center justify-center gap-2 h-10 text-sm font-medium border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50 transition"
          >
            <Edit size={16} />
            Edit
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AllBlogsCard;
