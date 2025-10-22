import axios from "axios";
import React, { useEffect, useState } from "react";
import RecentBlogCards from "../../Pages/RecentBlogCards/RecentBlogCards";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";
import Container from "../../components/container/container";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/blogsdata`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addToWishlist = async (blog) => {
    const token = await auth.currentUser?.getIdToken();
    const alreadyAdded = wishlist.find((item) => item._id === blog._id);
    if (alreadyAdded) return toast.error("Already in Wishlist");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, blog, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Added to Wishlist!");
      setWishlist([...wishlist, blog]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Recent Blogs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Discover trending topics, fresh ideas, and dev-world insights
            curated just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <RecentBlogCards
              key={blog._id}
              blog={blog}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default RecentBlogs;
