import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDownloadLinks } from "../hooks/use_index";
import Loader from "../components/layouts/loader";

export const DownloadLinks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const contentUrl = queryParams.get("url");
  const title = queryParams.get("title") || "Download Links";
  const backUrl = queryParams.get("backUrl");

  const { data, isLoading, error } = useDownloadLinks(contentUrl);
  const downloadData = data || {};

  const handleBackClick = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1); // Fallback to browser history if no backUrl
    }
  };

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

  if (!downloadData || Object.keys(downloadData).length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>No download links available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-[80%] md:w-[50%] px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 dark:bg-purple-700 p-4 border-b border-gray-200 dark:border-gray-600">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {downloadData.title || title}
          </h1>
          <button 
            onClick={handleBackClick}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 mt-2 inline-block bg-transparent border-0 cursor-pointer"
          >
            &larr; Back
          </button>
        </div>

        <div className="p-4 bg-purple-500">
          {downloadData.direct_url && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Direct Play
              </h2>
              <a
                href={downloadData.direct_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-300"
              >
                Play Now
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
            </div>
          )}

          {downloadData.download_links && downloadData.download_links.length > 0 ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Download Options
              </h2>
              <div className="bg-gray-50 dark:bg-purple-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex flex-wrap gap-3">
                  {downloadData.download_links.map((link, index) => (
                    <a
                      key={index}
                      href={link.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-300"
                    >
                      {link.label}
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
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