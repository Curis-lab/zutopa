import { db } from "@/libs/prisma.server"
import { NextApiRequest} from "next"
import getSession from "./getSession";

export const getUserByEmail = async (email:string)=>{
    const session = await getSession();
    console.log(session);
    return await db.user.findUnique({
        where:{
            email: email
        }
    })
}