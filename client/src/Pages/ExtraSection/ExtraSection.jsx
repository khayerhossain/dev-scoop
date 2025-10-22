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
    <div className="bg-white/50 backdrop-blur-xl py-16 border border-white/30 rounded-3xl shadow-lg">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Recommended Reads for You
          </h2>
          <p className="text-gray-700 mt-3 text-base leading-relaxed">
            Handpicked blog posts tailored to your dev journey.  
            Learn, grow, and stay ahead in the game.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white/40 border border-white/30 backdrop-blur-lg cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay Text (always in black, slides up when card hovered) */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute bottom-0 left-0 w-full p-5 bg-white/70 backdrop-blur-md border-t border-white/40"
              >
                <p className="text-sm uppercase tracking-wide text-black font-semibold mb-1">
                  {blog.category}
                </p>
                <h3 className="text-base font-semibold text-black leading-snug line-clamp-2">
                  {blog.title}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ExtraSection;
