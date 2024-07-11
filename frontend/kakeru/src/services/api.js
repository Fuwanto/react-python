import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/';

const apiService = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

const getPostImageUrl = (ownerId, postId) => {
    return `${BASE_URL}posts/images/${ownerId}/${postId}`;
};

const getUserImageUrl = (userId) => {
    return `${BASE_URL}users/images/${userId}`;
};

export { apiService, getPostImageUrl, getUserImageUrl };