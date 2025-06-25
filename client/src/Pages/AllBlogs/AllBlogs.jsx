import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AllBlogsCard from "../AllBlogsCard/AllBlogsCard";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";

const AllBlogs = () => {
const auth = getAuth();

  const allBlogs = useLoaderData();
  console.log("index 0 blogs", allBlogs[0]);
  const [searchText, setSearchText] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(allBlogs); // default: all

  const addToWishlist = async (blog) => {
    const token = await auth.currentUser.getIdToken();
    axios
      .post(`${import.meta.env.VITE_API_URL}/wishlist`, blog, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Added to Wishlist!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add to wishlist",
        });
      });
  };

  // ✅ Handle search function
  const handleSearch = () => {
    const matched = allBlogs.filter((blog) =>
      blog.title?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredBlogs(matched);
    setSearchText("");
  };

  return (
    <div className="mb-6">
      <div className="text-center mt-6 mb-6">
        <h2 className="text-3xl font-bold">Explore All Blogs</h2>
        <p className="mt-3 lg:mt-2">
          Dive into a collection of insightful blogs from the DevScoop
          community. Fresh content <br />
          real stories, and helpful resources-all in one place.
        </p>
      </div>

      {/* 🔍 Stylish Search Input + Button */}
      <div className="flex justify-center items-center mb-10 px-4">
        <div className="flex items-center w-full max-w-md bg-white border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-violet-400 overflow-hidden transition">
          <span className="pl-3 pr-1 text-gray-500 text-lg"></span>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search blog by title..."
            className="w-full px-3 py-3 text-sm text-gray-700 focus:outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          className="ml-3 px-5 py-2 h-[42px] bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition cursor-pointer"
        >
          Search
        </button>
      </div>

      {/*  Show blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <AllBlogsCard
              key={blog._id}
              allBlogs={blog}
              addToWishlist={addToWishlist}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-red-500">
            No blogs found by that name.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;

