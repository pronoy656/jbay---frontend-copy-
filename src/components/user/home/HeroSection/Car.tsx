// Car.tsx
"use client";

import Image from "next/image";

interface CarProps {
  src: string;
}

export default function Car({ src }: CarProps) {
  return (
    <section>
      <Image src={src} alt="car" width={1000} height={479} />
    </section>
  );
}
