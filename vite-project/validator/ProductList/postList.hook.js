import { useState, useCallback } from "react";

export const allPost = () => {
  const [posts, setPosts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Populate or refresh the listing collection state
  const setFetchedPosts = useCallback((items) => {
    setPosts(Array.isArray(items) ? items : []);
  }, []);



  const clearListState = useCallback(() => {
    setPosts([]);
  }, []);

  return {
    posts,
    setPosts,
    setFetchedPosts,
    filteredItems, setFilteredItems,
    clearListState,
  };
};