import axiosInstance from "./axiosInstance";
import {IComment} from "../models/IComment";

export const getAllCommentsById = async (id: number) => {
    const response = await axiosInstance.get<IComment[]>(`/api/exhibits/${id}/comments`);
    return response.data;
};