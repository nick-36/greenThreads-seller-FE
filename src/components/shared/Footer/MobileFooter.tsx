"use client";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type link = {
  name: string;
  href: string;
  icon: string;
};

type IconComponentProps = {
  isActive: boolean;
};

interface IconComponents {
  [key: string]: React.ComponentType<{ isActive: boolean }>;
}

const Orders = ({ isActive }: { isActive: boolean }) => {
  return <Icons.orders fill={isActive ? "bg-black" : ""} />;
};

const Home = ({ isActive }: { isActive: boolean }) => {
  return <Icons.home fill={isActive ? "bg-black" : ""} />;
};

const Revenue = ({ isActive }: { isActive: boolean }) => {
  return <Icons.revenue fill={isActive ? "bg-black" : ""} />;
};

const Products = ({ isActive }: { isActive: boolean }) => {
  return <Icons.products fill={isActive ? "bg-black" : ""} />;
};

const iconComponents: IconComponents = {
  orders: Orders,
  home: Home,
  revenue: Revenue,
  products: Products,
};

const MobileFooter = ({ links }: { links: link[] }) => {
  const pathname = usePathname();
  const [currPath, setCurrPath] = useState(pathname);

  useEffect(() => {
    if (pathname && currPath !== pathname) {
      setCurrPath(pathname);
    }
  }, [pathname]);

  return (
    <div className="fixed bottom-0 left-0 z-10 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full py-4 max-w-lg grid-cols-4 mx-auto">
        {links.map((link, key) => {
          const IconComponent = iconComponents[link.icon];
          return (
            <Link
              href={link.href}
              key={key}
              className={cn(
                buttonVariants({ variant: "link" }),
                "nav-link inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              )}
            >
              <div
                className={cn(
                  "flex justify-center items-center flex-col gap-2"
                )}
              >
                <IconComponent isActive={currPath === link.href} />
                <span
                  className={cn(
                    currPath === link?.href ? "text-black" : "text-gray-400",
                    "text-sm font-normal group-hover:text-slate-900"
                  )}
                >
                  {link.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileFooter;
