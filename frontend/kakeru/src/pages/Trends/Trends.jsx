import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import Post from '../../components/Post/Post';

function Gallery() {
    const [mostLikedPosts, setMostLikedPosts] = useState([]);
    useEffect(() => {
        apiService.request('stats/most_liked_posts', { method: 'GET' })
            .then(response => {
                setMostLikedPosts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const [mostCategories, setMostCategories] = useState([]);
    useEffect(() => {
        apiService.request('stats/most_categories', { method: 'GET' })
            .then(response => {
                setMostCategories(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <section>
                <h2>Most Liked Posts</h2>
                <ul>
                    {mostLikedPosts.map(post => (
                        <li key={post.id}>
                            <Post post_id={post.id} />
                        </li>
                    ))
                    }
                </ul>
            </section>
            <section>
                <h2>Most Categories</h2>
                <ul>
                    {mostCategories.map(category => (
                        <li key={category.id}>
                            <p>{category.name}</p>
                            <p>{category.cant} posts</p>
                        </li>
                    ))
                    }
                </ul>
            </section>
        </>
    );

};

export default Gallery;