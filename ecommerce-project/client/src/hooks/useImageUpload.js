import { useState } from 'react';
import { uploadApi } from '../utils/api';

export const useImageUpload = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = async (file) => {
        try {
            setLoading(true);
            setError(null);

            const formData = new FormData();
            formData.append('image', file);

            const { data } = await uploadApi.uploadImage(formData);
            return data.image;
        } catch (err) {
            setError(err.response?.data?.message || 'Error uploading image');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, loading, error };
};
