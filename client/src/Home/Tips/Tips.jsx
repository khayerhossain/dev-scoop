import React from "react";
import Container from "../../components/container/container";

const Tips = () => {
  return (
    <div className="bg-gray-100 py-12">
      <Container>
        <div className="mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            💡 Blogging Tips
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "📝",
                title: "Keep Titles Short",
                text: "Short and clear titles quickly grab the reader's attention.",
              },
              {
                icon: "🔍",
                title: "Use Keywords Wisely",
                text: "Include relevant keywords in your title, headings, and body content.",
              },
              {
                icon: "📷",
                title: "Add Images or Code",
                text: "Use visuals or code snippets to make your content easier to understand.",
              },
              {
                icon: "🧠",
                title: "Teach What You Learn",
                text: "Writing what you learn helps reinforce your own understanding.",
              },
              {
                icon: "⏱️",
                title: "Stay Consistent",
                text: "Posting regularly helps grow your audience and build writing habits.",
              },
              {
                icon: "📚",
                title: "Keep It Simple",
                text: "Use simple language so readers of all levels can understand your posts.",
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-indigo-50 group cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 group-hover:text-2xl transition-all duration-300">
                  {tip.icon} {tip.title}
                </h3>
                <p className="text-gray-700 text-sm group-hover:text-base transition-all duration-300">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Tips;
