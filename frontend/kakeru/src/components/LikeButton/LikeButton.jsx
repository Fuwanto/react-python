import './LikeButton.css';
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const LikeButton = ({ postId, handleLike }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchLikedStatus = async () => {
            try {
                const response = await apiService.request(`posts/liked/${postId}`, { method: 'GET' });
                setLiked(response.data);
            } catch (error) {
                console.error("Error fetching liked status:", error);
            }
        };

        fetchLikedStatus();
    }, [postId]);

    const toggleLike = () => {
        setLiked(!liked);
        handleLike();
    };

    return (
        <button className="like" onClick={toggleLike}>
            {liked ? '❤️' : '🤍'}
        </button>
    );
};

export default LikeButton;
