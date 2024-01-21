// produce: only one user info

import { db } from "@/libs/prisma.server";
import getSession from "./getSession";
import { Zuto } from "@prisma/client";

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

type userProfile = {
  firstName: string,
  lastName: string;
  department: string;
}

export const getCurrentUserProfile = async()=>{
  const currentUser = await getCurrentUser();
  return {firstName: currentUser?.profile.firstName}
}

export const getUserByParams = async (params: string) => {
  const recipientData = await db.user.findUnique({
    where: {
      id: params,
    },
  });

  if (!recipientData) {
    return {
      id: "",
      email: "",
      profile: { firstName: "", lastName: "", department: null },
    };
  }

  return {
    id: recipientData.id,
    email: recipientData.email,
    profile: {
      firstName: recipientData.profile.firstName,
      lastName: recipientData.profile.lastName,
      department: recipientData.profile?.department,
    },
  };
};

export const getProfileById = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
  });
};

export const ProduceZudo = async (zuto: Zuto) => {
  const zudo = await db.user.findUnique({ where: { id: zuto.recipientId } });

  return { message: zuto.message, style: zuto.style };
};

