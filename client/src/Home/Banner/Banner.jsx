import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import bannerOne from "../../assets/Animations/banner-2.json";
import Container from "../../components/container/container";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="min-h-[80vh] bg-base-200 flex items-center py-20 border-b-4 border-white">
      <Container>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left text content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-primary">DevScoop</span> Your Daily Dose of Dev Wisdom
            </motion.h1>

            <motion.p
              className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 leading-relaxed max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Dive into the latest development news, frameworks, and tools
              trusted by professionals worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
             <Link to="/allblogs">
              <button className="btn btn-primary px-6 py-2.5 text-base sm:text-lg rounded-lg hover:scale-105 transition duration-300">
                Discover Now
              </button>
             </Link>
            </motion.div>
          </div>

          {/* Right animation */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-[260px] sm:w-[320px] md:w-[400px] lg:w-[460px] h-auto">
              <Lottie
                animationData={bannerOne}
                loop
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
