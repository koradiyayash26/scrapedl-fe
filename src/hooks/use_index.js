import { useQuery } from "@tanstack/react-query";
import { automateVcloudExtraction, downloadLinks, movieDetail, qualityOptions, searchMovies } from "../services";

export const useSearch = (search) => {
    return useQuery({
      queryKey: ["search", search],
      queryFn: () => searchMovies(search),
      onError: (error) => {
        // Log the error for debugging
        console.error("Error fetching searched data:", error);
        
        // Check if it's a 404 error
        if (error.response && error.response.status === 404) {
          error.customMessage = "No results found for your search. Please try a different search term.";
        }
      },
      retry: (failureCount, error) => {
        // Don't retry on 404 errors
        if (error.response && error.response.status === 404) {
          return false;
        }
        // Retry other errors up to 2 times
        return failureCount < 2;
      }
    });
  };

export const useMovieDetail = (url) => {
    return useQuery({
      queryKey: ["movie_detail", url],
      queryFn: () => movieDetail(url),
      onError: (error) => {
        console.error("Error fetching movie detail data:", error);
      },
    });
  };  

export const useQualityOptions = (url) => {
    return useQuery({
      queryKey: ["quality_options", url],
      queryFn: () => qualityOptions(url),
      onError: (error) => {
        console.error("Error fetching quality options data:", error);
      },
    });
  };  

export const useDownloadLinks = (url) => {
    return useQuery({
      queryKey: ["download_links", url],
      queryFn: () => downloadLinks(url),
      onError: (error) => {
        console.error("Error fetching download links data:", error);
      },
    });
  };  

export const useAutomateVcloudExtraction = (url) => {
    return useQuery({
      queryKey: ["automate_vcloud", url],
      queryFn: () => automateVcloudExtraction(url),
      enabled: !!url, // Only run query if URL is provided
      onError: (error) => {
        console.error("Error automating V-Cloud extraction:", error);
      },
    });
  };  