import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ScrollBasedVelocityDemo } from "./Velocity";

const logo = {
  url: "/",
  src: "/Jbay.svg",
  alt: "Your Brand Logo",
};

const footerSections = [
  {
    title: "Links",
    links: [
      { title: "Home", href: "#" },
      { title: "Catagory", href: "#" },
      { title: "Products", href: "#" },
    ],
  },
  {
    title: "My Bisness",
    links: [
      { title: "Add Product", href: "#" },
      { title: "My Products", href: "#" },
      { title: "Add New Catagory", href: "#" },
    ],
  },
  {
    title: "Others",
    links: [
      { title: "Contacts Us", href: "#" },
      { title: "Tarms & Condition", href: "#" },
      { title: "Privacy Policy", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-6 xl:px-0 py-12">
        {/* Top footer content */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10 z-50 relative">
          <div className="col-span-full xl:col-span-2">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image width={80} height={80} src={logo.src} alt={logo.alt} />
            </Link>
            <p className="mt-4 text-muted-foreground">
              At JBAY, we’re committed to keeping drivers on the road with
              confidence. From essential replacement parts to performance
              upgrades, we deliver top-quality auto solutions that power every
              journey.
            </p>
          </div>

          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h6 className="font-medium md:text-right">{title}</h6>
              <ul className="mt-6 space-y-4 md:text-right">
                {links.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 👇 Footer bottom velocity section */}
      <div className="relative w-full overflow-hidden -mt-50">
        <ScrollBasedVelocityDemo />
      </div>
    </footer>
  );
};

export default Footer;
