"use client";

import { Profile, User } from "@prisma/client";

import { UserCircle } from "./user-circle";

interface IZudo {
  profile: {firstName:string, lastName:string}
}

const Zudo = ({profile}:IZudo) => {
  return (
    <div className="">
      <div>
        <UserCircle profile={profile} className="h-16 w-16"/>
      </div>
      <div className="flex flex-co">
        <p>
          {profile.firstName} {profile.lastName}
        </p>
        <p>
          {/*message*/}
        </p>
      </div>
      <div className="absolute bottom-4 right-4 bg-white rounded-full h-10 w-10 flex items-center justify-center text-2xl">
        {/*Tump up */}
      </div>
    </div>
  );
};

export default Zudo;
