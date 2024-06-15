import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (bodyContent) => {
        try {
            await apiService.post('/users/login', bodyContent);
            await refreshUser();
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await apiService.post('/users/logout');
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    const refreshUser = async () => {
        try {
            const userResponse = await apiService.get('/users/me');
            setUser(userResponse.data);
        } catch (error) {
            console.error(error);
            setUser(null);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    const contextValue = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
