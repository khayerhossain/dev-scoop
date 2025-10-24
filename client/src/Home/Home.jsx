import React from "react";
import { motion } from "framer-motion";
import Banner from "./Banner/Banner";
import NewzLatter from "./NewzLatter/NewzLatter";
import RecentBlogs from "./RecentBlogs/RecentBlogs";
import Tips from "./Tips/Tips";
import usePageTitle from "../PageTitle/PageTitle";
import ExtraSection from "../Pages/ExtraSection/ExtraSection";
import CreateAccount from "../Pages/CreateAccount/CreateAccount";

const Home = () => {
  usePageTitle("Home");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      <Banner />
      <RecentBlogs />
      <ExtraSection />
      <Tips />
      <NewzLatter />
      {/* <CreateAccount /> */}
    </motion.div>
  );
};

export default Home;
