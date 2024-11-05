import React, {useState} from 'react';
import usePosts from '../../hooks/usePosts';
import PostList from '../../components/PostList/PostList';

function StripePage() {
    const [refreshList, setRefreshList] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { posts, paginationData, loading } = usePosts(refreshList, currentPage);

    const refreshing = () => {
        setRefreshList(!refreshList);
    };

    return (
        <PostList
            posts={posts}
            loading={loading}
            paginationData={paginationData}
            refreshPosts={refreshing}
            isMyPosts={false}
            currentPage={currentPage}
            setPage={setCurrentPage}
        />
    );
}

export default StripePage;
