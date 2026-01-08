import React from "react";

const HomeSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 animate-pulse">
      {/* Title */}
      <div className="h-10 bg-gray-300 rounded w-3/5 mx-auto"></div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-24 bg-gray-300 rounded"></div>
        <div className="h-24 bg-gray-300 rounded"></div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center mt-4">
        <div className="h-12 w-32 bg-gray-300 rounded"></div>
        <div className="h-12 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
