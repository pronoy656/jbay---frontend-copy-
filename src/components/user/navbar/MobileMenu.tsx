"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Accordion } from "@/components/ui/accordion";
import { renderMobileMenuItem } from "./MenuItemRenderer";
import { NavbarProps } from "./types";
import BorderButton from "@/components/common/Button/BorderButton";
import FillButton from "@/components/common/Button/FillButton";
import Image from "next/image";

export const MobileMenu = ({ logo, menu }: NavbarProps) => {
  return (
    <div className="block lg:hidden">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href={logo?.url} className="flex items-center gap-2">
          <Image
            width={80}
            height={80}
            src={logo?.src ?? "/fallback-logo.png"}
            alt={logo?.alt ?? "Company logo"}
          />
        </a>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <a href={logo?.url} className="flex items-center gap-2">
                  <Image
                    width={80}
                    height={80}
                    src={logo?.src ?? "/fallback-logo.png"}
                    alt={logo?.alt ?? "Company logo"}
                  />
                </a>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-6 p-4">
              <Accordion
                type="single"
                collapsible
                className="flex w-full flex-col gap-4"
              >
                {menu?.map((item) => renderMobileMenuItem(item))}
              </Accordion>

              <div className="flex flex-col gap-3">
                <BorderButton size="lg" href="/login" className="w-full">
                  Login
                </BorderButton>
                <FillButton size="lg" href="/signup" className="w-full">
                  Signup
                </FillButton>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
