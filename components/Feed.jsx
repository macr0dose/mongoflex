"use client"

import React from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = React.useState("");
  const [posts, setPosts] = React.useState([]);

  async function fetchPromptData(search) {
    try {
      const res = await fetch(`/api/prompt?search=${search}`);
      const data = await res.json();
      if (JSON.stringify(posts) === JSON.stringify(data)) return;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const search = e.target.value;
    // debounce the search function
    debounce(() => {
      fetchPromptData(search);
    }, 500)();
  };

  const handleTagClick = (tag) => {
    fetchPromptData(tag);
  };

  const refreshPrompts = () => {
    fetchPromptData(searchText);
  };

  React.useEffect(() => {
    fetchPromptData("");
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
      <PromptCardList data={posts} handleTagClick={handleTagClick} refreshPrompts={refreshPrompts} />
    </section>
  );
};

export default Feed;

function PromptCardList({ data, handleTagClick, refreshPrompts }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          refreshPrompts={refreshPrompts}
        />
      ))}
    </div>
  );
}

// Debounce function implementation
function debounce(func, delay) {
  let timer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}
