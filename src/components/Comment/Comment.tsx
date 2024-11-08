import React from 'react';
import {Box, Typography, Avatar, Paper, Button} from "@mui/material";
import {IComment} from "../../models/IComment";
import {deleteCommentById} from "../../api/commentActions";
import {useAppSelector} from "../../hooks/redux";

interface CommentProps {
    comment: IComment;
    refresh: () => void;
    postId: number;
}

function Comment({comment, refresh, postId}: CommentProps) {
    const {userData} = useAppSelector(state => state.user);
    const isItMyComment = comment.user.username === userData?.username;

    const deleteComment = async () => {
        try {
            await deleteCommentById(postId, comment.id);
            refresh();
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{ display: 'flex', alignItems: 'flex-start', padding: 2, mb: 2, borderRadius: 2, gap: 2 }}
        >
            <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'text.primary' }}>
                    {comment.user.username}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    {comment.text}
                </Typography>
            </Box>
            {isItMyComment && (
                <Button
                    onClick={deleteComment}
                    color="error"
                    variant="outlined"
                    size="small"
                    sx={{ alignSelf: 'center', minWidth: 'fit-content', padding: '2px 6px', borderRadius: 1 }}
                >
                    Delete
                </Button>
            )}
        </Paper>
    );
}

export default Comment;
