import { IZudo } from "@/components/zudo";
import { db } from "@/libs/prisma.server"
import { Prisma, Profile } from "@prisma/client";
import { getProfileById } from "./getCurrentUser";


export const getFilteredZudos = async(
    userId:string,
    sortFilter: Prisma.ZutoOrderByWithRelationInput,
    whereFilter: Prisma.ZutoWhereInput
)=>{
    return await db.zuto.findMany({
        select:{
            id:true,
            style:true,
            message:true,
            author:{
                select:{
                    profile:true
                }
            }
        },
        orderBy:{
            ...sortFilter
        },
        where:{
            recipientId: userId,
            ...whereFilter
        }
    })
}
export const getZutos = async()=>{
    return await db.zuto.findMany({});
}