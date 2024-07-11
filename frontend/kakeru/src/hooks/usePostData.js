import { useEffect, useState } from 'react';
import { apiService } from '../services/api';

const usePostData = (postId) => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const [postResponse, commentsResponse] = await Promise.all([
                    apiService.get(`posts/get_post/${postId}`),
                    apiService.get(`posts/comments/${postId}`)
                ]);
                setPost(postResponse.data);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    const handleLikePost = async () => {
        try {
            const response = await apiService.post(`posts/like/${postId}`);
            const updatedPost = { ...post, likes: response.data.likes };
            setPost(updatedPost);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddComment = async (content) => {
        try {
            const formData = new FormData();
            formData.append('content', content);

            const response = await apiService.post(`posts/comment/${postId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const updatedComments = [...comments, response.data];
            setComments(updatedComments);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        post,
        comments,
        handleLikePost,
        handleAddComment,
    };
};

export default usePostData;
