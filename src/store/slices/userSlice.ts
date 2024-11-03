import {createSlice} from '@reduxjs/toolkit';
import {IUser, IUserData} from "../../models/IUser";
import {login, register} from "../actionCreaotors/usesActionCreators";

interface UserState {
    user: IUser | null;
    userData: IUserData | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
    userData: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.isAuthenticated = false;
            state.userData = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.userData = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.userData = action.payload;
            });
    },
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;
