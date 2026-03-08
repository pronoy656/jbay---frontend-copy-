import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
    title: "JBay - Buy & Sell Car Parts Online",
    description:
        "JBay is your trusted car parts marketplace to buy and sell new, used, and refurbished auto parts. Explore engines, tires, accessories, and more — all in one place.",
    metadataBase: new URL("https://jbay-frontend.vercel.app"),
    icons: {
        icon: "/jbay.png",
        shortcut: "/jbay.png",
        apple: "/jbay.png",
    },
    openGraph: {
        title: "JBay - Buy & Sell Car Parts Online",
        description:
            "Join JBay — the ultimate platform to buy and sell new, used, and refurbished car parts. Find quality auto products at the best prices.",
        url: "https://jbay-frontend.vercel.app",
        siteName: "JBay",
        images: [
            {
                url: "/jbay.png", // 1200x630 recommended
                width: 1200,
                height: 630,
                alt: "JBay Car Parts Marketplace",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "JBay - Buy & Sell Car Parts Online",
        description:
            "Buy and sell new, used, and refurbished car parts easily on JBay. A complete marketplace for engines, tires, and accessories.",
        images: ["/jbay.png"],
    },
};
