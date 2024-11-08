import React from 'react';
import {Box, Button, Typography} from '@mui/material';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, onPageChange }) => {

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
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
                Page {currentPage} of {lastPage}
            </Typography>
            <Button
                variant="outlined"
                onClick={handleNextPage}
                disabled={currentPage === lastPage}
            >
                Next
            </Button>
        </Box>
    );
};

export default Pagination;
