import { db } from "@/libs/prisma.server"


export const getUserByEmail = async (email:string)=>{
    return await db.user.findUnique({
        where:{
            email: email
        }
    })
}