import React, { useState } from "react";
import { useSearch } from "../hooks/use_index";
import Loader from "../components/layouts/loader";
import { Link } from "react-router-dom";

const Home = () => {
  const movies_category = [
    { id: 1, name: "Bollywood", url: "/bollywood" },
    { id: 2, name: "Hollywood", url: "/hollywood" },
  ];

  const savedCategory = localStorage.getItem('category') || "Hollywood";
  const defaultCategory = movies_category.find(cat => cat.name === savedCategory) || movies_category[1]; 
  
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  
  const { data, isLoading, error } = useSearch(activeSearchTerm,defaultCategory.name);

  let MovieData = data || [];


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    localStorage.setItem('category',category.name)
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Category:", selectedCategory.name);
    console.log("Search Text:", searchText);
    setActiveSearchTerm(searchText);
    setHasSearched(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    const is404 = error.status === 404 || error.response?.status === 404;
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className={`${is404 ? "bg-yellow-100 border-yellow-400 text-yellow-700" : "bg-red-100 border-red-400 text-red-700"} border px-4 py-3 rounded mb-4`}>
          <p className="font-semibold">{is404 ? "No results found" : "Error"}</p>
          <p>{error.customMessage || error.message || "An error occurred during search. Please try again."}</p>
        </div>
        
        {/* Show search form again so user can try another search */}
        <form className="max-w-lg mx-auto my-4" onSubmit={handleSubmit}>
          <div className="flex">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search Movies
            </label>
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 outline-none focus:outline-none dark:bg-purple-700 dark:hover:bg-purple-800 dark:text-white dark:border-none"
              type="button"
              onClick={toggleDropdown}
            >
              {selectedCategory.name}{" "}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 ${
                isDropdownOpen ? "" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-purple-700 absolute mt-12`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                {movies_category.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-purple-600 dark:hover:text-white outline-none focus:outline-none"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-white bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 outline-none focus:outline-none dark:bg-purple-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder={`Search in ${selectedCategory.name}...`}
                required
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 outline-none focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <form className="max-w-lg mx-auto my-4" onSubmit={handleSubmit}>
        <div className="flex">
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search Movies
          </label>
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 outline-none focus:outline-none dark:bg-purple-700 dark:hover:bg-purple-800 dark:text-white dark:border-none"
            type="button"
            onClick={toggleDropdown}
          >
            {selectedCategory.name}{" "}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 ${
              isDropdownOpen ? "" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-purple-700 absolute mt-12`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              {movies_category.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-purple-600 dark:hover:text-white outline-none focus:outline-none"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-white bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 outline-none focus:outline-none dark:bg-purple-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder={`Search in ${selectedCategory.name}...`}
              required
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 outline-none focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      <div className="container mx-auto px-4 py-6">
        {!hasSearched ? (
          <div className="text-center py-10">
            <div className="mb-4">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Search for movies</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Use the search bar above to find movies in {selectedCategory.name} category.
            </p>
          </div>
        ) : MovieData.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {MovieData.map((movie, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-purple-800 dark:border-gray-700 overflow-hidden"
              >
                <Link to={`/movie-details?url=${encodeURIComponent(movie.url)}`}>
                  <div className="relative pb-[150%] overflow-hidden">
                    <img
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      src={movie.image}
                      alt={movie.title || "Movie poster"}
                    />
                  </div>
                  <div className="p-3">
                    <h5 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 dark:text-white">
                      {movie.title}
                    </h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No results found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try a different search term or category.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
