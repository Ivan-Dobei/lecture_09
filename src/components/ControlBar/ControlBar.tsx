import React, {useState} from 'react';
import {Drawer, List, ListItem, Divider, Button, Box} from '@mui/material';
import {Link} from "react-router-dom";

const ControlBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <Box>
            <Button
                sx={{color: 'inherit'}}
                onClick={openMenu}
            >
                Menu
            </Button>
            <Drawer
                anchor='left'
                open={isMenuOpen}
                onClose={closeMenu}
            >
                <Box
                    onClick={closeMenu}
                    sx={{padding: '0 20px'}}
                >
                    <List>
                        <ListItem>
                            <Link to='/'>Stipe Page</Link>
                        </ListItem>
                        <ListItem>
                            <Link to='/home'>Home Page</Link>
                        </ListItem>
                        <ListItem>
                            <Link to='/newPost'>New Post</Link>
                        </ListItem>
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </Box>
    );
};

export default ControlBar;
