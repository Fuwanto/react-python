import React, { useEffect, useState } from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import { apiService } from '../../services/api';
import { useAuth } from '../../provider/AuthContext';

const MyProfile = () => {
    const { token } = useAuth();
    const [user, setUser] = useState({});

    useEffect(() => {
        let headersList = { "Authorization": `Bearer ${token.access_token}` }
        apiService.request('users/me', { method: 'GET', headers: headersList })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [token]);

    return (
        <>
            <h1>My Profile</h1>
        </>
    );
}

export default MyProfile;