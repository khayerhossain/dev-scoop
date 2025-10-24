import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import bannerTwo from "../../assets/Animations/banner-1.json";
import bannerThree from "../../assets/Animations/banner-3.json";
import bannerFour from "../../assets/Animations/banner-4.json";
import Container from "../../components/container/container";
import { Link } from "react-router";

const slides = [
  {
    title: "Boost Your Code Game.",
    desc: "Level up your skills with daily insights and community-powered articles.",
    animation: bannerTwo,
    bgColor: "from-purple-900 to-purple-700",
  },
  {
    title: "Learn. Build. Share.",
    desc: "Join the dev conversation, post blogs, and grow your network.",
    animation: bannerThree,
    bgColor: "from-blue-900 to-blue-700",
  },
  {
    title: "Your Developer Hub.",
    desc: "DevScoop is your go-to spot for everything dev — updates, news, and stories.",
    animation: bannerFour,
    bgColor: "from-indigo-900 to-indigo-700",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[current];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-gray-200 mt-10">
      {/* Animated Background Gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className={`absolute inset-0 bg-gradient-to-br ${currentSlide.bgColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Dots Pattern Left */}
      <div className="absolute left-0 top-0 w-20 h-full opacity-20">
        <div className="grid grid-cols-3 gap-2 h-full p-4">
          {[...Array(60)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Curved Divider */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
        <svg
          className="absolute left-0 top-0 h-full w-full"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0 Q40 50 0 100 L200 100 L200 0 Z"
            fill="rgba(255, 255, 255, 0.97)"
            className="drop-shadow-2xl"
          />
        </svg>
      </div>

      <Container>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 relative z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Left Text Section */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left text-white">
              <motion.p
                className="uppercase text-red-500 tracking-wider font-medium flex items-center justify-center lg:justify-start gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Inspiration 2025
                <span className="w-10 h-[2px] bg-red-500"></span>
              </motion.p>

              <motion.h1
                className="text-5xl sm:text-6xl font-extrabold leading-tight uppercase"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {currentSlide.title}
              </motion.h1>

              <motion.p
                className="text-lg text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {currentSlide.desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/allblogs">
                  <button className="bg-black text-white px-8 py-3 text-lg font-bold hover:bg-gray-900 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 uppercase tracking-wide">
                    Discover Now
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right Animation Section */}
            <motion.div
              className="w-full lg:w-1/2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px]">
                <Lottie animationData={currentSlide.animation} loop />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-10 gap-3 relative z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-yellow-400 scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            ></button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Banner;
