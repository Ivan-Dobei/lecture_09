import React, {useState} from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {IPost} from "../../models/IPost";
import axiosInstance from "../../api/axiosInstance";
import {deletePostById} from "../../api/exhibitActions";
import CommentList from "../CommentList/CommentList";
import {useAppSelector} from "../../hooks/redux";
import {useRequest} from "ahooks";
import {useNavigate} from "react-router-dom";

interface PostProps {
    post: IPost;
}

function Post({post}: PostProps) {
    const navigate = useNavigate();
    const {userData} = useAppSelector(state => state.user);
    const isItMyPost = post.user.username === userData?.username;
    const [isCommentsVisible, setIsCommentsVisible] = useState(false);

    const {run: deletePost} = useRequest((id) => deletePostById(id), {
        manual: true,
        onSuccess: () => navigate(0),
    })

    const handleDelete = async () => {
        deletePost(post.id)
    };

    const toggleComments = async () => {
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
                        <Button onClick={handleDelete} color="error" variant="contained">
                            Delete Post
                        </Button>
                    )}
                </Box>

                {isCommentsVisible && (
                    <CommentList postId={post.id} />
                )}
            </CardContent>
        </Card>
    );
}

export default Post;
