import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUsername = localStorage.getItem('username');
        if (savedToken) {
            setToken(JSON.parse(savedToken));
        }
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const login = async (bodyContent) => {
        try {
            const loginResponse = await apiService.request('/users/login', {
                method: 'POST',
                data: bodyContent,
            });
            setToken(loginResponse.data);
            localStorage.setItem('token', JSON.stringify(loginResponse.data));
            try {
                let headersList = { "Authorization": `Bearer ${loginResponse.data.access_token}` };
                const userResponse = await apiService.request('/users/me', { method: 'GET', headers: headersList });
                setUsername(userResponse.data.username);
                localStorage.setItem('username', userResponse.data.username);
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            let headersList = {
                "Authorization": `Bearer ${token.access_token}`
            };
            await apiService.request('/users/logout', { method: 'POST', headers: headersList });
            setToken(null);
            setUsername(null);
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        } catch (error) {
            console.error(error);
        }
    };

    const refreshToken = async () => {
        try {
            let headersList = {
                "Authorization": `Bearer ${token.access_token}`
            };
            const refreshResponse = await apiService.request('/users/refresh_token', { method: 'POST', headers: headersList });
            setToken(refreshResponse.data);
            localStorage.setItem('token', JSON.stringify(refreshResponse.data));
        } catch (error) {
            console.error(error);
            setToken(null);
            setUsername(null);
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (token) {
                refreshToken();
            }
        }, 600000); // 10 minutes

        return () => clearInterval(intervalId);
    }, [token]);

    const contextValue = {
        token,
        username,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
