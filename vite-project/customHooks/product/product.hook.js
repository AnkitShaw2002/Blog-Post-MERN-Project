import { useState, useCallback } from "react";
import axiosInstance from "../../api/axios/axiosInstance";
import { EndPoints } from "../../api/endpoints/endpoints";
import { toast } from "sonner";

const getErrorMessage = (error) =>
    error.response?.data?.message ||
    error.message ||
    "Something went wrong";

// 1. Fetch all posts for the logged-in user
export const usePostList = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data: postData } = await axiosInstance.get(EndPoints.product.productList);
            return postData;
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
            // toast.error(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchPosts,
        loading,
        error
    };
};

// 2. Create a new post
export const useAddPost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const createPost = useCallback(async (postData) => {
        setLoading(true);
        setError(null);
        try {
            const { data: newPost } = await axiosInstance.post(EndPoints.product.productAdd, postData);
            if (newPost.status) {
                toast.success(newPost.message);
            } else {
                toast.error(newPost.message);
            }
            return newPost;
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
            toast.error(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        createPost,
        loading,
        error
    };
};

// 3. Update an existing post by ID
export const useUpdatePost = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const updatePost = useCallback(async (id, updateData) => {
        setLoading(true);
        setError(null);
        try {
            // Replaces the dynamic ':id' segment inside your endpoint string
            const endpoint = EndPoints.product.updatePost.replace(":id", id);
            const { data: editData } = await axiosInstance.put(endpoint, updateData);
            if (editData.status) {
                toast.success(editData.message);
            } else {
                toast.error(editData.message);
            }
            return editData;
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
            toast.error(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        updatePost,
        loading,
        error
    };
};

// 4. Get a single post details by ID
export const useGetSinglePost = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPost = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const endpoint = EndPoints.product.getPostById.replace(":id", id);
            const { data: singlePost } = await axiosInstance.get(endpoint);
            // if (singlePost.status) {
            //     toast.success(singlePost.message);
            // } else {
            //     toast.error(singlePost.message);
            // }
            return singlePost;
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
            toast.error(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchPost,
        loading,
        error
    };
};

// 5. Delete a post by ID
export const useDeletePost = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const deletePost = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const endpoint = EndPoints.product.deletePost.replace(":id", id);
            const { data: deletePost } = await axiosInstance.delete(endpoint);
            if (deletePost.status) {
                toast.success(deletePost.message);
            } else {
                toast.error(deletePost.message);
            }
            return deletePost;
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
            toast.error(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        deletePost,
        loading,
        error
    };
};