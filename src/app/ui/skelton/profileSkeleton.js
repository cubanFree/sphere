import React from "react";
import {Skeleton} from "@nextui-org/react";

export default function ProfileSkeleton() {
  return (
    <div className="w-full flex gap-4">
      <div className="flex justify-center items-start">
        <Skeleton className="flex rounded-xl w-16 h-16 dark" />
      </div>  
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
            <Skeleton className="h-4 w-[50%] rounded-lg dark" />
            <div className="w-full flex justify-end items-center gap-2">
                <Skeleton className="h-4 w-[15%] rounded-xl dark" />
                <Skeleton className="h-4 w-[5%] rounded-xl dark" />
            </div>
        </div>
        <Skeleton className="h-2 w-[35%] rounded-lg dark" />
        <div className="w-[50%] flex gap-4">
            <Skeleton className="h-2 w-[40%] rounded-lg dark" />
            <Skeleton className="h-2 w-[40%] rounded-lg dark" />
        </div>
        <Skeleton className="h-3 w-[80%] rounded-lg dark" />
      </div>
    </div>
  );
}
