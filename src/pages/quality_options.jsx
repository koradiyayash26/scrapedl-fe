import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useQualityOptions } from "../hooks/use_index";
import Loader from "../components/layouts/loader";

export const QualityOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const contentUrl = queryParams.get("url");
  const title = queryParams.get("title") || "Download Options";
  const movieUrl = queryParams.get("movieUrl");

  const { data, isLoading, error } = useQualityOptions(contentUrl);
  const optionsData = data || {};

  const handleBackClick = () => {
    if (movieUrl) {
      navigate(`/movie-details?url=${encodeURIComponent(movieUrl)}`);
    } else {
      navigate(-1); // Fallback to browser history if no movieUrl
    }
  };

  const currentPath = location.pathname + location.search;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!optionsData || Object.keys(optionsData).length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>No download options available.</p>
        </div>
      </div>
    );
  }

  const isSeriesContent = optionsData.servers && optionsData.servers.length > 1 && 
                          optionsData.servers[0].title && 
                          optionsData.servers[0].title.includes("Episode");

  return (
    <div className="container mx-auto w-[80%] md:w-[50%] px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 dark:bg-purple-700 p-4 border-b border-gray-200 dark:border-gray-600">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {optionsData.title || title}
          </h1>
          <button 
            onClick={handleBackClick}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 mt-2 inline-block bg-transparent border-0 cursor-pointer"
          >
            &larr; Back to details
          </button>
        </div>

        <div className="p-4 bg-purple-500">
          {optionsData.servers && optionsData.servers.length > 0 ? (
            <div className="space-y-6">
              {optionsData.servers.map((server, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-purple-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    {server.title || (isSeriesContent ? `Episode ${index + 1}` : "Download Links")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {server.buttons &&
                      server.buttons.map((button, btnIndex) => (
                        <Link
                          key={btnIndex}
                          to={`/download-links?url=${encodeURIComponent(button.value)}&title=${encodeURIComponent(server.title || "Download Links")}&backUrl=${encodeURIComponent(currentPath)}`}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-300"
                        >
                          {button.label}
                          <svg
                            className="ml-2 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No download links available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}; 