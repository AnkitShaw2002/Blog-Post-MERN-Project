import React, { useState } from "react";
import ReactPaginate from "react-paginate";
const Paginate = ReactPaginate.default || ReactPaginate;

export function ProductListChild({
  posts = [],
  userProfile,
  onDeletePost,
  onEditPost,
  onCreateClick,
  onViewPost,
  filteredItems = [],
  setFilteredItems,
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const IMAGE_BASE_URL = "http://localhost:4000";


    // ADD THESE: Pagination state and logic
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 2; // Change this to whatever limit you want

  // Calculate the slice of items to show on the current page
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // const handleSearchChange = (e) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);

  //   if (!value.trim()) {
  //     setFilteredItems(posts);
  //     return;
  //   }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // ADD THIS: Reset to page 1 on every new search
    setCurrentPage(0); 

    if (!value.trim()) {
      setFilteredItems(posts);
      return;
    }

    const filtered = posts.filter((post) => {
      const keyword = value.toLowerCase();

      return (
        post.title?.toLowerCase().includes(keyword) ||
        post.subtitle?.toLowerCase().includes(keyword) ||
        post.content?.toLowerCase().includes(keyword)
      );
    });

    setFilteredItems(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* ================= Navbar ================= */}
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <h1 className="text-2xl font-bold text-indigo-600">
            User Dashboard
          </h1>

          <div className="flex items-center gap-4">

            <button
              onClick={onCreateClick}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              + Create Post
            </button>

            <div className="relative">

              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-indigo-100 border border-slate-200"
              >
                {userProfile?.imagePath ? (
                  <img
                    src={`${IMAGE_BASE_URL}${userProfile.imagePath}`}
                    alt={userProfile?.name || "Profile"}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="font-bold text-indigo-700">
                    {userProfile?.name
                      ? userProfile.name.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-72 rounded-xl bg-white shadow-xl border p-5">

                  <div className="text-center border-b pb-4">

                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-indigo-600 text-2xl font-bold text-white">
                      {userProfile?.imagePath ? (
                        <img
                          src={`http://localhost:4000${userProfile.imagePath}`}
                          alt={userProfile?.name || "Profile"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>
                          {userProfile?.name
                            ? userProfile.name.charAt(0).toUpperCase()
                            : "U"}
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold">
                      {userProfile?.name || "User"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {userProfile?.email}
                    </p>

                  </div>

                  <div className="mt-4 space-y-2 text-sm">

                    <div className="flex justify-between">
                      <span>Location</span>
                      <span>{userProfile?.address}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Total Posts</span>
                      <span>{posts.length}</span>
                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      </nav>

      {/* ================= Main ================= */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Heading + Search */}

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              Your Posts
            </h2>

            <p className="text-gray-500">
              Manage all your published posts
            </p>
          </div>

          {/* Search */}

          <div className="relative w-full md:w-96">

            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search title, subtitle or content..."
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
              />
            </svg>

          </div>

        </div>

        {/* Empty State */}

        {posts.length === 0 ? (

          <div className="rounded-xl bg-white p-12 text-center shadow">

            <h3 className="text-xl font-semibold">
              No Posts Found
            </h3>

            <p className="mt-2 text-gray-500">
              Create your first post to get started.
            </p>

          </div>

        ) : filteredItems.length === 0 ? (

          <div className="rounded-xl bg-white p-12 text-center shadow">

            <h3 className="text-lg font-semibold">
              No matching posts found.
            </h3>

          </div>

        ) : (

          <div className="overflow-x-auto rounded-xl bg-white shadow">

            <table className="min-w-full">

              <thead className="bg-indigo-600 text-white">

                <tr>

                  <th className="px-6 py-4 text-left">
                    #
                  </th>

                  <th className="px-6 py-4 text-left">
                    Title
                  </th>

                  <th className="px-6 py-4 text-left">
                    Subtitle
                  </th>

                  <th className="px-6 py-4 text-left">
                    Content
                  </th>

                  <th className="px-6 py-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentItems.map((post, index) => (

                  <tr
                    key={post._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {post.title}
                    </td>

                    <td className="px-6 py-4">
                      {post.subtitle}
                    </td>

                    <td className="px-6 py-4 max-w-sm">
                      <p className="line-clamp-2">
                        {post.content}
                      </p>
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => onViewPost(post)}
                          className="rounded bg-sky-500 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-600"
                        >
                          View
                        </button>

                        <button
                          onClick={() => onEditPost(post)}
                          className="rounded bg-yellow-500 px-3 py-2 text-xs font-semibold text-white hover:bg-yellow-600"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => onDeletePost(post._id)}
                          className="rounded bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>




        )}

{/* ADD THIS: Pagination Controls */}
          {pageCount > 1 && (
            <div className="mt-6 flex justify-end">
              <Paginate
                previousLabel={"← Prev"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                forcePage={currentPage}
                containerClassName={"flex items-center gap-1 text-sm"}
                pageClassName={"rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700"}
                pageLinkClassName={"flex items-center justify-center px-3 py-1.5 w-full h-full"}
                activeClassName={"!bg-indigo-600 !border-indigo-600 text-white hover:bg-indigo-700"}
                activeLinkClassName={"text-white"}
                previousClassName={"rounded-md border border-gray-300 hover:bg-gray-50 font-medium"}
                previousLinkClassName={"flex items-center justify-center px-3 py-1.5"}
                nextClassName={"rounded-md border border-gray-300 hover:bg-gray-50 font-medium"}
                nextLinkClassName={"flex items-center justify-center px-3 py-1.5"}
                disabledClassName={"opacity-40 cursor-not-allowed hover:bg-transparent"}
              />
            </div>
          )}
      </main>

    </div>
    


    
  );
}