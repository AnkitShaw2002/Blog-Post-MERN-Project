import { useState, useCallback } from "react";

export const allPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null); // Useful for updates/view details
  
  


  // Optimistically inject/update modifications to an array value item locally
  const updatePostInState = useCallback((updatedItem) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post._id === updatedItem._id ? updatedItem : post))
    );
  }, []);

  const clearListState = useCallback(() => {
    setPosts([]);
    setSelectedPostId(null);
  }, []);

  return {
    posts,
   
    setPosts,
    selectedPostId,
    setSelectedPostId,
    updatePostInState,
    clearListState,
  };
};