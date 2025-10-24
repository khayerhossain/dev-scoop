import React from "react";
import { motion } from "framer-motion";
import Container from "../../components/container/container";

const relatedBlogs = [
  {
    id: 1,
    title: "Let’s Learn about Node.js with iLearn",
    category: "Node.js",
    image:
      "https://i.ibb.co/7dymC37n/Let-s-Learn-about-Node-JS-with-i-Learn-for.jpg",
  },
  {
    id: 2,
    title: "Build Your Career with Online Courses - Udemy",
    category: "Learning",
    image:
      "https://i.ibb.co/XxCPFWnn/Online-Kurslar-stedi-iniz-Her-eyi-Kendi-Program-n-za-G-re-renin-Udemy.jpg",
  },
  {
    id: 3,
    title: "React.js for Beginners: Props and State Explained",
    category: "React",
    image:
      "https://i.ibb.co/BVTX5t5n/React-js-for-Beginners-Props-and-State-Explained.jpg",
  },
  {
    id: 4,
    title: "What is Tailwind CSS & Why It's Trending?",
    category: "Tailwind CSS",
    image:
      "https://i.ibb.co/BHFBDy0Q/O-que-Tailwind-CSS-e-por-que-ele-virou-tend-ncia-no-front-end-Programadores-Depr-Programa-o-e-Tecnol.jpg",
  },
];

const ExtraSection = () => {
  return (
    <div className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white border-t border-gray-200">
      {/* Soft Background Pattern */}
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_center,_#000_1px,_transparent_1px)] bg-[length:20px_20px]"></div>

      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-gray-900 tracking-tight"
          >
            Recommended Reads for You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gray-700 mt-4 text-base leading-relaxed"
          >
            Curated picks from the dev world — stay inspired, stay evolving.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {relatedBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04, rotate: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-60 overflow-hidden">
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay when hovered */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>

              {/* Card Content */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-100 p-5 transition-all duration-500 group-hover:bg-white/95"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                  {blog.category}
                </span>
                <h3 className="text-base font-semibold text-gray-900 mt-1 leading-snug line-clamp-2 group-hover:text-black">
                  {blog.title}
                </h3>
              </motion.div>

              {/* Glow border animation */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-black/20 transition-all duration-500"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ExtraSection;
