import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
    exp: number;
}

const isTokenExpired = (token: string): boolean => {
    try {
        const decodedToken = jwtDecode<JWTPayload>(token);
        const currentTime = new Date().getTime();
        return decodedToken.exp * 1000 < currentTime;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return true;
    }
};

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem('x_auth_token');

    if (!token || isTokenExpired(token)) {
        console.error('No valid token found.');
        // Redirect to login page
        // Block the request
        return Promise.reject('No valid token found.');
    }

    req.headers['x_auth_token'] = token;
    return req;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized.');
        }
        return Promise.reject(error.response?.data || 'An unknown error occurred');
    }
);

export default axiosInstance;
