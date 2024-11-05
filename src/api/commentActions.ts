import axiosInstance from "./axiosInstance";
import {IComment} from "../models/IComment";

export const getAllCommentsById = async (exhibitId: number) => {
    const response = await axiosInstance.get<IComment[]>(`/api/exhibits/${exhibitId}/comments`);
    return response.data;
};

export const createCommentById = async (exhibitId: number, text: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authorization token found.');
    }

    const response = await axiosInstance.post(
        `/api/exhibits/${exhibitId}/comments`,
        {text},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

export const deleteCommentById = async (exhibitDd: number, commentId: number) => {
    const response = await axiosInstance.delete(`/api/exhibits/${exhibitDd}/comments/${commentId}`);
    return response.data;
};
