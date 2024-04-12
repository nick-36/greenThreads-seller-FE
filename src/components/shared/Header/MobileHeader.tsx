import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

const MobileHeader = ({ headerProps }: any) => {
  const { isEnhancedHeader = true, headerTitle = "" } = headerProps;
  if (!isEnhancedHeader) {
    return (
      <div className="flex justify-between bg-stone-900 px-2 py-8">
        <p className="w-full flex justify-center gap-4 items-center relative text-white text-center">
          {headerTitle}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-between bg-stone-900 px-2 py-8">
      <div className="flex gap-4 items-center relative">
        <div>
          <Image
            src={"/assets/male_avatar.svg"}
            alt="profile photo"
            width={58}
            height={60}
            priority
            className="rounded-full border-2 border-white aspect-square object-cover"
          />
          <Button
            size={"sm"}
            variant="secondary"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "absolute  rounded-2xl bg-white max-w-14 max-h-5 text-[0.5rem] -translate-y-1/2 translate-x-1"
            )}
          >
            Edit Profile
          </Button>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-normal text-white">Chad Adams</p>
          <p className="text-[0.5rem] font-normal text-white">
            michelle@gmail.com
          </p>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <Link
          href="/sign-in"
          className={cn(buttonVariants({ variant: "link" }), "text-white")}
        >
          Logout
        </Link>
      </div>
      <div className="absolute top-4 right-10">
        <Badge className="absolute p-0 top-0 right-0 z-10 flex h-5 w-5 rounded-full  -translate-y-1/2 translate-x-2/4  items-center justify-center bg-red-500 text-white">
          1
        </Badge>
        <Icons.bell />
      </div>
    </div>
  );
};

export default MobileHeader;
