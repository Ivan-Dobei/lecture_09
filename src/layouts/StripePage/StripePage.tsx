import React, { useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Button } from '@mui/material';
import usePosts from "../../hooks/usePosts";
import Post from "../../components/Post/Post";
import Pagination from "../../components/Pagination/Pagination";

function StripePage() {
    const [refreshList, setRefreshList] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { posts, paginationData, loading } = usePosts(refreshList, currentPage);

    const refreshing = () => {
        setRefreshList(!refreshList);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                {posts.map((post) => (
                    <Box key={post.id}>
                        <Post post={post} refreshList={refreshing} />
                    </Box>
                ))}
            </Box>
            {(paginationData && posts.length !== 0) && (
                <Pagination
                    currentPage={currentPage}
                    paginationData={paginationData}
                    setPage={setCurrentPage}
                />
            )}
        </Box>
    );
}

export default StripePage;
