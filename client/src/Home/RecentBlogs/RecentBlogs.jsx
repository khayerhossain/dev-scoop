import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RecentBlogCards from '../../Pages/RecentBlogCards/RecentBlogCards';
import toast from 'react-hot-toast';
import { getAuth } from "firebase/auth";


const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]); // Wishlist state
const auth = getAuth();

  // Load recent blogs
  useEffect(() => {
   axios.get(`${import.meta.env.VITE_API_URL}/blogsdata`)
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);


  //Add to wishlist with client-side check
  const addToWishlist = async (blog) => {
    const token = await auth.currentUser.getIdToken();
    const alreadyAdded = wishlist.find(item => item._id === blog._id);
    if (alreadyAdded) {
    toast.error("Already added in Wishlist")
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, blog, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Successfully added in Wishlist')
      setWishlist([...wishlist, blog]); // update state locally
    } catch (err) {
      console.error(err);
      // alert("Something went wrong!");
    }
  };

  return (
    <div className='bg-gray-100 py-10'>
      <div className='mx-4 lg:mx-0'>
        <h2 className="text-3xl font-bold text-center mt-10">Recent Blogs</h2>
        <p className="text-center text-gray-600 mb-6">
          Stay updated with the latest trends and insights in the development world.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {blogs.map(blog => (
          <RecentBlogCards
            key={blog._id}
            blog={blog}
            addToWishlist={addToWishlist}
            wishlist={wishlist} // optionally send to child
          />
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
