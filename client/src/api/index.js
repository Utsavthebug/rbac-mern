import axios from "axios";
import { Config } from "./config";

const axiosInstance = axios.create({
    baseURL:`${Config.baseUrl}/api/v1`,
    withCredentials:true
})

export default axiosInstance