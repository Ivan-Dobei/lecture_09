import React from 'react';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import {IPost} from "../../models/IPost";
import useFetchImage from "../../hooks/useFetchImage";

interface PostProps {
    post: IPost;
}

function Post({post}: PostProps) {

    const { imageUrl, loading, error } = useFetchImage(post.imageUrl);

    if (loading) {
        return <p>Loading image...</p>;
    }

    return (
        <Card sx={{ width: '50%', boxShadow: 3, margin: '0 auto'}}>
            <CardMedia
                component="img"
                height="140"
                image={imageUrl}
                alt={post.description}
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
            </CardContent>
        </Card>
    );
}

export default Post;