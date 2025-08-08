import React from "react";
import Container from "../../components/container/container";

const relatedBlogs = [
  {
    id: 1,
    title: "Let’s Learn about Node.js with iLearn",
    category: "Node.js",
    image:
      "https://i.ibb.co/7dymC37n/Let-s-Learn-about-Node-JS-with-i-Learn-for.jpg",
  },
  {
    id: 2,
    title: "Build Your Career with Online Courses - Udemy",
    category: "Learning",
    image:
      "https://i.ibb.co/XxCPFWnn/Online-Kurslar-stedi-iniz-Her-eyi-Kendi-Program-n-za-G-re-renin-Udemy.jpg",
  },
  {
    id: 3,
    title: "React.js for Beginners: Props and State Explained",
    category: "React",
    image:
      "https://i.ibb.co/BVTX5t5n/React-js-for-Beginners-Props-and-State-Explained.jpg",
  },
  {
    id: 4,
    title: "What is Tailwind CSS & Why It's Trending?",
    category: "Tailwind CSS",
    image:
      "https://i.ibb.co/BHFBDy0Q/O-que-Tailwind-CSS-e-por-que-ele-virou-tend-ncia-no-front-end-Programadores-Depr-Programa-o-e-Tecnol.jpg",
  },
];

const ExtraSection = () => {
  return (
    <div className=" bg-gray-100 py-12 border-4 border-white rounded-2xl">
      <Container>
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Recommended Reads for You
          </h2>
          <p className="text-gray-600 mt-2 text-base">
            Dive into handpicked blog posts based on your interests. Keep
            learning and stay ahead in the dev game.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-indigo-500 font-medium mb-1">
                  {blog.category}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition line-clamp-2 cursor-pointer">
                  {blog.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ExtraSection;
