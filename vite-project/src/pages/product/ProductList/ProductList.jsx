import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { allPost } from "../../../../validator/ProductList/postList.hook";
import { usePostList, useUpdatePost, useGetSinglePost, useDeletePost } from "../../../../customHooks/product/product.hook";
import { useUserProfile } from "../../../../customHooks/auth/auth.hook"
import { ProductListChild } from "../../../../component/ProductListChild";
import Header from "../../../../component/layout/Header";
import Footer from "../../../../component/layout/Footer";
import { deletePostUser } from "../../../../validator/product.delete";
import { getProfileDataUser } from "../../../../validator/userProfileGet/userProfileGet"
import { SkeletonTheme } from "react-loading-skeleton";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

export default function ProductList() {

  const navigate = useNavigate();

  const { posts, setPosts, setFetchedPosts, clearListState, filteredItems, setFilteredItems, } = allPost();

  const { fetchPosts, loading, error } = usePostList();
  const initialFetch = useRef(true);

  const { profileDetails,
    // loading, error 
  } = useUserProfile();



  const {
    // posts,
    setDeleteTargetId,
    removePostFromState,
  } = deletePostUser();

  const { deletePost: deletePostApi,
    // loading, error 
  } = useDeletePost();



  const { userProfile, setUserProfile, fetchUserProfile } = getProfileDataUser();


  // const [userProfile, setUserProfile] = useState({
  //   name: "Tin",
  //   email: "tin@yopmail.com",
  //   address: "hi",
  // });

  useEffect(() => {
    const fetchProfileContent = async () => {
      try {
        const response = await profileDetails();
        if (response && response.status) {
          setUserProfile(response.data);
        }
      } catch (err) {
        console.error("Failed executing post synchronization:", err);
      }
    };
    fetchProfileContent();
  }, [fetchUserProfile, setUserProfile]);

  // Fetch all user posts on component mount
  useEffect(() => {
    const fetchDashboardContent = async () => {
      try {
        const response = await fetchPosts();
        if (response && response.status) {
          setFetchedPosts(response.data);
          // if (initialFetch.current) {
          //   toast.success(response.message || "Posts loaded successfully.");
          //   initialFetch.current = false;
          // }
        }
      } catch (err) {
        console.error("Failed executing post synchronization:", err);
      }
    };
    fetchDashboardContent();
  }, [fetchPosts, setFetchedPosts]);

  // Keep filteredItems in sync with master posts state changes
  useEffect(() => {
    setFilteredItems(posts);
  }, [posts]);





  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to remove this post?")) {
  //     try {
  //       const response = await deletePostApi(id);
  //       if (response && response.status) {
  //         removePostFromState(id);
  //       }
  //     } catch (err) {
  //       console.error("Delete operation failure context:", err);
  //     }
  //   }
  // };


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this post?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setDeleteTargetId(id);

    const response = await deletePostApi(id);

    if (response?.status) {
      // removePostFromState(id);
      await fetchPosts().then((res) => {
        if (res?.status) {
          setFetchedPosts(res.data);
        }
      });

      Swal.fire({
        title: "Deleted!",
        text: response.message,
        icon: "success",
      });
    }
  };



  const handleViewClick = (post) => {
    navigate(`/product/product-view/${post._id}`);
  };

  const handleEditClick = (post) => {
    navigate(`/product/product-update/${post._id}`);
  };

  const handleCreateRedirect = () => {
    navigate("/product/product-add");
  };

  const handleUpdatePassword = () => {
    navigate('/product/update-password');
  };



  // if (loading && posts.length === 0) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-slate-50">
  //       <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#1f2430]">
      {/* Persistent Navigation Header */}
      <div className="relative z-30 w-full">
        <Header />
      </div>

      <SkeletonTheme baseColor="#948484" highlightColor="#5ec02a">

        <ProductListChild
          posts={posts}
          loading={loading}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          userProfile={userProfile}
          onDeletePost={handleDelete}
          onEditPost={handleEditClick}
          onViewPost={handleViewClick}
          onCreateClick={handleCreateRedirect}
          handleUpdatePassword={handleUpdatePassword}

        />
      </SkeletonTheme>

      {/* Persistent Footer Component */}
      <div className="relative z-30 w-full">
        <Footer />
      </div>
    </div>
  );
}