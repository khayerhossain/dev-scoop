import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts/Layouts";
import Home from "../Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllBlogs from "../Pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../Pages/FeaturedBlogs/FeaturedBlogs";
import WishList from "../Pages/WishList/WishList";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AddBlogs from "../Pages/AddBlogs/AddBlogs";
import Error from "../Error/Error";
import UpdateBlog from "../Pages/UpdateBlog/UpdateBlog";


export const router=createBrowserRouter([
    {path:"/",
        Component:Layouts,
        children:[
            {path:"/", Component:Home},
            {path:"addblogs", element:<PrivateRoute>
            <AddBlogs></AddBlogs>
            </PrivateRoute>},
            {path:"allblogs",
                loader:()=> fetch(`${import.meta.env.VITE_API_URL}/allblogsdata`),
                Component:AllBlogs},
            {path:"featuredblogs", Component:FeaturedBlogs},
            {path:"wishlist", element:<PrivateRoute><WishList></WishList></PrivateRoute>},
            {path:"login", Component:Login},
            {path:"register", Component:Register},
            {path:"blogdetails/:id",
                loader:()=> fetch(`${import.meta.env.VITE_API_URL}/allblogsdata`),
                element:<PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>},
                { path: 'updateblog/:id', element: <PrivateRoute><UpdateBlog /></PrivateRoute> },
                {path:'*', Component:Error}

        ]
    }
])