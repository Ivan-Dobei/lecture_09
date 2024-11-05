import {useEffect, useState} from 'react';
import {IPost, IPostDataPagination} from '../models/IPost';
import {fetchMyPosts} from '../api/exhibitActions';

function usePosts(refreshing: boolean, page: number) {
    const [myPosts, setMyPosts] = useState<IPost[]>([]);
    const [paginationData, setPaginationData] = useState<IPostDataPagination>({
        lastPage: 0,
        page: "1",
        total: 0,
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const fetchedPosts = await fetchMyPosts(page, 10);
                setMyPosts(fetchedPosts.data);
                setPaginationData({
                    total: fetchedPosts.total,
                    page: fetchedPosts.page,
                    lastPage: fetchedPosts.lastPage,
                });
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [refreshing, page]);

    return {myPosts, paginationData, loading};
}

export default usePosts;
