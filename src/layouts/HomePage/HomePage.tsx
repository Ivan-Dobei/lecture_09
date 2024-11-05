import React, {useState} from 'react';
import useMyPost from '../../hooks/useMyPost';
import PostList from '../../components/PostList/PostList';

function HomePage() {
    const [refreshList, setRefreshList] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { myPosts, loading, paginationData } = useMyPost(refreshList, currentPage);

    const refreshing = () => {
        setRefreshList(!refreshList);
    };

    return (
        <PostList
            posts={myPosts}
            loading={loading}
            paginationData={paginationData}
            refreshPosts={refreshing}
            isMyPosts={true}
            currentPage={currentPage}
            setPage={setCurrentPage}
        />
    );
}

export default HomePage;
