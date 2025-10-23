import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Providers/AuthContext";
import toast from "react-hot-toast";
import Container from "../../components/container/container";
import { Code2, LayoutDashboard, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login");
      })
      .catch((error) => console.error("Sign out error:", error));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-gray-900 underline underline-offset-4"
              : "text-gray-700 hover:text-gray-900 transition"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allblogs"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-gray-900 underline underline-offset-4"
              : "text-gray-700 hover:text-gray-900 transition"
          }
        >
          All Blogs
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/featuredblogs"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-gray-900 underline underline-offset-4"
              : "text-gray-700 hover:text-gray-900 transition"
          }
        >
          Featured
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/recommendations"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-gray-900 underline underline-offset-4"
              : "text-gray-700 hover:text-gray-900 transition"
          }
        >
          AI Recommendations
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-gray-900 underline underline-offset-4"
              : "text-gray-700 hover:text-gray-900 transition"
          }
        >
          Smart Search
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-gray-900 underline underline-offset-4"
                : "text-gray-700 hover:text-gray-900 transition"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 ">
      <Container>
        <div className="navbar">
          {/* LEFT: Logo and Name */}
          <div className="flex items-center gap-2 navbar-start">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-black p-2 rounded-lg">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                DevScoop
              </span>
            </Link>
          </div>

          {/* CENTER: Links for large screens */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-6 text-base font-medium">
              {links}
            </ul>
          </div>

          {/* RIGHT: Auth + Hamburger (small screen) */}
          <div className="navbar-end">
            {/* Large screen buttons */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="avatar cursor-pointer">
                    <div className="w-10 h-10 rounded-full ring ring-gray-300 ring-offset-2 overflow-hidden shadow-sm">
                      <Link to="/dashboard/profile">
                        <img
                          src={
                            user?.photoURL
                              ? user.photoURL
                              : "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                          }
                          alt="User Avatar"
                        />
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Small screen dropdown */}
            <div className="dropdown dropdown-end lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-lg backdrop-blur-xl bg-white/90 rounded-2xl w-52 space-y-2"
              >
                {links}
                <hr className="my-2" />
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="btn bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 w-full"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      className="btn border border-gray-400 text-gray-800 hover:bg-gray-100 w-full"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn bg-gray-900 text-white border-none hover:bg-gray-800 w-full"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
