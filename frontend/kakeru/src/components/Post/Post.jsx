import './Post.css';
import React, { useEffect, useState } from 'react';
import { apiService, getPostImageUrl } from '../../services/api';
import { useAuth } from '../../provider/AuthContext';
import UserHeader from '../UserHeader/UserHeader';
import { Link } from 'react-router-dom';


const Post = ({ post_id }) => {
    const { user } = useAuth();
    const postId = post_id;

    const [post, setPost] = useState({});
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await apiService.get(`posts/get_post/${postId}`);
                setPost(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPost();
    }, [postId]);

    const handleLikePost = async (postId) => {
        try {
            const response = await apiService.post(`posts/like/${postId}`);
            if (response.data.liked) {
                post.likes += 1;
            } else {
                post.likes -= 1;
            }
            setPost({ ...post });
        } catch (error) {
            console.error(error);
        }
    };

    const [newComment, setNewComment] = useState('');

    const handleCommentPost = async (postId) => {
        try {
            const formData = new FormData();
            formData.append('content', newComment);

            const response = await apiService.post(`posts/comment/${postId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            post.comments += 1;
            setComments([...comments, response.data]);
        } catch (error) {
            console.error(error);
        }
    };


    const [comments, setComments] = useState([]);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await apiService.get(`posts/comments/${postId}`);
                setComments(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchComments();
    }, [postId]);

    return (
        <div>
            <UserHeader userUsername={post.owner} userId={post.owner_id} />
            <Link to={`/user/${post.owner_username}`}>View Profile</Link>
            <h1>{post.title}</h1>
            <p>{post.category}</p>
            <p>{post.content}</p>
            <img src={getPostImageUrl(post.owner_id, post.id)} alt={post.title} />
            <p>{post.likes} likes</p>
            <p>{post.comments} comments</p>

            {user ? (
                <>
                    <button onClick={() => handleLikePost(postId)}>Like</button>
                    <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <button onClick={() => handleCommentPost(postId)}>Comment</button>
                </>
            ) : (
                <p>Log in to like or comment</p>
            )}

            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        {comment.user_username}
                        {comment.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Post;
