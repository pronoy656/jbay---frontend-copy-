"use client";

import AboutUs from "@/components/user/home/AboutUs/AboutUs";
import Faq from "@/components/user/home/FAQ/Faq";
import HeroSection from "@/components/user/home/HeroSection/HeroSection";
import HeroSection2 from "@/components/user/home/HeroSection2/HeroSection2";
import NewArrival from "@/components/user/home/New Arrival/NewArrival";
import ReviewsPage from "@/components/user/home/Reviews/ReviewsPage";
import GalleryPage from "@/components/user/home/CategoryExpand/GalleryPage";



const SkiperPage = () => {
  return (
    <>
      <div>
        <HeroSection />
      </div>

      <div>
        <GalleryPage />
      </div>

      <div>
        <NewArrival />
      </div>

      <div>
        <AboutUs />
      </div>

      <div>
        <Faq />
      </div>

      <div>
        <ReviewsPage />
      </div>

      <div>
        <HeroSection2 />
      </div>
    </>
  );
};

export default SkiperPage;
