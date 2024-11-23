"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "../ui/icons";
import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ForgotPasswordValidation } from "@/lib/validation/userValidation";
import { zodResolver } from "@hookform/resolvers/zod";

const ForgotPassword = () => {
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues: {
      email: "",
      password: "",
      resetCode: "",
    },
    mode: "onBlur",
  });

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/");
  }

  // Send the password reset code to the user's email
  async function create() {
    const isValid = await form.trigger(["email"]);
    if (isValid) {
      setIsLoading(true);
      await signIn
        ?.create({
          strategy: "reset_password_email_code",
          identifier: form.getValues("email"),
        })
        .then(async (_) => {
          setSuccessfulCreation(true);
          // setError("");
        })
        .catch((err) => {
          console.error("error", err.errors[0].longMessage);
          // setError(err.errors[0].longMessage);
          toast({
            title: "uh ho! Something went wrong..",
            description: err.errors[0].longMessage ?? "",
            duration: 2000,
          });
        });
      setIsLoading(false);
    }
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset() {
    const isValid = await form.trigger(["password", "resetCode"]);

    if (isValid) {
      setIsLoading(true);

      await signIn
        ?.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: form.getValues("resetCode"),
          password: form.getValues("password"),
        })
        .then((result) => {
          if (result.status === "complete") {
            // Set the active session to
            // the newly created session (user is now signed in)
            setActive({ session: result.createdSessionId });
          } else {
            console.log(result);
          }
        })
        .catch((err) => {
          console.error("error", err.errors[0].longMessage);
          toast({
            title: "uh ho! Something went wrong..",
            description: err.errors[0].longMessage ?? "",
            duration: 2000,
          });
        });
      setIsLoading(false);
    }
  }

  const onFormSubmit = () => {
    !successfulCreation ? create() : reset();
  };

  return (
    <>
      <div className="container h-[calc(100vh-80px)] md:h-screen  px-0 items-center justify-center md:grid lg:max-w-none lg:grid-cols-2  bg-zinc-900">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-2 top-4 md:left-8 md:top-8 z-10 text-white md:hidden"
          )}
        >
          <Icons.backArrow />
        </Link>
        <div className="relative md:h-full flex-col justify-center items-center p-10 text-white lg:flex dark:border-r sm:h-auto">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="hidden relative mx-auto md:flex items-center text-lg font-medium w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
            <Image
              src="./green-threads-logo.svg"
              fill
              alt="green-thread-logo"
            />
          </div>
        </div>
        <div className="reltaive p-10 flex flex-col justify-start  md:justify-center rounded-t-[32px] md:rounded-none  md:rounded-l-[32px] bg-white h-full">
          <div className="mx-auto mt-20 md:mt-0 flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-left md:text-center">
              <div className="relative mb-20 md:mb-0 mx-auto flex items-center text-lg font-medium w-[175px] h-[134px] md:w-[200px] md:h-[200px]">
                <Image src="./key.svg" fill alt="key-svg" />
              </div>
              {!successfulCreation && (
                <div className="flex flex-col gap-4 items-center">
                  <h1 className="text-2xl text-center font-semibold tracking-tight">
                    Forgot Password?
                  </h1>
                  <p className="text-sm max-w-56 text-center text-muted-foreground">
                    Enter your email, We will send you the link for reset
                    password.
                  </p>
                </div>
              )}
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onFormSubmit)}>
                <div className="grid gap-10 md:gap-4">
                  <div className="grid gap-6">
                    <div className="grid gap-4">
                      {!successfulCreation && (
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your Email (e.g.,name@example.com)"
                                  className="placeholder:text-gray-300 placeholder:font-light"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      {successfulCreation && (
                        <>
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem className="flex w-full flex-col">
                                <FormLabel>Enter your new password</FormLabel>
                                <FormControl>
                                  <Input
                                    id="password"
                                    placeholder="******"
                                    type="password"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    autoComplete="new-password"
                                    className="placeholder:text-gray-300 placeholder:font-light"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="resetCode"
                            render={({ field }) => (
                              <FormItem className="flex w-full flex-col">
                                <FormLabel>Reset Code</FormLabel>
                                <FormControl>
                                  <Input
                                    id="resetCode"
                                    placeholder="******"
                                    type="password"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    autoComplete="reset-code"
                                    className="placeholder:text-gray-300 placeholder:font-light"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Enter the reset code that was sent to your
                                  email
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    disabled={isLoading}
                    onClick={onFormSubmit}
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
