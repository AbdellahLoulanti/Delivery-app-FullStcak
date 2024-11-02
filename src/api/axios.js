import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8088/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(config => {
    // Check if the request URL includes the registration endpoint
    if (!config.url.includes('/auth/register') && !config.url.includes('/auth/authenticate')) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
