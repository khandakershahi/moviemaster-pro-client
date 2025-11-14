import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://moviemaster-pro-server-gamma.vercel.app',

})

const useAxios = () => {
    return axiosInstance;
}
export default useAxios;