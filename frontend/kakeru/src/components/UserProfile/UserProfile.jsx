import React, { useEffect, useState } from 'react';
import { apiWithoutCredentials, getUserImageUrl } from '../../services/api';
import UserHeader from '../UserHeader/UserHeader';
import Post from '../Post/Post';
import { useAuth } from '../../provider/AuthContext';
import MyProfile from '../../pages/MyProfile/MyProfile';

const UserProfile = ({ userUsername }) => {
    const { username } = useAuth();
    if (username === userUsername) {
        console.log("MyProfile");
        return (
            <MyProfile />
        );
    }
    const [user, setUser] = useState({});
    useEffect(() => {
        apiWithoutCredentials.request(`users/get_user/${userUsername}`, { method: 'GET' })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error(error);
                window.location.href = '/';
            });
    }, [userUsername]);

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        apiWithoutCredentials.request(`posts/user_posts/${userUsername}`, { method: 'GET' })
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [userUsername]);

    return (
        <>
            <UserHeader userUsername={user.username} />
            <img src={getUserImageUrl(user.id)} alt="User" />
            <h3>bio: {user.bio}</h3>
            <section>
                <h2>Posts</h2>
                {posts.map(post => (
                    <Post key={post.id} post_id={post.id} />
                ))
                }
            </section>
        </>
    );
}

export default UserProfile;