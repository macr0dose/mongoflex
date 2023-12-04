"use client"

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPromptData = async (search = "") => {
    try {
      const res = await fetch(`/api/prompt?search=${search}`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPromptData();
  }, []);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    fetchPromptData(search);
  };

  const handleTagClick = (tag) => {
    fetchPromptData(tag);
  };

  // Function to refresh data after a prompt is updated or deleted
  const refreshData = () => {
    fetchPromptData(searchText);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          name="search"
          placeholder="Search for a tag or a username"
          onChange={handleSearchChange}
          value={searchText}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} refreshData={refreshData} />
    </section>
  );
};

export default Feed;

function PromptCardList({ data, handleTagClick, refreshData }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          refreshData={refreshData} // Pass refreshData down to PromptCard
        />
      ))}
    </div>
  );
}
