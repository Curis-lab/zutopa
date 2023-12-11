import { db } from "./prisma.server";

export const getOtherUsers = async (userId: string) => {
  return await db.user.findMany({
    where: {
      id: { not: userId },
    },
    orderBy:{
        profile:{
            firstName:"asc",
        }
    }
  });
};


export const getUserByEmail = async (email:string)=>{
    return await db.user.findUnique({
        where:{
            email: email
        }
    })
}