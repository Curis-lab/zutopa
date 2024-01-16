import { Profile } from "@prisma/client";
import { IFrom } from "../types";

export interface IZudo {
  profile?: Profile;
  zuto?: IFrom;
  fun?: (id: string) => void;
}
