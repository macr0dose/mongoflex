"use client"
import React, { useState } from "react";
import { categoryFilters } from "@/constants/index"; // Adjust the path as needed

const Categories = ({ handleTagClick }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClick = (category) => {
    setSelectedCategory(category);
    handleTagClick(category);
  };

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() => handleClick(category)}
              className={`px-4 py-2 mb-2 rounded-lg capitalize whitespace-nowrap ${
                category === selectedCategory ? "bg-purple-500 text-white" : ""
              }`} // Add highlighting styles for the selected category
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
