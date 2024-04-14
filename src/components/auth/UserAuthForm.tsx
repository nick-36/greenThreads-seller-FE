"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInValidation } from "@/lib/validation/userValidation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  step?: "SIGN_IN" | "SIGN_UP" | "FORGOT_PASSWORD";
  ctaText?: string;
  ctaCallBack?: (data?: any) => void;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { step = "SIGN_IN", ctaCallBack = () => {}, ctaText = "Login" } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  // async function onSubmit(formValues: any) {
  //   ctaCallBack(formValues);
  // }

  const form = useForm({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    console.log(values, "VAAL");
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: values?.email,
        password: values.password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the sign-in hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-10 md:gap-4">
            <div className="grid gap-6">
              <div className="grid gap-4">
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="******"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          required
                          className="placeholder:text-gray-300 placeholder:font-light"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* {step === "SIGN_IN" && (
                <div className="grid gap-4">
                  <Label className="" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="Enter Password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                  />
                </div>
              )} */}
            </div>
            <Button disabled={isLoading} onClick={ctaCallBack}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {ctaText}
            </Button>
          </div>
        </form>
      </Form>

      <div className="relative">
        {/* <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div> */}
        {step === "SIGN_IN" && (
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              <Link href="/forgot-password">Forgot Password?</Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
