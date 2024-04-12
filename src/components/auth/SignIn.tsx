// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/1ADs2FRNaQg
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import {
//   CardTitle,
//   CardDescription,
//   CardHeader,
//   CardContent,
//   Card,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function SignIn() {
//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl font-bold">Welcome Back,</CardTitle>
//         <CardDescription>Log in into your account</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" placeholder="Enter Email" required type="email" />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               placeholder="Enter Password"
//               required
//               type="password"
//             />
//           </div>
//           <Button className="w-full" type="submit">
//             Login
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/auth/UserAuthForm";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignIn() {
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
        <div className="relative sm:h-auto md:h-full flex-col justify-center  items-center bg-muted p-10 text-white lg:flex dark:border-r sm:h-auto">
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
            <div className="flex flex-col space-y-2 text-left md:text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back,
              </h1>
              <p className="text-sm text-muted-foreground">
                Log in into your account{" "}
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
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
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
