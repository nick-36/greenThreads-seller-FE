"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/auth/UserAuthForm";
import { Icons } from "../ui/icons";

const ForgotPassword = () => {
  return (
    <>
      <div className="container mx-auto px-0 h-full md:h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-zinc-900">
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "link" }),
            "absolute right-4 top-4 md:right-8 md:top-8 z-10 text-white md:text-black"
          )}
        >
          Sign up
        </Link>
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-2 top-4 md:left-8 md:top-8 z-10 text-white md:hidden"
          )}
        >
          <Icons.backArrow />
        </Link>
        <div className="relative sm:h-auto md:h-full flex-col justify-center  items-center bg-muted p-10 text-white lg:flex dark:border-r sm:h-auto">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative mx-auto flex items-center text-lg font-medium w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
            <Image
              src="./green-threads-logo.svg"
              fill
              alt="green-thread-logo"
            />
          </div>
        </div>
        <div className="p-6 rounded-t-[32px] md:rounded-none  md:rounded-l-[32px] bg-white h-full">
          <div className="mx-auto h-full  flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-left md:text-center">
              <div className="relative mx-auto my-10 flex items-center text-lg font-medium w-[175px] h-[134px] md:w-[200px] md:h-[200px]">
                <Image src="./key.svg" fill alt="green-thread-logo" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Forgot Password?
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email, We will send you the link for reset password.
              </p>
            </div>
            <UserAuthForm
              step="FORGOT_PASSWORD"
              ctaText="Submit"
              ctaCallBack={() => {}}
            />
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href="/sign-in"
                className="underline underline-offset-4 hover:text-primary"
              >
                Log In Now
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
