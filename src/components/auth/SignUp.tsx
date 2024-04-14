import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import AccountProfile from "../shared/AccountProfile";
import { Icons } from "../ui/icons";
import { useSignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignUp() {

  return (
    <>
      <div className="container mx-auto px-0 h-full md:h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-zinc-900">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "link" }),
            "flex gap-2 absolute right-4 top-4 md:right-8 md:top-8 z-10 text-white md:text-black"
          )}
        >
          Login <Icons.forwardArrow className="font-bold" />
        </Link>
        <div className="relative  md:h-full flex-col justify-center  items-center bg-muted p-10 text-white lg:flex dark:border-r sm:h-auto">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative mx-auto z-20 flex items-center text-lg font-medium w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
            <Image
              src="./green-threads-logo.svg"
              fill
              alt="green-thread-logo"
            />
          </div>
        </div>
        <div className="p-6 rounded-t-[32px] md:rounded-none  md:rounded-l-[32px] bg-white h-full">
          <div className="mx-auto h-full  flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Start Your Journey Here,
              </h1>
              <p className="text-sm text-muted-foreground">
                It only takes a minute to sign up!
              </p>
            </div>
            <AccountProfile ctaText="Sign up" />
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
