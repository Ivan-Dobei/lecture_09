import axiosInstance from './axiosInstance';
import {IUserData} from "../models/IUser";

export const registerUser = async (userData: IUserData) => {
    const response = await axiosInstance.post('/users/register', userData);
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    return response.data;
};
export const loginUser = async (userData: IUserData) => {
    const response = await axiosInstance.post('/api/auth/login', userData);
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    return response.data;
};
