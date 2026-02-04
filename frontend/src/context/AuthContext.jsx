import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

        // This logic automatically switches between local and live backend
    const API = axios.create({ 
        baseURL: window.location.hostname === 'localhost' 
            ? 'http://localhost:5000/api' 
            : 'https://dev-tube-self.vercel.app/api' 
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        const { data } = await API.post('/auth/login', { email, password });
        setToken(data.token);
        setUser(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    };

    const register = async (username, email, password) => {
        const { data } = await API.post('/auth/register', { username, email, password });
        setToken(data.token);
        setUser(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    };

    // --- ADDED: TOGGLE COMPLETION LOGIC ---
    const toggleComplete = async (videoId) => {
        if (!token) return alert("Sign in to track your progress!");
        try {
            const { data } = await API.put('/auth/complete', { videoId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const updatedUser = { ...user, completedVideos: data };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (err) {
            console.error("Failed to update progress");
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, register, logout, loading, toggleComplete }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);