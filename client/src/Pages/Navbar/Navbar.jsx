import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Providers/AuthContext";
import NavLogo from "../../assets/Images/nav-logo-2.png";
import toast from "react-hot-toast";
import Container from "../../components/container/container";

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

      {user && (
        <li>
          <NavLink
            to="/addblogs"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-gray-900 underline underline-offset-4"
                : "text-gray-700 hover:text-gray-900 transition"
            }
          >
            Add Blog
          </NavLink>
        </li>
      )}

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

      {user && (
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-gray-900 underline underline-offset-4"
                  : "text-gray-700 hover:text-gray-900 transition"
              }
            >
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-gray-900 underline underline-offset-4"
                  : "text-gray-700 hover:text-gray-900 transition"
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-100">
      <Container>
        <div className="navbar">
          {/* LEFT: Logo and Name */}
          <div className="flex items-center gap-2 navbar-start">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={NavLogo}
                alt="Logo"
                className="w-8 h-8 rounded-full border border-gray-100 shadow-sm"
              />
              <span className="text-lg lg:text-2xl font-bold text-gray-900 tracking-tight">
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
              {user && (
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user?.displayName || "User"}
                >
                  <div className="avatar cursor-pointer">
                    <div className="w-10 h-10 rounded-full ring ring-gray-300 ring-offset-2 overflow-hidden shadow-sm">
                      <img
                        src={
                          user?.photoURL
                            ? user.photoURL
                            : "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                        }
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                </div>
              )}

              {user ? (
                <button
                  onClick={handleSignOut}
                  className="btn bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 hover:scale-105 transition-transform rounded-md"
                >
                  Logout
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="btn border border-gray-400 text-gray-800 hover:bg-gray-100 hover:scale-105 transition rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn bg-gray-900 text-white rounded-md border-none hover:bg-gray-800 hover:scale-105 transition-transform"
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
