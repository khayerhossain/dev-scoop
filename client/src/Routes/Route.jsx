import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts/Layouts";
import DashboardLayout from "../Layouts/DashboardLayout";
import Home from "../Home/Home";
import Auth from "../Pages/Auth/Auth";
import AllBlogs from "../Pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../Pages/FeaturedBlogs/FeaturedBlogs";
import WishList from "../Pages/WishList/WishList";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AddBlogs from "../Pages/AddBlogs/AddBlogs";
import Error from "../Error/Error";
import UpdateBlog from "../Pages/UpdateBlog/UpdateBlog";
import Profile from "../Pages/Profile/Profile";
import Recommendations from "../Pages/Recommendations/Recommendations";
import Analytics from "../Pages/Analytics/Analytics";
import SmartSearch from "../Pages/Search/Search";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import MyBlogs from "../Pages/Dashboard/MyBlogs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layouts,
    children: [
      { path: "/", Component: Home },
      {
        path: "allblogs",
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/allblogsdata`),
        Component: AllBlogs,
      },
      { path: "featuredblogs", Component: FeaturedBlogs },
      { path: "recommendations", Component: Recommendations },
      { path: "analytics", Component: Analytics },
      { path: "search", Component: SmartSearch },
      {
        path: "blogdetails/:id",
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/allblogsdata`),
        element: (
          <PrivateRoute>
            <BlogDetails></BlogDetails>
          </PrivateRoute>
        ),
      },
      { path: "*", Component: Error },
    ],
  },
  // Dashboard routes for logged-in users
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", Component: DashboardHome },
      { path: "add-blog", Component: AddBlogs },
      { path: "my-blogs", Component: MyBlogs },
      { path: "wishlist", Component: WishList },
      { path: "profile", Component: Profile },
      { path: "analytics", Component: Analytics },
      { path: "edit-blog/:id", Component: UpdateBlog },
    ],
  },
  // Auth routes without navbar and footer
  { path: "login", Component: Auth },
  { path: "register", Component: Auth },
]);
