import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router";
import { motion } from "framer-motion";
import { Bell, Settings } from "lucide-react";
import { AuthContext } from "../Providers/AuthContext";
import Container from "../components/container/container";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const mainNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Blogs", href: "/dashboard/my-blogs" },
    { name: "Add Blog", href: "/dashboard/add-blog" },
    { name: "Profile", href: "/dashboard/profile" },
    { name: "Wishlist", href: "/dashboard/wishlist" },
    { name: "Analytics", href: "/dashboard/analytics" },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <Container>
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {mainNavigation.find((item) => isActive(item.href))?.name ||
                  "Dashboard"}
              </h2>
              <p className="text-sm text-gray-500">
                Welcome back, {user?.displayName || "User"}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content (full width) */}
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </Container>
    </div>
  );
};

export default DashboardLayout;
