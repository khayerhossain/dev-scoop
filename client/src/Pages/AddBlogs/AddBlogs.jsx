import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-base-200 py-20 mt-5">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200 p-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-extrabold mb-10 text-center text-gray-900 tracking-tight"
          >
            Add a New Blog
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-full"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            {/* Group 1 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8"
            >
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
            </motion.div>

            {/* Group 2 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8"
            >
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
            </motion.div>

            {/* Short Description */}
            <motion.div variants={itemVariants}>
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
            </motion.div>

            {/* Long Description */}
            <motion.div variants={itemVariants}>
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
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <input
                type="submit"
                value="Submit Blog"
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold 
                hover:bg-indigo-700 transition shadow-md cursor-pointer"
              />
            </motion.div>
          </motion.form>
        </motion.div>
      </Container>
    </section>
  );
};

export default AddBlogs;
