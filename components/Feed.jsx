"use client";

import { useState, useEffect } from "react";

import ProjectCard from "./ProjectCard";
import Categories from "./Categories";

const ProjectCardList = ({ data, handleTagClick }) => {
  return (
    <div className="project_layout">
      {data.map((post) => (
        <ProjectCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/project");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.title) || // Search by title
        regex.test(item.description) || // Search by description
        regex.test(item.category) // Search by category
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <div className="relative w-1/2 flex items-center">
        {/* Search Icon */}
        <img 
          src="/assets/icons/search.svg" // Replace with your image path
          alt="Search"
          className="absolute left-3 h-10 w-10" // Adjust size as needed
        />
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title, description, or category"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer text-center pl-10 w-full"
        />
      </div>
      <div className="w-full">
        <Categories allPosts={allPosts} handleTagClick={handleTagClick} />
      </div>
      {searchText ? (
        <ProjectCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <ProjectCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
