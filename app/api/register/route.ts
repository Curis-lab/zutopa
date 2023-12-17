import bcrypt from "bcrypt";

import { db } from "@/libs/prisma.server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, password } = body;

  console.log('take some change');
  console.log(body);
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await db.user.create({
    data: {
      email,
      password:hashedPassword,
      profile: {
        firstName,
        lastName,
      },
    },
  });

  return NextResponse.json(user);
}
