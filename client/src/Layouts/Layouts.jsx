import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";

const Layouts = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layouts;
