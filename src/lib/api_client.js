import axios from "axios";

const isLocalDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const apiClient = axios.create({
  baseURL: isLocalDevelopment 
    ? "http://127.0.0.1:8000"
    : "http://127.0.0.1:8000",
});

export default apiClient;