import axiosInstance from './axiosInstance';
import {IPost} from "../models/IPost";
import axios from "axios";

// todo: fix any type
export const createPost = async (postData: any) => {
    const response = await axiosInstance.post('/api/exhibits', postData);
    return response.data;
};

export const fetchAllPosts = async () => {
    const response = await axiosInstance.get<IPost[]>('/api/exhibits');
    return response.data;
};

// todo: getImage is not working, need to fix
export const getImage = async (filename: string) => {
    console.log(filename);
    const response = await axios.get(`http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com${filename}`, {
        responseType: 'blob'
    });
    return URL.createObjectURL(response.data);
};

