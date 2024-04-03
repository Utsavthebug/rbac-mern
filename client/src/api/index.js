import axios from "axios";
import { Config } from "./config";

const axiosInstance = axios.create({
    baseURL:`${Config.baseUrl}/api/v1`,
    withCredentials:true
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error)
        if (error.response && error.response.status === 401) {
            sessionStorage.clear()
            window.location.href="/login"
            return Promise.reject('Unauthorized');
        }
        // Handle other errors here
        return Promise.reject(error);
    }
);

export default axiosInstance