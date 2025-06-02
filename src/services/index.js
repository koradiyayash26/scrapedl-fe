import apiClient from "../lib/api_client";

export const searchMovies = async (search) => {
  try {
    let response = await apiClient.get(`/search/?query=${search}`, {});
    return response.data;
  } catch (error) {
    // Enhance error with status information if it's from API
    if (error.response) {
      error.status = error.response.status;
      
      // Add a specific message for 404 errors
      if (error.response.status === 404) {
        error.message = `Search results not found. Please try another search term.`;
      }
    }
    throw error;
  }
};


export const movieDetail = async (url) => {
    if (!url) return null;
    let response = await apiClient.get(`/movie-details/?url=${encodeURIComponent(url)}`, {});
    return response.data;
  };

export const qualityOptions = async (url) => {
    if (!url) return null;
    let response = await apiClient.get(`/quality-options/?url=${encodeURIComponent(url)}`, {});
    return response.data;
};

export const downloadLinks = async (url) => {
    if (!url) return null;
    let response = await apiClient.get(`/download-links/?url=${encodeURIComponent(url)}`, {});
    return response.data;
};

export const automateVcloudExtraction = async (url) => {
    if (!url) return null;
    let response = await apiClient.get(`/automate/?url=${encodeURIComponent(url)}`, {});
    return response.data;
};
  