import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthContext';
import Login from '../pages/Login/Login';
import Logout from '../pages/Logout/Logout';
import Trends from '../pages/Trends/Trends';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import UserProfile from '../pages/UserProfile/UserProfile';

export const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user/:userUsername" element={<UserProfile />} />
            <Route path="/trends" element={<Trends />} />
            {!user ? (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Navigate to="/" />} />
                </>
            ) : (
                <>
                    <Route path="/login" element={<Navigate to="/" />} />
                    <Route path="/register" element={<Navigate to="/" />} />
                    <Route path="/logout" element={<Logout />} />
                </>
            )}
        </Routes>
    );
};


