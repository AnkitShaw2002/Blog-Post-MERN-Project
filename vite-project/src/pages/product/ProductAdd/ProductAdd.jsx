import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAddPost } from "../../../../customHooks/product/product.hook";
import { productAddSchema } from "../../../../validator/productValidator/productValidator";
import { EndPoints } from "../../../../api/endPoints/endPoints";
import axiosInstance from "../../../../api/axios/axiosInstance";
import ProductAddChild from "../../../../component/ProductAddChild";
import Header from "../../../../component/layout/Header";
import Footer from "../../../../component/layout/Footer";

export default function ProductAdd() {
  const navigate = useNavigate();

  const { createPost, loading, error } = useAddPost();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(productAddSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      content: ""
    }
  });

  const onSubmit = useCallback(
    async (data) => {
      const response = await createPost({
        title: data.title.trim(),
        subtitle: data.subtitle.trim(),
        content: data.content.trim(),
      });

      if (response?.status) {
        // toast.success(response.message);
        navigate("/product/product-list");
      }
    },
    [createPost, navigate]
  );

  return (

    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#1f2430]">
      {/* Persistent Navigation Header */}
      <div className="relative z-30 w-full">
        <Header />
      </div>

    <ProductAddChild
      register={register}
      errors={errors}
      isSubmitting={isSubmitting || loading}
      handleSubmit={handleSubmit(onSubmit)}
    />

     <div className="relative z-30 w-full">
        <Footer />
      </div>
    </div>
  );
}