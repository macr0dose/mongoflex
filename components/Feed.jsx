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
      <div className="relative w-full md:w-1/2 flex items-center pb-2">
        <img
          src="/assets/icons/search.svg"
          alt="Search"
          width={40}
          height={40}
          className="absolute"
        />
        <input
          type="text"
          placeholder="Search by title, description, or category"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input"
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
