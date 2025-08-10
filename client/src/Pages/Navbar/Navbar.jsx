import React, { useContext } from "react";
import { Link, NavLink, useNavigate,} from "react-router";
import { AuthContext } from "../../Providers/AuthContext";
import NavLogo from "../../assets/Images/nav-logo-2.png";
import toast from "react-hot-toast";
import Container from "../../components/container/container";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // const location = useLocation();



  // // hide navbar in login/register page
  // const hideNavbarPaths = ["/login", "/register"];
  // if (hideNavbarPaths.includes(location.pathname)) return null;

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logout successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-indigo-600 underline"
              : "hover:text-indigo-500"
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
                ? "font-semibold text-indigo-600 underline"
                : "hover:text-indigo-500"
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
              ? "font-semibold text-indigo-600 underline"
              : "hover:text-indigo-500"
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
              ? "font-semibold text-indigo-600 underline"
              : "hover:text-indigo-500"
          }
        >
          Featured Blogs
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-indigo-600 underline"
                : "hover:text-indigo-500"
            }
          >
            Wishlist
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-base-100 z-50">
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {links}
              </ul>
            </div>

            <Link to="/" className="hidden lg:flex items-center gap-2">
              <img src={NavLogo} alt="Logo" className="w-8 h-8 rounded" />
              <span className="text-2xl font-extrabold">DevScoop</span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
          </div>

          <div className="navbar-end flex items-center gap-3">
            {user && (
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-indigo-300 ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                    }
                    alt="User"
                  />
                </div>
              </div>
            )}

            {user ? (
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error rounded-lg hover:scale-105 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline btn-primary rounded-lg hover:scale-105 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary rounded-lg text-white hover:scale-105 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
