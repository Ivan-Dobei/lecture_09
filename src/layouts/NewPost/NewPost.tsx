import React, { useState } from 'react';
import {Button, TextField, Typography, Card, CardContent, CardMedia} from '@mui/material';
import { createPost } from "../../api/exhibitActions";
import { ISendPost } from "../../models/IPost";
import {useNavigate} from "react-router-dom";

const NewPost = () => {
    const [post, setPost] = useState<ISendPost>({
        image: null,
        description: '',
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setPost({ ...post, image: file });
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPost({ ...post, description: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage(null);

        const formData = new FormData();
        if (post.image) {
            formData.append('image', post.image);
        }
        formData.append('description', post.description);
        try {
            await createPost(formData);
            navigate('/home');
        } catch (error) {
            setErrorMessage("Failed to create post. Please try again.");
        }
    };

    return (
        <Card sx={{maxWidth: 600, margin: '0 auto', padding: 3, boxShadow: 3, marginTop: '100px'}}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Create New Post
                </Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{backgroundColor: 'white', color: 'black'}}
                    >
                        Upload Image
                        <input type="file" hidden onChange={handleImageChange} />
                    </Button>
                    {post.image && <CardMedia
                        component="img"
                        image={URL.createObjectURL(post.image)}
                    />}
                    <TextField
                        label="Description"
                        variant="outlined"
                        value={post.description}
                        onChange={handleDescriptionChange}
                        multiline
                        rows={4}
                    />
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewPost;
