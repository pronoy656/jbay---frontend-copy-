
import DocumentTitle from "@/components/common/RouteTitle/DocumentTitle";
import Footer from "@/components/user/footer/page";
import { Navbar } from "@/components/user/navbar/page";
import Image from "next/image";


export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="">
      <DocumentTitle />
      {/* Main Container with Dual Backgrounds */}
      <div className="relative overflow-hidden min-h-screen">
        {/* LEFT Background - Normal */}
        <div className="md:absolute inset-y-0 left-0 lg:block hidden">
          <Image
            src="/images/FrameV2.png"
            alt="Frame"
            width={10000}
            height={10000}
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Navbar Overlay (spans full width) */}
          <div className="relative z-50">
            <Navbar />
          </div>

          {/* Children Overlay (spans full width) */}
          <div className="relative z-10 ">{children}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
