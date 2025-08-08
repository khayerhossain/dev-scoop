import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import usePageTitle from "../../PageTitle/PageTitle";
import Container from "../../components/container/container";

const AddBlogs = () => {
  usePageTitle("AddBlogs");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const blogData = Object.fromEntries(formData.entries());

    axios
      .post(`${import.meta.env.VITE_API_URL}/blogsdata`, blogData)
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Blog posted successfully!",
            text: "Your blog has been added to the platform.",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
      });
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white py-20 mt-5">
      <Container>
        <div
          className="w-full bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200 p-8
        animate-[fadeInUp_0.8s_ease-out]"
        >
          <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-900 tracking-tight">
            Add a New Blog
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            {/* Group 1: Title + Image URL */}
            <div className="flex flex-wrap gap-8">
              <div className="flex-1 min-w-[250px]">
                <label className="block text-gray-700 font-semibold mb-2">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter your blog title here"
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              <div className="flex-1 min-w-[250px]">
                <label className="block text-gray-700 font-semibold mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageURL"
                  placeholder="Paste image link here"
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            {/* Group 2: Category + Date */}
            <div className="flex flex-wrap gap-8">
              <div className="flex-1 min-w-[250px]">
                <label className="block text-gray-700 font-semibold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  <option value="">Select a Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Tips">Tips</option>
                  <option value="Inspiration">Inspiration</option>
                  <option value="News">News</option>
                </select>
              </div>
              <div className="flex-1 min-w-[250px]">
                <label className="block text-gray-700 font-semibold mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  name="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                placeholder="Write a short preview/summary..."
                required
                rows={3}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
              ></textarea>
            </div>

            {/* Long Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Long Description
              </label>
              <textarea
                name="longDescription"
                placeholder="Write the full blog content here..."
                required
                rows={6}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <input
                type="submit"
                value="Submit Blog"
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold 
              hover:bg-indigo-700 transition shadow-md cursor-pointer"
              />
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default AddBlogs;
