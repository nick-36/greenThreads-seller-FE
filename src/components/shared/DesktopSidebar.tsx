"use client";
import React, { useEffect, useState, ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Home, ShoppingCart, Package, LineChart } from "lucide-react";
import { mobileFooterLinks } from "@/lib/utils/mobileFooterLinks";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface IconMapping {
  [key: string]: (props: Record<string, any>) => ReactElement;
}
const iconMapping: IconMapping = {
  home: (props: any) => <Home className="h-4 w-4" {...props} />,
  orders: (props: any) => <ShoppingCart className="h-4 w-4" {...props} />,
  revenue: (props: any) => <LineChart className="h-4 w-4" {...props} />,
  products: (props: any) => <Package className="h-4 w-4" {...props} />,
};

const DesktopSidebar = () => {
  const pathname = usePathname();
  const [currPath, setCurrPath] = useState(pathname);

  useEffect(() => {
    if (pathname && currPath !== pathname) {
      setCurrPath(pathname);
    }
  }, [pathname]);
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="relative mx-auto z-20 flex items-center text-lg font-medium h-6 w-6 bg-slate-900 rounded">
              <Image
                src="./brandLogoV2.svg"
                fill
                alt="green-thread-logo"
                className="rounded"
              />
            </div>
            <span className=""></span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {mobileFooterLinks.map((link) => {
              const isActive = currPath === link.href;
              return (
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive ? "bg-muted " : ""
                  )}
                >
                  {iconMapping[link.icon]({ isActive })}
                  {link.name}
                </Link>
              );
            })}
            {/* <Link
            href="#"
            className="flex focus:bg-accent items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all focus:text-primary"
          >
            <ShoppingCart className="h-4 w-4" />
            Orders
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              6
            </Badge>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:text-primary"
          >
            <Package className="h-4 w-4" />
            Products{" "}
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Users className="h-4 w-4" />
            Customers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <LineChart className="h-4 w-4" />
            Analytics
          </Link> */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
