import Header from "@/components/common/Header/Header";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import React from "react";

export default function HeroSection2() {
  return (
    <section className="relative py-20 rounded-2xl overflow-hidden my-28">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 bg-[url(/images/car-rear.jpg)] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative container px-6 py-10 mx-auto">
        <div className="items-center lg:flex justify-between">
          {/* Left side: Header aligned to bottom */}
          <div className="lg:w-[65%] flex items-end">
            <Header heading={"Experience Performance & Reliability"} />
          </div>

          {/* Right side: Text and button aligned to right */}
          <div className="mt-8 lg:mt-0 lg:w-[25%] flex flex-col items-end text-right">
            <p className="text-white mb-6 max-w-sm">
              Experience the benefits of shopping trusted performance and
              replacement parts—rewards made for drivers like you.
            </p>

            <InteractiveHoverButton className="flex flex-row-reverse justify-end">
              Subscribe to our Newsletter
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
    </section>
  );
}
