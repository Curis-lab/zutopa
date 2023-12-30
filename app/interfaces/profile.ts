import { Department } from "@prisma/client";

export interface IProfile {
  firstName: string;
  lastName: string;
  department: Department;
  image: string;
}
