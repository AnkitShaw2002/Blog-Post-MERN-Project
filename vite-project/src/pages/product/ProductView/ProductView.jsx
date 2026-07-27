import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglePost } from "../../../../customHooks/product/product.hook";

export default function ProductView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { fetchPost, loading } = useGetSinglePost();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const response = await fetchPost(id);

      if (response?.status) {
        setPost(response.data);
      }
    };

    getPost();
  }, [id, fetchPost]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-red-600 text-xl font-semibold">
          Post not found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            View Post
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back
          </button>
        </div>

        <div className="space-y-6">

          <div>
            <h3 className="text-sm text-gray-500 uppercase">
              Title
            </h3>

            <p className="text-2xl font-bold text-slate-800">
              {post.title}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 uppercase">
              Subtitle
            </h3>

            <p className="text-lg text-indigo-600 font-semibold">
              {post.subtitle}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 uppercase">
              Content
            </h3>

            <p className="mt-2 text-slate-700 leading-8 whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          <hr />

          <div className="grid md:grid-cols-2 gap-5 text-sm">

            <div>
              <span className="font-semibold">Created At :</span>
              <br />
              {post.createdAt
                ? new Date(post.createdAt).toLocaleString()
                : "-"}
            </div>

            <div>
              <span className="font-semibold">Updated At :</span>
              <br />
              {post.updatedAt
                ? new Date(post.updatedAt).toLocaleString()
                : "-"}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}