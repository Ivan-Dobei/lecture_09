import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserData} from "../../models/IUser";
import {login, register} from "../actionCreaotors/usesActionCreators";

interface UserState {
    userData: IUserData | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    isAuthenticated: !!localStorage.getItem('token'),
    userData: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.isAuthenticated = false;
            state.userData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action: PayloadAction<IUserData>) => {
                state.isAuthenticated = true;
                state.userData = action.payload;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<IUserData>) => {
                state.isAuthenticated = true;
                state.userData = action.payload;
            });
    },
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;
