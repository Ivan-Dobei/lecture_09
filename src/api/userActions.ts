import axiosInstance from './axiosInstance';
import {IUser, IUserData} from "../models/IUser";

export const registerUser = async (user: IUserData) => {
    const response = await axiosInstance.post('/users/register', user);
    localStorage.setItem('token', response.data.token);
    return response.data;
};
export const loginUser = async (userData: IUserData) => {
    const response = await axiosInstance.post('/api/auth/login', userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
};
