import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import usePageTitle from "../../PageTitle/PageTitle";
import Container from "../../components/container/container";

const AddBlogs = () => {
  usePageTitle("AddBlogs");

  const [step, setStep] = useState(1);

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

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
          setStep(1);
        }
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
      });
  };

  const pageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-20 mt-5">
      <Container>
        <div className="w-full bg-white text-black rounded-2xl shadow-2xl border border-gray-100 p-10">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-10 relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-[3px] bg-gray-200" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[3px] bg-black rounded-full"
            />
            <div className="relative z-10 flex justify-between w-full">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
                  step >= 1
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
                  step === 2
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900 tracking-tight">
            Add a New Blog
          </h2>

          <form onSubmit={handleSubmit} className="relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={pageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-10"
                >
                  {/* Title & Image */}
                  <div className="flex flex-wrap gap-8">
                    <div className="flex-1 min-w-[250px]">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Blog Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Enter your blog title"
                        required
                        className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white 
                        focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 shadow-sm"
                      />
                    </div>
                    <div className="flex-1 min-w-[250px]">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="imageURL"
                        placeholder="Paste image link"
                        required
                        className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white 
                        focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Category & Date */}
                  <div className="flex flex-wrap gap-8">
                    <div className="flex-1 min-w-[250px]">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        required
                        className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white 
                        focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 shadow-sm"
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
                        className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white 
                        focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 
                      transition-all shadow-md hover:shadow-lg"
                    >
                      Next →
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={pageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-10"
                >
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
                      className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white 
                      focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 shadow-sm resize-none"
                    ></textarea>
                  </div>

                  {/* Long Description */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Long Description
                    </label>
                    <textarea
                      name="longDescription"
                      placeholder="Write your full blog content..."
                      required
                      rows={6}
                      className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white 
                      focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 shadow-sm resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-gray-100 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 
                      transition-all shadow-sm hover:shadow-md"
                    >
                      ← Back
                    </button>
                    <input
                      type="submit"
                      value="Submit Blog"
                      className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 
                      transition-all shadow-md hover:shadow-lg cursor-pointer"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default AddBlogs;
