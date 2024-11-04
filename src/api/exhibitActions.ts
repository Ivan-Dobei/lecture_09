import axiosInstance from './axiosInstance';

export const createPost = async (formData: FormData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authorization token found.');
    }

    const response = await axiosInstance.post('/api/exhibits', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


export const fetchAllPosts = async () => {
    const response = await axiosInstance.get('/api/exhibits');
    return response.data.data;
};

export const fetchMyPosts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authorization token found.');
    }
    const response = await axiosInstance.get('/api/exhibits/my-posts', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
};

export const deletePostById = async (id: number) => {
    const response = await axiosInstance.delete(`/api/exhibits/${id}`);
    return response.data.data;
};

