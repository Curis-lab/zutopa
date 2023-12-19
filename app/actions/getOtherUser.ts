import { db } from "@/libs/prisma.server";
import { getSession } from "next-auth/react";


export const getOtherUsers = async () => {
    const session = await getSession()
    console.log(session);
    if(!session?.user?.email){
        return null;
    }
    return await db.user.findMany({
      where: {
        id: { not: session?.user?.email },
      },
      orderBy:{
          profile:{
              firstName:"asc",
          }
      }
    });
  };
  