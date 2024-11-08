import React from 'react';
import PostList from '../../components/PostList/PostList';
import {useRequest} from 'ahooks';
import {fetchAllPosts} from '../../api/exhibitActions';
import {IPostData} from '../../models/IPost';
import {useSearchParams} from 'react-router-dom';

function StripePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');

    const {loading, data, error} = useRequest<IPostData, [number]>(
        () => fetchAllPosts(currentPage),
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
            isMyPosts={false}
            onPageChange={handlePageChange}
        />
    );
}

export default StripePage;
