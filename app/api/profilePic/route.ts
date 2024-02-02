import { S3Client } from "@aws-sdk/client-s3";
import { S3 } from "aws-sdk";
import { NextResponse } from "next/server";

interface IFetch {
  imageUrl: string;
}

const s3 = new S3({
  region: process.env.ZUDO_BUCKET_REGION,
  accessKeyId: process.env.ZUDO_ACCESS_KEY_ID,
  secretAccessKey: process.env.ZUDO_SECRET_ACCESS_KEY,
});


export async function POST(request: Request) {
  const body = await request.body;
  console.log(body);
  return NextResponse.json(body);
}


// references: https://github.com/vercel/examples/blob/main/solutions/aws-s3-image-upload/app/page.tsx
