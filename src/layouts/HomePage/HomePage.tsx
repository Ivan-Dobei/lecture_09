import React from 'react';
import PostList from '../../components/PostList/PostList';
import {useSearchParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {IPostData} from "../../models/IPost";
import {fetchMyPosts} from "../../api/exhibitActions";

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');

    const { loading, data, error, refresh} = useRequest<IPostData, [number]>(
        () => fetchMyPosts(currentPage),
        { refreshDeps: [currentPage] }
    );

    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
    };

    if (error) {
        return <p>Error loading posts.</p>;
    }

    return (
        <PostList
            posts={data?.data || []}
            loading={loading}
            currentPage={currentPage}
            lastPage={data?.lastPage || 1}
            isMyPosts={true}
            onPageChange={handlePageChange}
        />
    );
}

export default HomePage;
