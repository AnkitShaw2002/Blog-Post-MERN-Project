
import { useState, useCallback } from "react";

export const getProfileDataUser = () => {
    const [userProfile, setUserProfile] = useState(
        {
            name: "Tin",
            email: "tin@yopmail.com",
            address: "hi",
        }
    );

    // const setFetchedPosts = useCallback((items) => {
    //     setPosts(Array.isArray(items) ? items : []);
    //   }, []);

    const fetchUserProfile = useCallback((data) => {
        setUserProfile(items ? items : {});
    }, []);

    // const clearListState = useCallback(() => {
    //     setPosts([]);
    // }, []);

    return {
        userProfile, setUserProfile, fetchUserProfile
    };
};