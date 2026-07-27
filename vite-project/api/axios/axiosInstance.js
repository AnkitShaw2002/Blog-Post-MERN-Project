
import axios from "axios"



const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000,

});

axiosInstance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        console.log(token, "token");
        if (token) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default axiosInstance