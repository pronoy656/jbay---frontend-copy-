/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import Header from "@/components/common/Header/Header";
import FillButton from "@/components/common/Button/FillButton";
import { useState, useEffect } from "react";

interface ProductForm {
  productName: string;
  category: string;
  brand: string;
  chassisNumber: string;
  price: number;
  condition: string;
  description: string;
  mainImage: FileList;
  subImages: FileList;
}

const MAX_SUB_IMAGES = 5;

export default function UploadProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<ProductForm>();

  // Preview state
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [subPreviews, setSubPreviews] = useState<{ url: string; file: File }[]>(
    []
  );

  // Watch file inputs
  const mainFileList = watch("mainImage");
  const subFileList = watch("subImages");

  // Update main image preview
  useEffect(() => {
    if (mainFileList?.[0]) {
      const file = mainFileList[0];
      const url = URL.createObjectURL(file);
      setMainPreview(url);
    } else {
      setMainPreview(null);
    }
  }, [mainFileList]);

  // Update sub images preview + enforce limit
  useEffect(() => {
    const previews: { url: string; file: File }[] = [];
    if (subFileList?.length) {
      const files = Array.from(subFileList).slice(0, MAX_SUB_IMAGES);
      files.forEach((file) => {
        previews.push({ url: URL.createObjectURL(file), file });
      });

      // Show error if user selected more than 5
      if (subFileList.length > MAX_SUB_IMAGES) {
        setError("subImages", {
          type: "manual",
          message: `You can upload a maximum of ${MAX_SUB_IMAGES} sub-images.`,
        });
      } else {
        clearErrors("subImages");
      }
    } else {
      clearErrors("subImages");
    }
    setSubPreviews(previews);
  }, [subFileList, setError, clearErrors]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (mainPreview) URL.revokeObjectURL(mainPreview);
      subPreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [mainPreview, subPreviews]);

  // Remove main image
  const removeMainImage = () => {
    setValue("mainImage", null as any, { shouldValidate: true });
    setMainPreview(null);
  };

  // Remove one sub image
  const removeSubImage = (index: number) => {
    const newFiles = Array.from(subFileList || []).filter(
      (_, i) => i !== index
    );
    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));
    setValue("subImages", dataTransfer.files, { shouldValidate: true });
  };

  const onSubmit = (data: ProductForm) => {
    console.log("Form Data:", data);
    reset();
    setMainPreview(null);
    setSubPreviews([]);
  };

  return (
    <div className="bg-gradient-to-br from-[#f0f0f0]/12 to-[#e0e0e0]/2 backdrop-blur-sm shadow-lg rounded-2xl p-10 my-20 ">
      <Header heading="Edit Your Product" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Product Name"
            {...register("productName", {
              required: "Product name is required",
            })}
            className="w-full bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          {errors.productName && (
            <p className="text-red-400 text-sm mt-1">
              {errors.productName.message}
            </p>
          )}
        </div>

        {/* Category and Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="">Select Product Category</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Truck">Truck</option>
            </select>
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Brand"
              {...register("brand", { required: "Brand is required" })}
              className="w-full bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            {errors.brand && (
              <p className="text-red-400 text-sm mt-1">
                {errors.brand.message}
              </p>
            )}
          </div>
        </div>

        {/* Chassis Number */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Chassis Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Chassis Number"
            {...register("chassisNumber", {
              required: "Chassis number is required",
            })}
            className="w-full bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          {errors.chassisNumber && (
            <p className="text-red-400 text-sm mt-1">
              {errors.chassisNumber.message}
            </p>
          )}
        </div>

        {/* Price & Condition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-2">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter Price"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              className="w-full bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            {errors.price && (
              <p className="text-red-400 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Product Condition <span className="text-red-500">*</span>
            </label>
            <select
              {...register("condition", { required: "Condition is required" })}
              className="w-full bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="">Select Product Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
            </select>
            {errors.condition && (
              <p className="text-red-400 text-sm mt-1">
                {errors.condition.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter product description"
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className="w-full bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Main Picture Upload */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Main Picture Upload <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="mainImage"
              className={`
                relative flex flex-col items-center justify-center w-full h-64
                border-2 border-dashed rounded-lg cursor-pointer
                ${mainPreview ? "border-transparent" : "border-gray-600"}
                bg-gray-50 hover:bg-gray-100
                dark:bg-gray-700 dark:hover:bg-gray-600
                dark:border-gray-500 dark:hover:border-gray-400
              `}
            >
              {mainPreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={mainPreview}
                    alt="Main preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removeMainImage();
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-700 transition text-sm font-bold"
                    title="Remove image"
                  >
                    X
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}

              <input
                id="mainImage"
                type="file"
                accept="image/*"
                {...register("mainImage", {
                  required: "Main image is required",
                  validate: (files) =>
                    !files || files.length === 1 || "Select exactly one image",
                })}
                className="hidden"
              />
            </label>
          </div>

          {errors.mainImage && (
            <p className="text-red-400 text-sm mt-1">
              {errors.mainImage.message}
            </p>
          )}
        </div>

        {/* Sub Pictures Upload - MAX 5 */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Sub Picture Upload{" "}
            <span className="text-gray-400 text-sm">(Max 5)</span>
          </label>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="subImages"
              className={`
                relative flex flex-col items-center justify-center w-full h-64
                border-2 border-dashed rounded-lg cursor-pointer
                ${subPreviews.length ? "border-transparent" : "border-gray-600"}
                bg-gray-50 hover:bg-gray-100
                dark:bg-gray-700 dark:hover:bg-gray-600
                dark:border-gray-500 dark:hover:border-gray-400
                ${
                  subPreviews.length >= MAX_SUB_IMAGES
                    ? "cursor-not-allowed opacity-75"
                    : ""
                }
              `}
            >
              {subPreviews.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 p-2 w-full h-full overflow-y-auto">
                  {subPreviews.map(({ url }, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`Sub ${idx + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          removeSubImage(idx);
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition opacity-0 group-hover:opacity-100"
                        title="Remove image"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Up to 5 images (SVG, PNG, JPG, GIF)
                  </p>
                </div>
              )}

              <input
                id="subImages"
                type="file"
                accept="image/*"
                multiple
                {...register("subImages", {
                  validate: (files) => {
                    if (files && files.length > MAX_SUB_IMAGES) {
                      return `Maximum ${MAX_SUB_IMAGES} images allowed`;
                    }
                    return true;
                  },
                })}
                className="hidden"
                disabled={subPreviews.length >= MAX_SUB_IMAGES}
              />
            </label>
          </div>

          {/* Show error if too many images */}
          {errors.subImages && (
            <p className="text-red-400 text-sm mt-1">
              {errors.subImages.message}
            </p>
          )}

          {/* Show count */}
          <p className="text-xs text-gray-400 mt-1">
            {subPreviews.length} / {MAX_SUB_IMAGES} images uploaded
          </p>
        </div>

        {/* Submit Button */}
        <FillButton className="w-full mt-5" type="submit">
          Upload Product
        </FillButton>
      </form>
    </div>
  );
}
