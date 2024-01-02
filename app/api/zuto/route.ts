import { db } from "@/libs/prisma.server";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();

  const author = await getCurrentUser();

  if (!author) {
    return null;
  }

  const { message, recipientId, style } = body;

  const zuto = await db.zuto.create({
    data: {
      message,
      author: {
        connect: {
          id: author.id,
        },
      },
      recipient: {
        connect: {
          id: recipientId,
        },
      },
      style,
    },
  });

  return NextResponse.json(zuto);
}
