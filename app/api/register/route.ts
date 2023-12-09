import { db } from "@/libs/prisma.server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, password } = body;

  const user = await db.user.create({
    data: {
      email,
      password,
      profile: {
        firstName,
        lastName,
      },
    },
  });

  return NextResponse.json(user);
}
