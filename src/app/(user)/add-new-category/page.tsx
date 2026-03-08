"use client";

import { useForm } from "react-hook-form";
import Header from "@/components/common/Header/Header";
import FillButton from "@/components/common/Button/FillButton";

interface CategoryForm {
  categoryName: string;
  reason: string;
}

export default function AddCategoryPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryForm>();

  const onSubmit = (data: CategoryForm) => {
    console.log("Form Data:", data);
    // Example: POST to API
    // await fetch("/api/category", { method: "POST", body: JSON.stringify(data) });
    reset();
  };

  return (
    <div className="bg-gradient-to-br from-[#f0f0f0]/12 to-[#e0e0e0]/2 backdrop-blur-sm shadow-lg rounded-2xl p-10 my-20 mx-auto ">
      <Header heading="Add New Category" />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {/* Category Name */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter New Category Name"
            {...register("categoryName", {
              required: "Category name is required",
            })}
            className="w-full bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
          />
          {errors.categoryName && (
            <p className="text-red-400 text-sm mt-1">
              {errors.categoryName.message}
            </p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter reason why you want to add this new category"
            {...register("reason", {
              required: "Reason is required",
            })}
            rows={5}
            className="w-full bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition resize-none"
          />
          {errors.reason && (
            <p className="text-red-400 text-sm mt-1">{errors.reason.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <FillButton className="w-full mt-6" size="lg" type="submit">
          Submit Request
        </FillButton>
      </form>
    </div>
  );
}
