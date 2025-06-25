import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import bannerOne from "../../assets/Animations/banner-2.json";

const Banner = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center px-4 sm:px-6 md:px-12 py-10 border-b-4 border-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left text content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.span
              animate={{
                color: ["#EF4444", "#8B5CF6", "#22C55E", "#F59E0B", "#EF4444"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="inline-block"
            >
              DevScoop
            </motion.span>{" "}
            Your Daily Dose of Dev Wisdom
          </motion.h1>

          <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Dive into the latest development news, frameworks, and tools trusted
            by professionals worldwide.
          </p>

          <div>
            <button className="btn btn-primary px-6 py-2.5 text-base sm:text-lg rounded-lg hover:scale-105 transition duration-300">
              Discover Now
            </button>
          </div>
        </div>

        {/* Right animation */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-[260px] sm:w-[320px] md:w-[400px] lg:w-[460px] h-auto">
            <Lottie animationData={bannerOne} loop className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
