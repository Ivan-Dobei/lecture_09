import React from 'react';
import {Box, Typography, CircularProgress} from '@mui/material';
import Post from '../../components/Post/Post';
import Pagination from '../../components/Pagination/Pagination';
import {IPost} from '../../models/IPost';
import {Link} from "react-router-dom";

interface PostListProps {
    posts: IPost[];
    loading: boolean;
    currentPage: number;
    lastPage: number;
    isMyPosts: boolean;
    onPageChange: (page: number) => void;
}

const PostList: React.FC<PostListProps> = (props) => {

    const {
        posts,
        loading,
        currentPage,
        lastPage,
        isMyPosts,
        onPageChange,
    } = props;

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                {isMyPosts ? 'My Posts' : 'Posts'}
            </Typography>

            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                {posts.length === 0 ? (
                    <Typography>
                        {isMyPosts && (
                            <>You don't have any posts. <Link to="/newPost">Create your first post</Link></>
                        )}
                    </Typography>
                ) : (
                    posts.map((post) => (
                        <Box key={post.id}>
                            <Post post={post}/>
                        </Box>
                    ))
                )}
            </Box>

            {posts.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={onPageChange}
                />
            )}
        </Box>
    );
};

export default PostList;
