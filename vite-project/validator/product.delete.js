
import { useState, useCallback } from "react";

export const deletePostUser = () => {
    const [posts, setPosts] = useState([]);
    const [deleteTargetId, setDeleteTargetId] = useState(null); // Tracking targets for modal windows

    // Optimistically remove an item locally upon successful delete responses
    const removePostFromState = useCallback((id) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        if (deleteTargetId === id) setDeleteTargetId(null);
    }, [deleteTargetId]);


    const clearListState = useCallback(() => {
        setPosts([]);
        setDeleteTargetId(null);
    }, []);

    return {
        posts,
        deleteTargetId,
        setDeleteTargetId,
        removePostFromState,
        clearListState,
    };
};