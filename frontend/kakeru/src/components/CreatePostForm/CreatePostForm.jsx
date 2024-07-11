import './CreatePostForm.css';
import React, { useState } from 'react';
import { apiService } from '../../services/api';

const CreatePostForm = ({ addPost }) => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('image', image);
            formData.append('category', category);

            const response = await apiService.post('posts/create_post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Post created:', response.data);

            addPost(response.data);

        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Description:
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Image:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </label>
            <label>
                Category:
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </label>
            <button type="submit" disabled={loading}>Create Post</button>
        </form>
    );
};

export default CreatePostForm;
