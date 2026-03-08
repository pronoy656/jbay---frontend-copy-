import axios from "axios";

const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://10.10.7.109:3000/data/",
});

export default axiosPublic;
