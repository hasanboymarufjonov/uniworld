import axios from "axios";
import BASE_URL from "./config.js";

const lang = localStorage.getItem("i18nextLng");

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // Optional: set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
        "Accept-Language": lang,
    },
});


// Response interceptor for global error handling or transformation
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Global error handling
        console.error("API error:", error);
        return Promise.reject(error);
    }
);

export default api;
