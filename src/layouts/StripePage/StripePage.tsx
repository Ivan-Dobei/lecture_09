import React from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import usePosts from "../../hooks/usePosts";
import Post from "../../components/Post/Post";

function StripePage() {
    const {posts, loading} = usePosts();

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
                Posts
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
            >
                {posts.map((post) => (
                    <Box key={post.id}>
                        <Post post={post} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default StripePage;
