import React, { useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  useGetSinglePost,
  useUpdatePost,
} from "../../../../customHooks/product/product.hook";

import { productAddSchema } from "../../../../validator/productValidator/productValidator";
import ProductUpdateChild from "../../../../component/ProductUpdateChild";
import Header from "../../../../component/layout/Header";
import Footer from "../../../../component/layout/Footer";

export default function ProductUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { fetchPost, loading } = useGetSinglePost();
  const { updatePost } = useUpdatePost();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productAddSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
    },
  });

  // Fetch existing post
  useEffect(() => {
    const loadPost = async () => {
      const response = await fetchPost(id);

      if (response?.status) {
        reset({
          title: response.data.title,
          subtitle: response.data.subtitle,
          content: response.data.content,
        });
      }
    };

    loadPost();
  }, [id, fetchPost, reset]);

  const onSubmit = useCallback(
    async (data) => {
      const response = await updatePost(id, {
        title: data.title.trim(),
        subtitle: data.subtitle.trim(),
        content: data.content.trim(),
      });

      if (response?.status) {
        navigate("/product/product-list");
      }
    },
    [id, updatePost, navigate]
  );

  return (
    <>
      <div className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#1f2430]">
        {/* Persistent Navigation Header */}
        <div className="relative z-30 w-full">
          <Header />
        </div>

        <ProductUpdateChild
          register={register}
          errors={errors}
          loading={loading}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}


        />
        {/* Persistent Footer Component */}
        <div className="relative z-30 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}