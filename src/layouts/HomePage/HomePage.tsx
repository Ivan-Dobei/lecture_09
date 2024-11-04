import React, {useEffect, useState} from 'react';
import {Box, Typography, CircularProgress} from '@mui/material';
import Post from "../../components/Post/Post";
import useMyPost from "../../hooks/useMyPost";
import {Link} from "react-router-dom";

function HomePage() {

    const [refreshList, setRefreshList] = useState<boolean>(false);
    const {myPosts, loading} = useMyPost(refreshList);

    const refreshing = () => {
        setRefreshList(!refreshList);
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                My Posts
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
            >
                {myPosts.length === 0 && (
                    <Typography>
                        You don't have any posts. <Link to='/newPost'>Create your first post</Link>
                    </Typography>
                )}
                {myPosts.map((myPost) => (
                    <Box key={myPost.id}>
                        <Post post={myPost} refreshList={refreshing}/>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default HomePage;
