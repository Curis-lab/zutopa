import { $Enums, Department } from "@prisma/client";
import { Interface } from "readline";

export interface IProfile {
  firstName: string;
  lastName: string;
  department: Department;
  image: string;
}

//accept form ProfileModal
export interface IProfileModal {
  firstName: string;
  lastName: string;
  department: $Enums.Department | string;
  profilePicture: string;
}
