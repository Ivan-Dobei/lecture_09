import React, { useState } from 'react';
import { Box, Button, List, TextField, Typography, Paper, Divider } from "@mui/material";
import Comment from "../Comment/Comment";
import { IComment } from "../../models/IComment";
import { createCommentById } from "../../api/commentActions";

interface CommentListProps {
    postId: number;
    comments: IComment[] | null;
    refreshComments: () => void;
}

function CommentList({ postId, comments, refreshComments }: CommentListProps) {
    const [commentInput, setCommentInput] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentInput(event.target.value);
    };

    const createComment = async () => {
        setErrorMessage(null);
        try {
            console.log(commentInput);
            await createCommentById(postId, commentInput);
            setCommentInput('');
            refreshComments();
        } catch (error) {
            setErrorMessage("Failed to create comment. Please try again.");
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 700, mt: 3, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Comments
            </Typography>
            <List>
                {comments && comments.map(comment => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            refresh={refreshComments}
                            postId={postId}
                        />
                ))}
                {comments && comments.length === 0 && (
                    <Typography variant="body2" color="text.secondary" align="center">
                        No comments yet. Be the first to comment!
                    </Typography>
                )}
            </List>
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    label="Add a Comment"
                    variant="outlined"
                    value={commentInput}
                    onChange={handleCommentChange}
                    multiline
                    rows={3}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                {errorMessage && (
                    <Typography color="error" variant="body2" align="center" sx={{ mb: 1 }}>
                        {errorMessage}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={createComment}
                    fullWidth
                    sx={{ maxWidth: 200 }}
                >
                    Add Comment
                </Button>
            </Box>
        </Box>
    );
}

export default CommentList;
