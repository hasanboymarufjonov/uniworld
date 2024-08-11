import axios from "axios";
import BASE_URL from "./config.js";

const lang = localStorage.getItem("i18nextLng");

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
        "Accept-Language": lang,
    },
});


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("API error:", error);
        return Promise.reject(error);
    }
);

export default api;
