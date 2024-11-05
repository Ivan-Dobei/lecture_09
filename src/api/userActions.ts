import axiosInstance from './axiosInstance';
import {IUser, IUserData} from "../models/IUser";

export const registerUser = async (userData: IUserData) => {
    const response = await axiosInstance.post('/users/register', userData);
    localStorage.setItem('token', response.data.access_token);
    return response.data;
};

export const loginUser = async (userData: IUserData) => {
    const response = await axiosInstance.post('/api/auth/login', userData);
    localStorage.setItem('token', response.data.access_token);
    return response.data;
};

export const getUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authorization token found.');
    }

    const response = await axiosInstance.get<IUser>('/users/my-profile', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}