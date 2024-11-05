import axiosInstance from './axiosInstance';
import {IPostData} from "../models/IPost";

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

export const fetchAllPosts = async (page: number, limit: number = 10) => {
    const response = await axiosInstance.get<IPostData>(`/api/exhibits?page=${page}&limit=${limit}`);
    return response.data;
};


export const fetchMyPosts = async (page: number, limit: number = 10) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authorization token found.');
    }

    console.log(token);

    const response = await axiosInstance.get<IPostData>(`/api/exhibits/my-posts?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deletePostById = async (id: number) => {
    const response = await axiosInstance.delete(`/api/exhibits/${id}`);
    return response.data.data;
};

