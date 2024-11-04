import React from 'react';
import { Box, Typography, Avatar, Paper } from "@mui/material";
import { IComment } from "../../models/IComment";

interface CommentProps {
    comment: IComment;
}

function Comment({ comment }: CommentProps) {
    return (
        <Paper elevation={3} sx={{ display: 'flex', alignItems: 'flex-start', padding: 2, mb: 2, borderRadius: 2 }}>
            <Box>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'text.primary' }}>
                    {comment.user.username}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                    {comment.text}
                </Typography>
            </Box>
        </Paper>
    );
}

export default Comment;
