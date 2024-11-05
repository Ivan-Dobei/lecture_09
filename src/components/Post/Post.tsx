import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IPost } from "../../models/IPost";
import axiosInstance from "../../api/axiosInstance";
import { deletePostById } from "../../api/exhibitActions";
import { IComment } from "../../models/IComment";
import { getAllCommentsById } from "../../api/commentActions";
import CommentList from "../CommentList/CommentList";
import useUser from "../../hooks/useUser";

interface PostProps {
    post: IPost;
    refreshList: () => void;
}

function Post({ post, refreshList }: PostProps) {
    const {user} = useUser();
    const isItMyPost = post.user.username === user?.username;
    const [comments, setComments] = useState<IComment[]>([]);
    const [isCommentsVisible, setIsCommentsVisible] = useState(false);

    const deletePost = async () => {
        try {
            await deletePostById(post.id);
            refreshList();
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    const refreshComments = async () => {
        try {
            const fetchedComments = await getAllCommentsById(post.id);
            setComments(fetchedComments);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    };

    const toggleComments = async () => {
        if (!comments.length) {
            await refreshComments();
        }
        setIsCommentsVisible(!isCommentsVisible);
    };

    return (
        <Card sx={{ width: 700, boxShadow: 3, margin: '0 auto' }}>
            <CardMedia
                component="img"
                image={`${axiosInstance.defaults.baseURL}${post.imageUrl}`}
                sx={{ width: '100%', height: 500, objectFit: 'cover' }}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {post.user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {post.description}
                </Typography>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button sx={{mr: 2}} onClick={toggleComments} variant="outlined">
                        {isCommentsVisible ? 'Hide Comments' : 'Show Comments'}
                    </Button>
                    {isItMyPost && (
                        <Button onClick={deletePost} color="error" variant="contained">
                            Delete Post
                        </Button>
                    )}
                </Box>

                {isCommentsVisible && (
                    <CommentList refreshComments={refreshComments} postId={post.id} comments={comments} />
                )}
            </CardContent>
        </Card>
    );
}

export default Post;
