import { useEffect, useState } from 'react';
import { IPost } from '../models/IPost';
import {fetchMyPosts} from '../api/exhibitActions';

function useMyPosts(refreshing: boolean) {
    const [myPosts, setMyPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await fetchMyPosts();
                setMyPosts(fetchedPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [refreshing]);

    return {myPosts, loading};
}

export default useMyPosts;
