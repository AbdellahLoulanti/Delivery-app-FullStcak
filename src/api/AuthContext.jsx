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
                const role = localStorage.getItem('role');
                if (token && role) {
                    const url = role === 'GESTIONNAIRE' ? '/gestionnaire/me' : '/client/me';
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
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
            const { token, email, role } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            setUser({ email, role });
            return { email, role };
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
            console.log('Inscription réussie :', response.data);
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
