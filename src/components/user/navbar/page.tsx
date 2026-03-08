"use client";

import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { NavbarProps } from "./types";

export const Navbar = ({
  logo = {
    url: "/",
    src: "/Jbay.svg",
    alt: "logo",
    title: "Jbay",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Products", url: "/products" },
    { title: "Category", url: "/category" },
    {
      title: "Seller",
      url: "#",
      items: [
        { title: "Add Product", url: "/add-product" },
        { title: "My Product", url: "/my-products" },
        { title: "Add New Category", url: "/add-new-category" },
      ],
    },
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
}: NavbarProps) => {
  return (
    <section className="py-4">
      <div className="container">
        <DesktopMenu logo={logo} menu={menu} auth={auth} />
        <MobileMenu logo={logo} menu={menu} auth={auth} />
      </div>
    </section>
  );
};
