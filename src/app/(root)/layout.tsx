import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/shared/Header";
import "./../globals.css";
import MobileFooter from "@/components/shared/Footer/MobileFooter";
import { mobileFooterLinks } from "@/lib/utils/mobileFooterLinks";
import { ENHANCED_HEADER_ROUTES } from "@/lib/utils/headerHellper";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "500"] });

export const metadata: Metadata = {
  title: "Green Threads Seller",
  description: "Green Threads Seller",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
