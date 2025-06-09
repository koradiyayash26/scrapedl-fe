import { useQuery } from "@tanstack/react-query";
import { automateVcloudExtraction, downloadLinks, movieDetail, qualityOptions, searchMovies } from "../services";

export const useSearch = (search,category) => {
    return useQuery({
      queryKey: ["search", search,category],
      queryFn: () => searchMovies(search,category),
      onError: (error) => {
        console.error("Error fetching searched data:", error);
        if (error.response && error.response.status === 404) {
          error.customMessage = "No results found for your search. Please try a different search term.";
        }
      },
      retry: (failureCount, error) => {
        if (error.response && error.response.status === 404) {
          return false;
        }
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
      enabled: !!url,
      onError: (error) => {
        console.error("Error automating V-Cloud extraction:", error);
      },
    });
  };  