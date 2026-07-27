import React from "react";

export default function ProductAddChild({
  register,
  errors,
  isSubmitting,
  handleSubmit
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-12">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 border border-stone-200 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">Create New Post</h2>
          <p className="text-xs text-stone-500 mt-1">Publish a fresh story or article update to your feed.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Field */}
          <div>
            <label className="block text-xs font-semibold uppercase text-stone-500 tracking-wider mb-1.5">
              Post Title
            </label>
            <input
              {...register("title")}
              placeholder="Enter article title..."
              className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm outline-none focus:border-stone-400 focus:bg-white transition"
            />
            {errors.title && (
              <span className="block text-xs font-medium text-red-500 mt-1">{errors.title.message}</span>
            )}
          </div>

          {/* Subtitle Field */}
          <div>
            <label className="block text-xs font-semibold uppercase text-stone-500 tracking-wider mb-1.5">
              Tagline / Subtitle
            </label>
            <input
              {...register("subtitle")}
              placeholder="Enter short summary subtitle..."
              className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm outline-none focus:border-stone-400 focus:bg-white transition"
            />
            {errors.subtitle && (
              <span className="block text-xs font-medium text-red-500 mt-1">{errors.subtitle.message}</span>
            )}
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-xs font-semibold uppercase text-stone-500 tracking-wider mb-1.5">
              Body Copy
            </label>
            <textarea
              {...register("content")}
              placeholder="Write your main body content details here..."
              rows="6"
              className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm outline-none focus:border-stone-400 focus:bg-white resize-none transition"
            />
            {errors.content && (
              <span className="block text-xs font-medium text-red-500 mt-1">{errors.content.message}</span>
            )}
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-lg bg-stone-900 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Publish Article Entry"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}