import './Post.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../provider/AuthContext';
import usePostData from '../../hooks/usePostData';
import UserHeader from '../UserHeader/UserHeader';
import Comment from '../Comment/Comment';
import LikeButton from '../LikeButton/LikeButton';
import { getPostImageUrl } from '../../services/api';

const Post = ({ post_id }) => {
    const { user } = useAuth();
    const postId = post_id;

    const { post, comments, handleLikePost, handleAddComment } = usePostData(postId);

    const [newComment, setNewComment] = useState('');

    const handleComment = async () => {
        handleAddComment(newComment);
        setNewComment('');
        setShowComments(true);
    };

    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    return (
        <article className='post'>
            <UserHeader userUsername={post.owner_username} userId={post.owner_id} />
            <section className='post-header'>
                <p className='post-description'>{post.description}</p>
                <p></p>
                <p className='post-category'>{post.category}</p>
            </section>

            <section className='post-content'>
                <p>{post.content}</p>
                <picture>
                    <img src={getPostImageUrl(post.owner_id, post.id)}
                        alt={`Post image with ${post.description}`}
                        loading='lazy'
                        onClick={() => window.open(getPostImageUrl(post.owner_id, post.id), '_blank')}
                    />
                </picture>
            </section>

            <section className='post-cant-likes-comments'>

                <p> <strong>{post.likes}</strong> Likes</p>

                <p><strong>{post.comments}</strong> Comments</p>

            </section>

            {user ? (
                <section>

                    <LikeButton
                        postId={postId}
                        handleLike={handleLikePost}
                    />

                </section>
            ) : (
                <button><Link to="/login">Login to like or comment</Link></button>

            )}

            <section className='post-comments'>

                <section className='posts-comments-interactions'>
                    {user ? (
                        <form onSubmit={handleComment}>
                            <label>
                                <input
                                    className='input-comment'
                                    type="text"
                                    placeholder="Add a comment"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    required />
                            </label>
                            <button
                                className='comment-button' onClick={handleComment}>
                                {newComment ? 'Comment' : 'Add a comment'}
                            </button>
                        </form>
                    ) : null
                    }

                    <button className='show-comments-button' onClick={toggleComments}>
                        {showComments ? 'Hide Comments' : 'Show Comments'}
                    </button>
                </section>

                {showComments && (

                    <section className='comments'>
                        <ul>
                            {comments.map(comment => (
                                <li key={comment.id}>
                                    <Comment
                                        userUsername={comment.owner_username} userId={comment.owner_id}
                                        content={comment.content}
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

            </section>
        </article>
    );
};

export default Post;
