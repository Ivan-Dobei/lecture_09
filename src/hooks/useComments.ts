import {useEffect, useState} from 'react';
import {getAllCommentsById} from "../api/commentActions";
import {IComment} from "../models/IComment";

function useComments(id: number) {
    const [comments, setComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const fetchedPosts = await getAllCommentsById(id);
                setComments(fetchedPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, []);

    return {comments, loading};
}

export default useComments;
