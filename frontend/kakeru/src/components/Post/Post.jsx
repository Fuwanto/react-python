import './Post.css';
import { React, useEffect, useState } from 'react';
import { apiWithoutCredentials, apiService, getPostImageUrl } from '../../services/api';
import { useAuth } from '../../provider/AuthContext';
import UserHeader from '../UserHeader/UserHeader';
import { Link } from 'react-router-dom';

const Post = ({ post_id }) => {
    const { token } = useAuth();
    const postId = post_id;

    const [post, setPost] = useState({});
    useEffect(() => {
        apiWithoutCredentials.request(`posts/get_post/${postId}`, { method: 'GET' })
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [postId]);

    // Need authorization: like a post, comment a post

    const handleLikePost = (postId) => {
        let headersList = {
            "Authorization": `Bearer ${token.access_token}`
        }
        apiService.request(`posts/like/${postId}`, { method: 'POST', headers: headersList })
            .then((response) => {
                if (response.data.liked) {
                    post.likes += 1;
                }
                else {
                    post.likes -= 1;
                }
                setPost({ ...post });
            })
            .catch(error => {
                console.error(error);
            });

    }

    const [newComment, setNewComment] = useState('');

    const handleCommentPost = (postId) => {
        let formData = new FormData();
        formData.append('content', newComment);
        let headersList = { "Authorization": `Bearer ${token.access_token}` }

        apiService.request(`posts/comment/${postId}`, { method: 'POST', headers: headersList, data: formData })
            .then((response) => {
                post.comments += 1;
                setComments([...comments, response.data]);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const [comments, setComments] = useState([]);
    useEffect(() => {
        apiWithoutCredentials.request(`posts/comments/${postId}`, { method: 'GET' })
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [postId]);


    return (
        <div>
            <UserHeader userUsername={post.owner_username} userId={post.owner_id} />
            <Link to={`/user/${post.owner_username}`}>View Profile</Link>
            <h1>{post.title}</h1>
            <p>{post.category}</p>
            <p>{post.content}</p>
            <img src={getPostImageUrl(post.owner_id, post.id)} alt={post.title} />
            <p>{post.likes} likes</p>
            <p>{post.comments} comments</p>

            {token ? (
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
                ))
                }
            </ul>
        </div>
    );
}

export default Post;