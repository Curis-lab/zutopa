"use client";

import { Department } from "@prisma/client";

interface IProfile {
  firstName: string;
  lastName: string;
  department?: Department | null;
}
interface props {
  profile: IProfile;
  className?: string;
  onClick?: (...args: any) => any;
}

interface props {
  image: string;
  text: string;
}


export function UserCircle({ profile, onClick, className }: props) {
  //it can be click
  //image
  return (
    <div
      className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
      onClick={onClick}
    >
      {" "}
      <h2>
        {profile.firstName.charAt(0).toUpperCase()}
        {profile.lastName.charAt(0).toUpperCase()}
      </h2>
    </div>
  );
}
