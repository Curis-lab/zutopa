import { Profile } from "@prisma/client";
import { IFrom } from "../types";

export interface IZudo {
  profile?: Profile;
  zuto?: IFrom;
  fun?: (id: string) => void;
}

//zudo restructure
export interface IReform{
  message:string
  authorId: string
  recipientId: string,
  style:{
    backgroundColor: string,
    textColor: string,
    emoji: string
  }
}


export interface IAnother{
  profile: string
}
