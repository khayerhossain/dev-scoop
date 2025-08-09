import React, { useEffect, useState } from 'react';
import FeaturedBlogsTable from '../FeaturedBlogsTable/FeaturedBlogsTable';
import usePageTitle from '../../PageTitle/PageTitle';

const FeaturedBlogs = () => {
  usePageTitle('Featured');

  const [topBlogs, setTopBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/allblogsdata`)
      .then(res => res.json())
      .then(data => {
        const sortedBlogs = data
          .map(blog => ({
            ...blog,
            wordCount: blog.longDescription?.trim().split(/\s+/).length || 0,
          }))
          .sort((a, b) => b.wordCount - a.wordCount)
          .slice(0, 10);
        setTopBlogs(sortedBlogs);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
      });
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-10">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-2xl font-bold text-gray-800 mb-2 mt-10">📌 Top 10 Featured Blogs</h2>
        <p className="text-gray-600 text-base max-w-2xl mx-auto">
          A collection of the top 10 most informative and insightful blogs based on word count — perfect for deep dives into development topics.
        </p>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}
      {!error && <FeaturedBlogsTable blogs={topBlogs} />}
    </div>
  );
};

export default FeaturedBlogs;
