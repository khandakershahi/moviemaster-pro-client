import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {
    const { user, siginOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request interceptor: attach Firebase token
        const requestInterceptor = instance.interceptors.request.use(
            async (config) => {
                if (user) {
                    const token = await user.getIdToken();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor: handle 401/403
        const responseInterceptor = instance.interceptors.response.use(
            (response) => response,
            (error) => {
                const status = error.response?.status; // use error.response
                if (status === 401 || status === 403) {
                    siginOutUser()
                        .then(() => navigate('/register'))
                        .catch((err) => console.error('Signout error:', err));
                }
                return Promise.reject(error);
            }
        );

        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        };
    }, [user, navigate, siginOutUser]);

    return instance;
};

export default useAxiosSecure;
