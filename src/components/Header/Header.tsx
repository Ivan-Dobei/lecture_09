import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {logout} from "../../store/slices/userSlice";

function Header() {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const dispatch = useAppDispatch();

    const handleLoginClick = () => {
        if(isAuthenticated) {
            dispatch(logout());
            console.log(isAuthenticated);
        }
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{marginLeft: 'auto'}}>
                    <Button sx={{backgroundColor: 'white', color: 'primary'}} onClick={handleLoginClick}>
                        {isAuthenticated ? 'Logout' : 'Login'}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
