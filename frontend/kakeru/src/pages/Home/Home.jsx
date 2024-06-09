import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiWithoutCredentials, getPostImageUrl, getUserImageUrl } from '../../services/api';
import { useAuth } from '../../provider/AuthContext';
import Post from '../../components/Post/Post';

const Home = () => {
    const { token } = useAuth();

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        apiWithoutCredentials.request('posts/get_posts', { method: 'GET' })
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (
        <>
            <section>
                <h2>Posts</h2>
                {posts.map(post => (
                    <Post key={post.id} post_id={post.id} />
                ))
                }
            </section>
            <section>
                {token ? (
                    <>
                        <Link to={`/me`}>View Profile</Link>
                        <Link to="/logout">Logout</Link>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )
                }
            </section>
        </>
    );
};

export default Home;