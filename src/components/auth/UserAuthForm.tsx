"use client";

import * as React from "react";

import { cn } from "@/lib/utils/utils";
import { Icons } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  step?: "SIGN_IN" | "SIGN_UP" | "FORGOT_PASSWORD";
  ctaText?: string;
  ctaCallBack?: (data?: any) => void;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { step = "SIGN_IN", ctaCallBack = () => {}, ctaText = "Login" } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid gap-2 md:gap-4">
              <Label className="" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            {step === "SIGN_IN" && (
              <div className="grid gap-1">
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
            )}
          </div>
          <Button disabled={isLoading} onClick={ctaCallBack}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {ctaText}
          </Button>
        </div>
      </form>
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
