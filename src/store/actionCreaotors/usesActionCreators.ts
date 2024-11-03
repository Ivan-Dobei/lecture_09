import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUser, IUserData} from "../../models/IUser";
import {loginUser, registerUser} from "../../api/userActions";

export const login = createAsyncThunk('user/login', async (userData: IUserData) => {
    return await loginUser(userData);
});

export const register = createAsyncThunk('user/register', async (userData: IUserData) => {
    return await registerUser(userData);
});