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
