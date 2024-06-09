import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../provider/AuthContext';
import Login from '../pages/Login/Login';
import Logout from '../pages/Logout/Logout';
import Trends from '../pages/Trends/Trends';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import AUserProfile from '../pages/AUserProfile/AUserProfile';
import MyProfile from '../pages/MyProfile/MyProfile';

export const AppRoutes = () => {
    const { token } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user/:userUsername" element={<AUserProfile />} />
            <Route path="/trends" element={<Trends />} />
            {!token ? (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </>
            ) : (
                <>
                    <Route path="/me" element={<MyProfile />} />
                    <Route path="/logout" element={<Logout />} />
                </>
            )}
        </Routes>
    );
};

