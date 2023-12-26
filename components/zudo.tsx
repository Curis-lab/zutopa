"use client";

import { Profile } from "@prisma/client";

import { UserCircle } from "./user-circle";

interface IZudo {
  profile: Profile
}

const Zudo = ({profile}:IZudo) => {
  return (
    <div>
      <div>
        <UserCircle profile={profile}/>
      </div>
    </div>
  );
};

export default Zudo;
