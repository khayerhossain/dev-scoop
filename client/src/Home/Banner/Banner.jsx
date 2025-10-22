import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import bannerOne from "../../assets/Animations/banner-2.json";
import bannerTwo from "../../assets/Animations/banner-1.json";
import bannerThree from "../../assets/Animations/banner-3.json";
import bannerFour from "../../assets/Animations/banner-4.json";
import Container from "../../components/container/container";
import { Link } from "react-router";

const slides = [
  {
    title: "Stay Ahead with Dev Trends.",
    desc: "Discover the latest frameworks and tools trusted by developers around the world.",
    animation: bannerOne,
  },
  {
    title: "Boost Your Code Game.",
    desc: "Level up your skills with daily insights and community-powered articles.",
    animation: bannerTwo,
  },
  {
    title: "Learn. Build. Share.",
    desc: "Join the dev conversation, post blogs, and grow your network.",
    animation: bannerThree,
  },
  {
    title: "Your Developer Hub.",
    desc: "DevScoop is your go-to spot for everything dev — updates, news, and stories.",
    animation: bannerFour,
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
    <div className="bg-white text-black min-h-[100vh] flex items-center justify-center border-b border-gray-200 mt-5">
      <Container>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Left Text Section */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <motion.p
                className="uppercase text-gray-500 tracking-wider font-medium flex items-center justify-center lg:justify-start gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Inspiration 2025
                <span className="w-10 h-[2px] bg-gray-400"></span>
              </motion.p>

              <motion.h1
                className="text-5xl sm:text-6xl font-extrabold leading-tight text-gray-900"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {currentSlide.title}
              </motion.h1>

              <motion.p
                className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
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
                  <button className="bg-black text-white px-8 py-3 text-lg rounded-none hover:bg-gray-900 transition-all duration-300">
                    Discover Now
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right Animation Section */}
            <motion.div
              className="w-full lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] h-auto">
                <Lottie animationData={currentSlide.animation} loop />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-10 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-black scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Banner;
