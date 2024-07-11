import React, { useEffect, useState } from 'react';
import Profile from '../../components/Profile/Profile';
import { useParams } from 'react-router-dom';
import { apiService } from '../../services/api';
import { useAuth } from '../../provider/AuthContext';

const UserProfile = () => {
    const { userUsername } = useParams();
    const { user: authenticatedUser } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiService.get(`users/get_user/${userUsername}`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [userUsername]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Profile user={user} isCurrentUser={authenticatedUser && authenticatedUser.username === userUsername} />
    );
}

export default UserProfile;
