import React from "react";
import { useLocation } from "react-router";
import footerIcon from "../../assets/Images/nav-logo-2.png";
import { FaSquareFacebook } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { FaTwitterSquare } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import Container from "../../components/container/container";

const Footer = () => {
  const location = useLocation();
  const hideFooterPaths = ["/login", "/register"];
  if (hideFooterPaths.includes(location.pathname)) return null;

  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <Container>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img className="w-8 h-8 rounded" src={footerIcon} alt="" />
              <h1 className="text-xl font-bold text-white">DevScoop</h1>
            </div>
            <p className="text-sm">
              DevScoop is your go-to hub for web development tips, tricks, and
              tech trends. Built for devs, by devs.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-2">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  All Blogs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Write a Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-2">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="mt-5 ml-0 md:ml-8 lg:ml-24">
            <h3 className="text-white font-semibold mb-2">Connect With Us</h3>
            <div className="flex gap-4 text-xl">
              <a
                href="https://www.facebook.com/share/1GS4VLNGNv/?mibextid=wwXIfr"
                className="hover:text-white transition"
              >
                <FaSquareFacebook />
              </a>
              <a
                href="https://www.instagram.com/khayerhossain_45?igsh=NXNrOGY3dWwyYzlo&utm_source=qr"
                className="hover:text-white transition"
              >
                <FiInstagram />
              </a>
              <a
                href="https://www.instagram.com/khayerhossain_45?igsh=NXNrOGY3dWwyYzlo&utm_source=qr"
                className="hover:text-white transition"
              >
                <FaTwitterSquare />
              </a>
              <a href="#" className="hover:text-white transition">
                <BiWorld />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} DevScoop. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
