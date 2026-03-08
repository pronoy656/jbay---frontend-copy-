/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Camera, X } from "lucide-react";
import FillButton from "@/components/common/Button/FillButton";
import BorderButton from "@/components/common/Button/BorderButton";

type Tab = "Basic Information" | "Contact" | "Password";

interface BasicInfo {
  firstName: string;
  businessName: string;
  address: string;
  whatsappNumber: string;
}
interface ContactInfo {
  email: string;
}
interface PasswordInfo {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/* ---------- MODAL STATE (discriminated union) ---------- */
type ModalState =
  | { open: false }
  | { open: true; file: File | null; preview: string | null };

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Basic Information");
  const [modal, setModal] = useState<ModalState>({ open: false });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------- FORMS ---------- */
  const basicForm = useForm<BasicInfo>({
    defaultValues: {
      firstName: "",
      businessName: "",
      address: "",
      whatsappNumber: "",
    },
  });
  const contactForm = useForm<ContactInfo>({ defaultValues: { email: "" } });
  const passwordForm = useForm<PasswordInfo>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onBasicSubmit = (data: BasicInfo) => console.log("Basic Info:", data);
  const onContactSubmit = (data: ContactInfo) =>
    console.log("Contact Email:", data);
  const onPasswordSubmit = (data: PasswordInfo) => {
    if (data.newPassword !== data.confirmPassword) {
      passwordForm.setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }
    console.log("Password change:", data);
  };

  /* ---------- IMAGE MODAL ---------- */
  const openModal = () => setModal({ open: true, file: null, preview: null });
  const closeModal = () => setModal({ open: false });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than or equal to 5 MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setModal((s) =>
        s.open ? { ...s, file, preview: ev.target?.result as string } : s
      );
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const fakeEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  };

  const confirmUpload = () => {
    if (!modal.open || !modal.file || !modal.preview) return;
    setAvatarUrl(modal.preview);
    // TODO: upload modal.file to backend
    closeModal();
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-b p-4 md:p-8">
      <div className="">
        {/* Glass Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
          {/* Avatar */}
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6 mb-8">
            <div className="relative">
              <div
                className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-cover bg-center flex items-center justify-center text-3xl md:text-4xl font-bold text-white shadow-lg"
                style={{
                  backgroundImage: avatarUrl
                    ? `url(${avatarUrl})`
                    : "linear-gradient(to bottom right, #4b5563, #1f2937)",
                }}
              >
                {!avatarUrl && "JS"}
              </div>

              <button
                type="button"
                onClick={openModal}
                className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full cursor-pointer shadow-md transition"
              >
                <Camera className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">JPG, PNG up to 5 MB</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-white/20 mb-6 overflow-x-auto">
            {(["Basic Information", "Contact", "Password"] as Tab[]).map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-1 text-sm md:text-base font-medium transition relative whitespace-nowrap ${
                    activeTab === tab
                      ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-500"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* ---------- BASIC INFORMATION ---------- */}
          {activeTab === "Basic Information" && (
            <form
              onSubmit={basicForm.handleSubmit(onBasicSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    {...basicForm.register("firstName", {
                      required: "Full name is required",
                    })}
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition"
                  />
                  {basicForm.formState.errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">
                      {basicForm.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Business Name"
                    {...basicForm.register("businessName")}
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Address"
                  {...basicForm.register("address")}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter WhatsApp Number"
                  {...basicForm.register("whatsappNumber", {
                    pattern: {
                      value: /^[0-9+\-\s()]+$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition"
                />
                {basicForm.formState.errors.whatsappNumber && (
                  <p className="text-red-400 text-xs mt-1">
                    {basicForm.formState.errors.whatsappNumber.message}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <FillButton type="submit" className="w-full">
                  Update
                </FillButton>
              </div>
            </form>
          )}

          {/* ---------- CONTACT ---------- */}
          {activeTab === "Contact" && (
            <form
              onSubmit={contactForm.handleSubmit(onContactSubmit)}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...contactForm.register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition"
                />
                {contactForm.formState.errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {contactForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <FillButton type="submit" className="w-full">
                  Update Email
                </FillButton>
              </div>
            </form>
          )}

          {/* ---------- PASSWORD ---------- */}
          {activeTab === "Password" && (
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...passwordForm.register("newPassword", {
                    required: "New password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition"
                />
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...passwordForm.register("confirmPassword", {
                    required: "Please confirm new password",
                  })}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition"
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <FillButton type="submit" className="w-full">
                  Change Password
                </FillButton>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ---------- IMAGE UPLOAD MODAL ---------- */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-lg bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Upload Profile Picture
            </h2>

            {/* Drop zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-500 rounded-lg p-8 text-center cursor-pointer transition hover:border-yellow-500"
              onClick={() => fileInputRef.current?.click()}
            >
              {modal.preview ? (
                <img
                  src={modal.preview}
                  alt="Preview"
                  className="mx-auto max-h-48 rounded-lg"
                />
              ) : (
                <div className="text-gray-400">
                  <Camera className="mx-auto w-12 h-12 mb-2" />
                  <p>Drop image here or click to select</p>
                  <p className="text-xs mt-1">JPG, PNG up to 5 MB</p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* Buttons */}
            <div className="flex gap-3 mt-6 justify-end">
              <BorderButton
                type="button"
                onClick={closeModal}
              >
                Cancel
              </BorderButton>
              <FillButton onClick={confirmUpload} className="font-semibold">
                Upload
              </FillButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
