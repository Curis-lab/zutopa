//did not found any file on

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("form posting request", body);
    return NextResponse.json({ hello: "how are you" });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
