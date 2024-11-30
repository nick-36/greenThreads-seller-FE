import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentSales({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        ?.map((word) => word[0])
        ?.join("")
        ?.toUpperCase()
        ?.slice(0, 2) || "??"
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="flex items-center" key={i}>
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="ml-4 space-y-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
            <Skeleton className="ml-auto h-4 w-[80px]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {data?.map((sale: any) => {
        return (
          <div className="flex items-center" key={sale.id}>
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>{getInitials(sale?.customerName)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {sale?.customerName}
              </p>
              <p className="text-sm text-muted-foreground">{sale?.email}</p>
              <div className="ml-auto font-medium md:hidden">{sale.amount}</div>
            </div>
            <div className="ml-auto font-medium hidden md:block">
              {sale?.amount}
            </div>
          </div>
        );
      })}
    </div>
  );
}
