import React, { useEffect, useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getAuth } from "firebase/auth";
import Container from "../../components/container/container";
import Loading from "../Loading/Loading";

const BlogDetails = () => {
  const { id } = useParams();
  const allBlogs = useLoaderData();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 Loading state
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const foundBlog = allBlogs.find((blog) => blog._id === id);
    setBlog(foundBlog);
    setLoading(false); // ব্লগ ডেটা সেট হওয়ার পর লোডিং শেষ
  }, [id, allBlogs]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_BASE}/comments/${id}`);
        setComments(res.data);
      } catch (error) {
        toast.error("Failed to load comments.");
        console.error(error);
      }
    };

    if (id) fetchComments();
  }, [id, API_BASE]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Comment can't be empty!");

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      toast.error("You must be logged in to comment.");
      return;
    }

    const newComment = {
      blogId: id,
      text: comment,
      createdAt: new Date().toISOString(),
      userEmail: currentUser.email,
      userPhotoURL: currentUser.photoURL || "https://via.placeholder.com/40",
    };

    try {
      const res = await axios.post(`${API_BASE}/comments`, newComment);
      setComments((prev) => [...prev, res.data]);
      setComment("");
      toast.success("Comment submitted!");
    } catch (error) {
      toast.error("Failed to submit comment.");
      console.error(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!blog)
    return (
      <p className="text-center mt-10 text-xl font-medium">
        Blog not found.
      </p>
    );

  return (
    <div className="py-20 mt-10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Blog Details */}
          <div className="lg:col-span-2 bg-white border border-gray-200 shadow-xl rounded-xl p-6 h-full">
            <img
              className="w-full h-64 object-cover rounded-lg mb-6 border border-gray-300"
              src={blog.imageURL}
              alt={blog.title}
            />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {blog.title}
            </h2>
            <p className="text-gray-500 text-sm mb-2">
              {blog.date} |{" "}
              <span className="text-indigo-600 font-medium">
                {blog.category}
              </span>
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              {blog.longDescription}
            </p>
          </div>

          {/* Comments & Form */}
          <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Comments
              </h3>
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
              ) : (
                <ul className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
                  {comments.map((c, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-100 p-3 rounded-md border border-gray-200 text-gray-700 flex items-center gap-3"
                    >
                      <img
                        src={c.userPhotoURL || "https://via.placeholder.com/40"}
                        alt={c.userEmail || "User avatar"}
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {c.userEmail || "Anonymous"}
                        </p>
                        <p>{c.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <form onSubmit={handleCommentSubmit}>
              <label
                htmlFor="comment"
                className="block mb-2 font-semibold text-gray-700"
              >
                Leave a Comment:
              </label>
              <textarea
                id="comment"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="Write your comment here..."
              ></textarea>
              <button
                type="submit"
                className="mt-3 bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Container>

      {/* Back Button */}
      <div className="mt-10 text-center">
        <button
          onClick={() => navigate("/")}
          className="btn btn-outline btn-primary px-6 py-2 rounded-lg hover:scale-105 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
