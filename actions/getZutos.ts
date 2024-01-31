import { db } from "@/libs/prisma.server";
import { Prisma} from "@prisma/client";
import { getProfileById } from "./getCurrentUser";

export const getFilteredZudos = async (
  userId: string,
  sortFilter: Prisma.ZutoOrderByWithRelationInput,
  whereFilter: Prisma.ZutoWhereInput
) => {
  return await db.zuto.findMany({
    select: {
      id: true,
      style: true,
      message: true,
      author: {
        select: {
          profile: true,
        },
      },
    },
    orderBy: {
      ...sortFilter,
    },
    where: {
      recipientId: userId,
      ...whereFilter,
    },
  });
};

export const getZutos = async () => {
  return await db.zuto.findMany({});
};

export function extractProfileByMessageId(messageId: string) {
  const result = getMessageById();

  result
    .then((result) => {
      if (!result) {
        return null;
      }
      // const profile = getProfile(result.recipientId);
      
      return {
        firstName: "orange",
        lastName: "apple",
        department: "MARKETING",
        image: "thiitps",
      };
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  async function getMessageById() {
    return await db.zuto.findUnique({
      where: {
        id: messageId,
      },
    });
  }

  async function getProfile(recipientId: string) {
    await getProfileById(recipientId)
      .then((result) => result?.profile)
      .catch((error) => null);
  }
}
