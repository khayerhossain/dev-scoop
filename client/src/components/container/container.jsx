import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div className="w-full px-2 md:px-8 lg:px-6">
      <div
        className={`w-full max-w-[1400px] mx-auto px-2 md:px-8 lg:px-6 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
