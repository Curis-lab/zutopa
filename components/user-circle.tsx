"use client";

import { IProfile } from "@/interfaces/profile";

interface props {
  profile: IProfile;
  className?: string;
  onClick?: (...args: any) => any;
}

export function UserCircle({ profile, onClick, className }: props) {
  return (
    <div
      className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
      onClick={onClick}
    >
      {" "}
      <h2>
        Hello
        {/* {profile.firstName.charAt(0).toUpperCase()} */}
        {/* {profile.lastName.charAt(0).toUpperCase()} */}
      </h2>
    </div>
  );
}
