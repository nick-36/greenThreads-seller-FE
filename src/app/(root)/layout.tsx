import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/shared/Header";
import "./../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
