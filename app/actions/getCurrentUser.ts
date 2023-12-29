// produce: only one user info

import { db } from "@/libs/prisma.server";
import getSession from "./getSession";

export const getCurrentUser = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return null;
  }
  return await db.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });
};



interface IParams{
  user:string
}

export const getUserById = async(params:IParams)=>{

  const recipientData =  await db.user.findUnique({
  where:{
      id:params.user[0] as string
    }
  })

  if(!recipientData){
    return {
      id: '',
      email:'',
      profile:{firstName:'',lastName:'', department: null},
    };
  }
  
  return {
    id: recipientData.id,
    email: recipientData.email,
    profile:{firstName: recipientData.profile.firstName, lastName: recipientData.profile.lastName, department: recipientData.profile?.department}
  }
}