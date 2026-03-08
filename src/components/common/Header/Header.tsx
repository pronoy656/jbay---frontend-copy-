import React from "react";

interface HeaderProps {
  heading: string | React.ReactNode;
  className?: string;
}

export default function Header({ heading, className = "" }: HeaderProps) {
  return (
    <h1
      className={`
        my-6 text-pretty text-4xl font-bold lg:text-6xl italic leading-tight
        ${className}
      `}
    >
      {heading}
    </h1>
  );
}
