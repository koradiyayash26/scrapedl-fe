import axios from "axios";

const isLocalDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const apiClient = axios.create({
  baseURL: isLocalDevelopment 
    ? "http://127.0.0.1:8000"
    : "https://scrapedl-vercel.vercel.app",
    // : "https://scrapedl.vercel.app/",
});

export default apiClient;