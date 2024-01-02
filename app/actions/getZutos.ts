import { db } from "@/libs/prisma.server"
import { getCurrentUser } from "./getCurrentUser"

export const getZutos = async()=>{
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return null;
    }
    return db.zuto.findMany({
        where:{
            authorId: currentUser.id
        }
    })
}