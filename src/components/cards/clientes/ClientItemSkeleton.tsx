import {Card, Skeleton} from "@nextui-org/react";

export default function ClientItemSkeleton() {
  return (
      <Card>
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-10" />
      </Card>
  )
};