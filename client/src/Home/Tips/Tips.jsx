import React from "react";
import { motion } from "framer-motion";
import {
  FaRegLightbulb,
  FaPenNib,
  FaSearch,
  FaImage,
  FaBrain,
  FaClock,
  FaBookOpen,
} from "react-icons/fa";
import Container from "../../components/container/container";

const tips = [
  {
    icon: <FaPenNib className="text-indigo-500 text-3xl" />,
    title: "Keep Titles Short",
    text: "Short and clear titles grab attention instantly and improve readability.",
  },
  {
    icon: <FaSearch className="text-indigo-500 text-3xl" />,
    title: "Use Keywords Wisely",
    text: "Smart keyword usage helps search engines understand your content better.",
  },
  {
    icon: <FaImage className="text-indigo-500 text-3xl" />,
    title: "Add Visuals or Code",
    text: "Use images or snippets to make your writing visually engaging and clearer.",
  },
  {
    icon: <FaBrain className="text-indigo-500 text-3xl" />,
    title: "Teach What You Learn",
    text: "Explaining concepts helps you master them and builds credibility with readers.",
  },
  {
    icon: <FaClock className="text-indigo-500 text-3xl" />,
    title: "Stay Consistent",
    text: "Consistency builds trust and keeps your audience engaged over time.",
  },
  {
    icon: <FaBookOpen className="text-indigo-500 text-3xl" />,
    title: "Keep It Simple",
    text: "Use simple, clear language to make your posts accessible to everyone.",
  },
];

const Tips = () => {
  return (
    <div className="bg-white/50 backdrop-blur-xl py-16 border border-white/30 rounded-3xl shadow-lg">
      <Container>
        <div className="mx-auto text-center mb-12">
          <div className="flex justify-center mb-2">
            <FaRegLightbulb className="text-indigo-500 text-4xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Blogging Tips
          </h2>
          <p className="text-gray-700 mt-3 text-base max-w-xl mx-auto">
            Sharpen your blogging skills with these quick, practical, and
            beginner-friendly insights.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer"
            >
              <div className="flex flex-col items-start gap-3">
                {tip.icon}
                <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-indigo-600">
                  {tip.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {tip.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Tips;
