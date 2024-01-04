// produce: output many user

import { db } from "@/libs/prisma.server";
import getSession from "./getSession";

export const getOtherUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  return await db.user.findMany({
    where: {
      email: { not: session?.user?.email },
    },
    orderBy: {
      profile: {
        firstName: "asc",
      },
    },
  });
};

export const getAllUser = async () => {
  return await db.user.findMany({});
};
