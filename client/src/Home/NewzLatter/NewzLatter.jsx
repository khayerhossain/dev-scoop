import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const NewzLatter = () => {
  const handlesubscribe = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    axios
      .post(`${import.meta.env.VITE_API_URL}/subscribers`, { email })
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Subscribed successfully!",
            text: "You’ll receive the latest dev updates soon.",
            showConfirmButton: false,
            timer: 1800,
          });
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error subscribing:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Subscription Failed",
          text: "Please try again later.",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="border-t border-white/30 bg-white/40 backdrop-blur-2xl py-20 px-4 md:px-10">
      <motion.div
        className="max-w-3xl mx-auto text-center bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <motion.div
            whileHover={{ rotate: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaPaperPlane className="text-indigo-500 text-4xl" />
          </motion.div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Stay in the Loop with DevScoop
        </h2>
        <p className="text-gray-700 mb-8 max-w-lg mx-auto leading-relaxed">
          Weekly dev insights, coding tips, project ideas & community updates —
          delivered right to your inbox. No spam. Just good stuff.
        </p>

        {/* Form */}
        <form
          onSubmit={handlesubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2"
          >
            <FaPaperPlane className="text-white" /> Subscribe
          </motion.button>
        </form>

        <p className="text-sm text-gray-500 mt-5">
          No spam. You can unsubscribe anytime.
        </p>
      </motion.div>
    </div>
  );
};

export default NewzLatter;
