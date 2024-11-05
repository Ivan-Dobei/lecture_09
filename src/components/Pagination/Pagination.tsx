import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {IPostDataPagination} from "../../models/IPost";

interface PaginationProps {
    currentPage: number;
    paginationData: IPostDataPagination;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({paginationData, currentPage, setPage}: PaginationProps) {

    const handleNextPage = () => {
        if (currentPage < paginationData.lastPage) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <Box display="flex" justifyContent="center" mt={4} gap={2}>
            <Button
                variant="outlined"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                Previous
            </Button>
            <Typography variant="body1">
                Page {paginationData.page} of {paginationData.lastPage}
            </Typography>
            <Button
                variant="outlined"
                onClick={handleNextPage}
                disabled={currentPage === paginationData.lastPage}
            >
                Next
            </Button>
        </Box>
    );
}

export default Pagination;
