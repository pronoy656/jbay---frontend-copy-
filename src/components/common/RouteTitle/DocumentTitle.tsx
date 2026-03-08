"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TITLE_MAP: Record<string, string> = {
  "/": "Home",
  "/products": "Products",
  "/privacy": "Privacy Policy",
  "/terms": "Terms & Conditions",
  "/profile": "Profile",
  "/add-product": "Add Product",
  "/edit-product": "Edit Product",
  "/admin": "Admin Overview",
  "/admin/user": "Admin Users",
  "/category": "Category",
  "/my-products": "My Products",
  "/add-new-category": "Add New Category",
  "/product": "Product Details",
  "/admin/category": "Category",
  "/admin/products": "Products",
  "/admin/category-request": "Category Request",
  "/admin/report": "Report",
  "/admin/faq": "Faq",
  "/admin/terms-condition": "terms & condition",
  "/login": "Login",
  "/forgot-password": "Forgot Password",
  "/otp": "Otp",
  "/set-new-password": "Set New Password",
  "/success": "Success",
  "/signup": "Sign Up",
  "/admin/login": "Admin Login",
  "/admin/forgot-password": "Forgot Password",
  "/admin/otp": "Otp",
  "/admin/set-new-password": "Set New Password",
  "/admin/success": "Success",
};

const formatTitle = (base: string) =>
  base.trim().toLowerCase() === "jbay" ? "JBay" : `${base} | JBay`;

export default function DocumentTitle() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    // Normalize dynamic routes
    const normalized = pathname
      .replace(/\/product\/[\w-]+/i, "/product")
      .replace(/\/admin\/(?!$).*/, (p) => p); // keep admin subpaths

    const title = TITLE_MAP[normalized] || TITLE_MAP[pathname];
    document.title = formatTitle(title);
  }, [pathname]);

  return null;
}
