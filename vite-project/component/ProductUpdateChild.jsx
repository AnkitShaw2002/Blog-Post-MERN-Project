import React from "react";

export default function ProductUpdateChild({
  register,
  errors,
  loading,
  isSubmitting,
  handleSubmit,
  onSubmit,
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-12">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 border border-stone-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">
          Update Post
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold">
              Title
            </label>

            <input
              {...register("title")}
              className="w-full border rounded-lg px-4 py-2"
            />

            <p className="text-red-500 text-sm">
              {errors.title?.message}
            </p>
          </div>

          {/* Subtitle */}
          <div>
            <label className="block mb-1 font-semibold">
              Subtitle
            </label>

            <input
              {...register("subtitle")}
              className="w-full border rounded-lg px-4 py-2"
            />

            <p className="text-red-500 text-sm">
              {errors.subtitle?.message}
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1 font-semibold">
              Content
            </label>

            <textarea
              {...register("content")}
              rows={6}
              className="w-full border rounded-lg px-4 py-2"
            />

            <p className="text-red-500 text-sm">
              {errors.content?.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white rounded-lg py-3 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
}