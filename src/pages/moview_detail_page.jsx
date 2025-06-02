import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useMovieDetail } from "../hooks/use_index";
import Loader from "../components/layouts/loader";

export const MoviewDetailPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieUrl = queryParams.get("url");

  const { data, isLoading, error } = useMovieDetail(movieUrl);
  const movieDetail = data || {};

  // Check if button contains V-Cloud in its label
  const isVCloudButton = (button) => {
    return button.label && button.label.toLowerCase().includes("v-cloud");
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

  if (!movieDetail || Object.keys(movieDetail).length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>No movie details available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-[80%] md:w-[50%] px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 dark:bg-purple-700 p-4 border-b border-gray-200 dark:border-gray-600">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {movieDetail.title}
          </h1>
        </div>

        <div className="p-4 bg-purple-500">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Available Qualities
          </h2>

          {movieDetail.qualities && movieDetail.qualities.length > 0 ? (
            <div className="space-y-6">
              {movieDetail.qualities.map((quality, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-purple-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    {quality.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {quality.buttons &&
                      quality.buttons.map((button, btnIndex) => (
                        <React.Fragment key={btnIndex}>
                          <Link
                            to={`/quality-options?url=${encodeURIComponent(button.value)}&title=${encodeURIComponent(quality.title)}&movieUrl=${encodeURIComponent(movieUrl)}`}
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
                          
                          {/* Show automate button for V-Cloud links */}
                          {isVCloudButton(button) && (
                            <Link
                              to={`/automate?url=${encodeURIComponent(button.value)}&title=Auto Extract: ${encodeURIComponent(quality.title)}&backUrl=${encodeURIComponent(currentPath)}`}
                              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-300"
                            >
                              ⚡ Auto Extract
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
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                            </Link>
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No download options available for this movie.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
