"use client";

import { emojiMap } from "@/libs/constant";
import { UserCircle } from "./user-circle";
import { Profile } from "@prisma/client";
import { IFrom } from "@/app/types";
import { useEffect, useState } from "react";

export interface IZudo {
  profile: Profile;
  zuto?: IFrom;
}

const Zudo = ({ profile, zuto }: IZudo) => {
  const backgroundColorMap = {
    RED: "bg-red-400",
    GREEN: "bg-green-400",
    BLUE: "bg-blue-400",
    WHITE: "bg-white",
    YELLOW: "bg-yellow-300",
  };
  const colorMap = {
    RED: "text-red-400",
    GREEN: "text-green-400",
    BLUE: "text-blue-400",
    WHITE: "text-white",
    YELLOW: "text-yellow-300",
  };
  return (
    <>
      <div
        className={`flex p-4 rounded-xl w-full gap-x-2 relative ${
          backgroundColorMap[zuto?.style.backgroundColor || "BLUE"]
        }`}
      >
        <div>
          <UserCircle profile={profile} className="h-16 w-16" />
        </div>
        <div className="flex flex-col">
          <p
            className={`${
              colorMap[zuto?.style.textColor || "BLUE"]
            } font-bold text-lg whitespace-pre-wrap break-all `}
          >
            {profile.firstName} {profile.lastName}
          </p>
          <p
            className={`${
              colorMap[zuto?.style.textColor || "BLUE"]
            } whitespace-pre-wrap break-all`}
          >
            {zuto?.message}
          </p>
        </div>
        <div className="absolute bottom-4 right-4 bg-white rounded-full h-10 w-10 flex items-center justify-center text-2xl">
          {emojiMap[zuto?.style?.emoji || "HANDSUP"]}
        </div>
      </div>
    </>
  );
};

export default Zudo;
