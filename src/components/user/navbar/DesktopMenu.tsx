"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { renderMenuItem } from "./MenuItemRenderer";
import { NavbarProps } from "./types";
import FillButton from "@/components/common/Button/FillButton";
import BorderButton from "@/components/common/Button/BorderButton";
import Image from "next/image";

export const DesktopMenu = ({ logo, menu }: NavbarProps) => {
  return (
    <nav className="hidden justify-between lg:flex items-center">
      <div className="flex">
        {/* Logo */}
        <a href={logo?.url} className="flex items-center gap-2">
          <Image
            width={80}
            height={80}
            src={logo?.src ?? "/fallback-logo.png"}
            alt={logo?.alt ?? "Company logo"}
          />
        </a>
      </div>
      <div className="flex">
        <NavigationMenu>
          <NavigationMenuList>
            {menu?.map((item) => renderMenuItem(item))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex gap-2">
        <BorderButton size="lg" href="/login">
          Login
        </BorderButton>
        <FillButton size="lg" href="/signup">
          Signup
        </FillButton>
      </div>
    </nav>
  );
};
