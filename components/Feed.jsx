"use client"

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Dynamically import PromptCard with SSR disabled
const PromptCard = dynamic(() => import('./PromptCard'), { ssr: false });

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  async function fetchPromptData(search = '') {
    try {
      const res = await fetch(`/api/prompt?search=${search}`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    fetchPromptData(e.target.value);
  };

  useEffect(() => {
    fetchPromptData();
  }, []);

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
      <PromptCardList data={posts} handleTagClick={fetchPromptData} />
    </section>
  );
};

function PromptCardList({ data, handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

export default Feed;