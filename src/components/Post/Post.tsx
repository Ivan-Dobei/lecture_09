import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IPost } from "../../models/IPost";
import axiosInstance from "../../api/axiosInstance";
import { useAppSelector } from "../../hooks/redux";
import { deletePostById } from "../../api/exhibitActions";
import { IComment } from "../../models/IComment";
import Comment from "../Comment/Comment";
import { getAllCommentsById } from "../../api/commentActions";

interface PostProps {
    post: IPost;
    refreshList: () => void;
}

function Post({ post, refreshList }: PostProps) {
    const { userData } = useAppSelector(state => state.user);
    const isItMyPost = post.user.username === userData?.username;
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

    const toggleComments = async () => {
        if (!comments.length) {
            try {
                const fetchedComments = await getAllCommentsById(post.id);
                setComments(fetchedComments);
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            }
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
                <Typography variant="caption" color="text.secondary">
                    {post.commentCount} comments
                </Typography>
                <Box mt={2}>
                    {isItMyPost && (
                        <Button onClick={deletePost} color="error" variant="contained" sx={{ mr: 2 }}>
                            Delete Post
                        </Button>
                    )}
                    {post.commentCount > 0 && (
                        <Button onClick={toggleComments} variant="outlined">
                            {isCommentsVisible ? 'Hide Comments' : 'Show Comments'}
                        </Button>
                    )}
                </Box>

                {isCommentsVisible && comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </CardContent>
        </Card>
    );
}

export default Post;
