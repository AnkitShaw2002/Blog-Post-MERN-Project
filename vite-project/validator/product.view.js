import { useState, useCallback } from "react";

export const allPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null); // Useful for updates/view details
  const [deleteTargetId, setDeleteTargetId] = useState(null); // Tracking targets for modal windows

  // Populate or refresh the listing collection state
  const setFetchedPosts = useCallback((items) => {
    setPosts(Array.isArray(items) ? items : []);
  }, []);

  // Optimistically remove an item locally upon successful delete responses
  const removePostFromState = useCallback((id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    if (deleteTargetId === id) setDeleteTargetId(null);
  }, [deleteTargetId]);

  // Optimistically inject/update modifications to an array value item locally
  const updatePostInState = useCallback((updatedItem) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post._id === updatedItem._id ? updatedItem : post))
    );
  }, []);

  const clearListState = useCallback(() => {
    setPosts([]);
    setSelectedPostId(null);
    setDeleteTargetId(null);
  }, []);

  return {
    posts,
    setFetchedPosts,
    selectedPostId,
    setSelectedPostId,
    deleteTargetId,
    setDeleteTargetId,
    removePostFromState,
    updatePostInState,
    clearListState,
  };
};