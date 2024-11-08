import React, {useState} from 'react';
import {Box, Button, CircularProgress, List, TextField, Typography} from '@mui/material';
import Comment from '../Comment/Comment';
import {createCommentById, getAllCommentsById} from '../../api/commentActions';
import {useRequest} from 'ahooks';

interface CommentListProps {
    postId: number;
}

function CommentList({ postId }: CommentListProps) {
    const [commentInput, setCommentInput] = useState<string>('');
    const {loading, data: comments, error, refresh} = useRequest(() => getAllCommentsById(postId), {
        refreshDeps: [postId]
    });

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentInput(event.target.value);
    };

    const createComment = async () => {
        try {
            await createCommentById(postId, commentInput);
            setCommentInput('');
            refresh();
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 700, mt: 3, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Comments
            </Typography>

            {loading && (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            )}

            <List>
                {comments && comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} postId={postId} refresh={refresh} />
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
                {error && (
                    <Typography color="error" variant="body2" align="center" sx={{ mb: 1 }}>
                        Something went wrong
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={createComment}
                    fullWidth
                    disabled={loading || !commentInput.trim()}
                    sx={{maxWidth: 200}}
                >
                    Add Comment
                </Button>
            </Box>
        </Box>
    );
}

export default CommentList;
