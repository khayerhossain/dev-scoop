import React, { useState } from "react";
import { Link } from "react-router"; 

const AllBlogsCard = ({ allBlogs: blog, addToWishlist }) => {
  const [showFull, setShowFull] = useState(false);

  const handleWishlistClick = () => {
    addToWishlist(blog);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 mt-8">
      <img
        className="w-full h-52 object-cover"
        src={blog.imageURL}
        alt={blog.title}
      />
      <div className="p-6">
        {/* Category & Date */}
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full font-medium">
            {blog.category}
          </span>
          <span className="text-gray-400">{blog.date}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {showFull ? blog.longDescription : blog.shortDescription}
        </p>

        {/* Buttons: Same Size, Different Colors */}
        <div className="flex flex-wrap gap-3">
          {/* Read More */}
          <button
            onClick={() => setShowFull(!showFull)}
            className="flex-1 h-10 rounded-lg font-medium border border-violet-600 text-violet-600 bg-white hover:bg-violet-100 transition cursor-pointer"
          >
            {showFull ? "Hide" : "Read"}
          </button>

          {/* Wishlist */}
          <button
            onClick={handleWishlistClick}
            className="flex-1 h-10 rounded-lg font-medium border border-rose-500 text-rose-500 bg-white hover:bg-rose-100 transition cursor-pointer"
          >
            Wishlist
          </button>

          {/* Details */}
          <Link
            to={`/blogdetails/${blog._id}`}
            className="flex-1 h-10 flex items-center justify-center rounded-lg font-medium border border-emerald-500 text-emerald-500 bg-white hover:bg-emerald-100 transition"
          >
            Details
          </Link>

          {/* Edit */}
          <Link
            to={`/updateblog/${blog._id}`}
            className="flex-1 h-10 flex items-center justify-center rounded-lg font-medium border border-yellow-500 text-yellow-500 bg-white hover:bg-yellow-100 transition"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllBlogsCard;
