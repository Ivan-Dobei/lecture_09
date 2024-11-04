import { useEffect, useState } from 'react';
import { IPost } from '../models/IPost';
import { fetchAllPosts } from '../api/exhibitActions';

function usePosts(refreshing: boolean) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await fetchAllPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [refreshing]);

    return {posts, loading};
}

export default usePosts;
