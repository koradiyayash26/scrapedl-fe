import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAutomateVcloudExtraction } from "../hooks/use_index";
import Loader from "../components/layouts/loader";

export const Automate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const vcloudUrl = queryParams.get("url");
  const title = queryParams.get("title") || "Automated Extraction";
  const backUrl = queryParams.get("backUrl");
  const [showMessage, setShowMessage] = useState(true);

  // Start the automate process immediately when the component mounts
  const { data, isLoading, error } = useAutomateVcloudExtraction(vcloudUrl);
  const automateData = data || {};

  // Hide the success message after 5 seconds
  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleBackClick = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1); // Fallback to browser history if no backUrl
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto w-[80%] md:w-[50%] px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-purple-700 p-4 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            <button 
              onClick={handleBackClick}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 mt-2 inline-block bg-transparent border-0 cursor-pointer"
            >
              &larr; Back
            </button>
          </div>
          <div className="p-8 bg-purple-500 flex justify-center">
            <div className="text-center">
              <Loader />
              <p className="text-white mt-4">Automating V-Cloud link extraction...</p>
              <p className="text-gray-200 text-sm mt-2">This might take a few seconds</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto w-[80%] md:w-[50%] px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-purple-700 p-4 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            <button 
              onClick={handleBackClick}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 mt-2 inline-block bg-transparent border-0 cursor-pointer"
            >
              &larr; Back
            </button>
          </div>
          <div className="p-4 bg-purple-500">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>Error: {error.message}</p>
              <p className="mt-2 text-sm">Unable to automate the V-Cloud link extraction.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Download links data from the API response
  const downloadLinksData = automateData.download_links || {};
  
  return (
    <div className="container mx-auto w-[80%] md:w-[50%] px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 dark:bg-purple-700 p-4 border-b border-gray-200 dark:border-gray-600">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {downloadLinksData.title || title}
          </h1>
          <button 
            onClick={handleBackClick}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 mt-2 inline-block bg-transparent border-0 cursor-pointer"
          >
            &larr; Back
          </button>
        </div>

        <div className="p-4 bg-purple-500">
          {showMessage && automateData.message && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p className="font-semibold">{automateData.message}</p>
              <p className="text-sm mt-1">Processing time: {automateData.processing_time}</p>
            </div>
          )}

          {downloadLinksData.direct_url && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Direct Play
              </h2>
              <a
                href={downloadLinksData.direct_url}
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

          {downloadLinksData.download_links && downloadLinksData.download_links.length > 0 ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Download Options
              </h2>
              <div className="bg-gray-50 dark:bg-purple-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex flex-wrap gap-3">
                  {downloadLinksData.download_links.map((link, index) => (
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
          
          {automateData.quality_url && automateData.v_cloud_url && (
            <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600">
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">V-Cloud Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <span className="font-medium">Quality URL:</span>
                  <div className="truncate text-blue-600 dark:text-blue-400">{automateData.quality_url}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <span className="font-medium">V-Cloud URL:</span>
                  <div className="truncate text-blue-600 dark:text-blue-400">{automateData.v_cloud_url}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 