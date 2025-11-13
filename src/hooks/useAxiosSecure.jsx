import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    const axiosSecure = axios.create({
        baseURL: 'http://localhost:3000',
    });

    axiosSecure.interceptors.request.use(
        async (config) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    config.headers.authorization = `Bearer ${token}`;
                } catch (error) {
                    console.error('Error fetching ID token:', error.message);
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return axiosSecure;
};

export default useAxiosSecure;