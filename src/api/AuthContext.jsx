import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from './axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('/client/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data); // Ensure response.data is the user object
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post('/auth/authenticate', credentials);
            const { token, user } = response.data; // Ensure your API response has these fields

            // Store token and user data
            localStorage.setItem('token', token);
            setUser(user);

            return user; // Return user data for role checking if needed
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('/auth/register', userData);
            console.log('Inscription réussie :', response.data); // Gérer la réponse sans JWT
        } catch (error) {
            console.error('Échec de l\'inscription:', error.response ? error.response.data : error.message);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
    
};

export const useAuth = () => useContext(AuthContext);
