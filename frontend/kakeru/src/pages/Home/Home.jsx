import './Home.css';
import { React, useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import Post from '../../components/Post/Post';
import { useAuth } from '../../provider/AuthContext';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const LIMIT = 10;

    const fetchPosts = async () => {
        try {
            const response = await apiService.request(`posts/get_posts?skip=${skip}&limit=${LIMIT}`, { method: 'GET' });
            const newPosts = response.data;
            setPosts([...posts, ...newPosts]);
            setSkip(skip + LIMIT);
            if (newPosts.length < LIMIT) {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []); // Load posts on component mount

    const addPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    return (
        <>
            <section className='posts-section'>
                {user && (
                    <section className='create-post-section'>
                        <CreatePostForm addPost={addPost} />
                    </section>
                )}
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchPosts}
                    hasMore={hasMore}
                    loader={<SkeletonLoader />}
                    endMessage={<p>No more posts to load.</p>}
                >
                    {posts.map(post => (
                        <Post key={post.id} post_id={post.id} />
                    ))}
                </InfiniteScroll>
            </section>
        </>
    );
};

const SkeletonLoader = () => (
    <div className="skeleton-loader">
        <div className="skeleton-post"></div>
        <div className="skeleton-post"></div>
    </div>
);

export default Home;
