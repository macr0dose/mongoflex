"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProjectCard from "./ProjectCard";
import Categories from "./Categories";
import LoadMore from "./LoadMore";

const Feed = () => {
  const router = useRouter();
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const projectsPerPage = 6;

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const isLoadMoreVisible = searchText
    ? searchedResults.length > projectsPerPage
    : allPosts.length > projectsPerPage &&
      displayedPosts.length < allPosts.length;

  const fetchPosts = async () => {
    const response = await fetch("/api/project");
    const data = await response.json();
    setAllPosts(data);
    setDisplayedPosts(data.slice(0, projectsPerPage));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const categoryFromQuery = router.query.category;
      if (categoryFromQuery) {
        handleTagClick(categoryFromQuery);
      }
    }
  }, [router.isReady, router.query]);

  const filterPrompts = (text) => {
    const regex = new RegExp(text, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.description) ||
        regex.test(item.category)
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

  router.push(`/?category=${tagName}`, undefined, { shallow: true });
};

  const loadMoreProjects = () => {
    const newPage = page + 1;
    setPage(newPage);
    const newProjects = allPosts.slice(0, projectsPerPage * newPage);
    setDisplayedPosts(newProjects);
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

      <div className="project_layout">
        {searchText
          ? searchedResults.map((post) => (
              <ProjectCard key={post._id} post={post} />
            ))
          : displayedPosts.map((post) => (
              <ProjectCard key={post._id} post={post} />
            ))}
      </div>

      {isLoadMoreVisible && (
        <div className="pb-10">
          <LoadMore loadMore={loadMoreProjects} />
        </div>
      )}
    </section>
  );
};

export default Feed;