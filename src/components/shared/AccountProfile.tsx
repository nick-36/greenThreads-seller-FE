"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validation/userValidation";
import * as z from "zod";
import Image from "next/image";
import { isBase64Image } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "../ui/icons";
import { useSignUp } from "@clerk/nextjs";

interface AccountProfileProps {
  user?: {
    id: string | undefined;
    objectId: string;
    name: string;
    username: string;
    email: string;
    image?: string;
    mobile: string;
  };
  ctaText: string;
}
const AccountProfile = ({ user, ctaText }: AccountProfileProps) => {
  const [files, setFiles] = useState<File[]>([]);
  //   const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = React.useState("");

  console.log(isLoaded, "isLoaded");

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profileImg: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      password: "",
    },
  });

  const onFormSubmit = async (values: any) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const blob = values.profileImg;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      //   const imgRes = await startUpload(files);
      //   if (imgRes && imgRes[0]?.url) {
      //     values.profileImg = imgRes[0].url;
      //   }
    }

    // if (pathname === "/profile/edit") {
    //   router.back();
    // } else {
    //   router.push("/");
    // }
  }

  const onPressVerify = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  if (pendingVerification) {
    return (
      <form onSubmit={onPressVerify}>
        <label id="code">Code</label>
        <input
          value={code}
          id="code"
          name="code"
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Complete Sign Up</button>
      </form>
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col p-4 justify-start gap-4 md:gap-8"
      >
        <FormField
          control={form.control}
          name="profileImg"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full border-2 border-white aspect-square object-cover"
                  />
                ) : (
                  <Image
                    src={"/assets/male_avatar.svg"}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full border-2 border-white aspect-square object-cover"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e: any) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <Button
                className="min-w-16"
                size="icon"
                onClick={() => inputRef?.current?.click()}
              >
                <Icons.camera />
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel className="text-light-2">Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your full name"
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
            name="username"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="text-light-2">User Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Username (e.g., john_doe)"
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
            name="mobile"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Mobile number (e.g., +123456789)"
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
        <Button type="submit">{ctaText}</Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
