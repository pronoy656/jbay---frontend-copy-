"use client";

import { Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "sonner";

// Load the font
const montserrat = Montserrat({
  subsets: ["latin"], // include character sets
  variable: "--font-montserrat", // optional CSS variable name
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.variable}>
      <body className={montserrat.className}>
        {/* ThemeProvider controls dark/light mode */}
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div>{children}</div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
