import React, { useEffect, useState } from 'react';
import { apiService, getUserImageUrl } from '../../services/api';
import UserHeader from '../UserHeader/UserHeader';
import Post from '../Post/Post';

const Profile = ({ user, isCurrentUser }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        apiService.request(`posts/user_posts/${user.username}`, { method: 'GET' })
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [user.username]);

    return (
        <>
            <UserHeader userUsername={user.username} />
            <img src={getUserImageUrl(user.id)} alt="User" />
            <h3>Bio: {user.bio}</h3>
            {isCurrentUser && <a href="/edit_profile">Edit Profile</a>}
            <section>
                <h2>Posts</h2>
                {posts.map(post => (
                    <Post key={post.id} post_id={post.id} />
                ))}
            </section>
        </>
    );
}

export default Profile;
