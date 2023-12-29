import { Department, ZutoStyle } from "@prisma/client"

export interface IGetUserById{
    id:string,
    email:string,
    profile:{
        firstName:string,
        lastName:string,
        department:Department | null
    }
}

export interface IFrom {
    message: string;
    style: ZutoStyle
  }