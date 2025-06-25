import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import usePageTitle from "../../PageTitle/PageTitle";

const UpdateBlog = () => {
  usePageTitle("Update Blog");

  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/blog/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedBlog = {
      title: form.title.value,
      imageURL: form.imageURL.value,
      category: form.category.value,
      shortDescription: form.shortDescription.value,
      longDescription: form.longDescription.value,
    };

    const auth = getAuth();
    const user = auth.currentUser;
    const token = await user.getIdToken();

    fetch(`${import.meta.env.VITE_API_URL}/blogsdata/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedBlog),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Blog updated successfully", "success");
          navigate("/allblogs");
        } else {
          Swal.fire("Info", "No changes made", "info");
        }
      });
  };

  if (!blog) return <p className="text-center mt-10 text-lg">Loading blog details...</p>;

  return (
    <section className="max-w-4xl mx-auto mt-12 p-10 bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-900 tracking-tight">Update Blog</h2>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Blog Title */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Blog Title</label>
          <input
            type="text"
            name="title"
            defaultValue={blog.title}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
          <input
            type="text"
            name="imageURL"
            defaultValue={blog.imageURL}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Category */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            name="category"
            defaultValue={blog.category}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">Select a Category</option>
            <option value="Technology">Technology</option>
            <option value="Tips">Tips</option>
            <option value="Inspiration">Inspiration</option>
            <option value="News">News</option>
          </select>
        </div>

        {/* Short Description */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Short Description</label>
          <textarea
            name="shortDescription"
            defaultValue={blog.shortDescription}
            required
            rows={3}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
          ></textarea>
        </div>

        {/* Long Description */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Long Description</label>
          <textarea
            name="longDescription"
            defaultValue={blog.longDescription}
            required
            rows={6}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <input
            type="submit"
            value="Update Blog"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md cursor-pointer"
          />
        </div>
      </form>
    </section>
  );
};

export default UpdateBlog;
