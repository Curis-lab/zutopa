"use client";

import { backgroundColorMap, colorMap, emojiMap } from "@/libs/constant";
import { UserCircle } from "./user-circle";
import {Profile} from '@prisma/client';
import { IFrom } from "@/app/types";

interface IZudo {
  profile: Profile,
  zuto?: IFrom
}

const Zudo = ({profile, zuto}:IZudo) => {
  
  return (
    <div className={`flex p-4 rounded-xl w-full gap-x-2 relative ${backgroundColorMap[zuto?.style?.backgroundColor || 'RED']}`}>
      <div>
        <UserCircle profile={profile} className="h-16 w-16"/>
      </div>
      <div className="flex flex-col">
        <p className={`font-bold text-lg whitespace-pre-wrap break-all ${ colorMap[zuto?.style?.textColor || 'WHITE']}`}>
          {profile.firstName} {profile.lastName}
        </p>
        <p className={`whitespace-pre-wrap break-all ${colorMap[zuto?.style?.textColor || 'WHITE']}`}>
          {zuto?.message}
        </p>
      </div>
      <div className="absolute bottom-4 right-4 bg-white rounded-full h-10 w-10 flex items-center justify-center text-2xl">
        {emojiMap[zuto?.style?.emoji || 'THUMBSUP']}
      </div>
    </div>
  );
};

export default Zudo;
