import Header from "@/components/common/Header/Header";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="my-20">
      <div className="flex justify-between">
        <Header heading={"About us"} />
        <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
          At [Your Brand Name], we believe your vehicle deserves nothing less
          than excellence. Our mission is to deliver premium car parts, tires,
          and accessories crafted for precision, durability, and style. Every
          product we offer meets global quality standards, ensuring the perfect
          balance of performance and reliability for every drive.
        </p>
      </div>
      <div>
        <Image
          src="/images/engine.jpg"
          width={1320}
          height={656}
          alt="engine"
          className="rounded-2xl bg-cover w-[1320] h-[656]"
        />
      </div>
    </div>
  );
}
