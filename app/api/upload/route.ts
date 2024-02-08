import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const S3client = new S3Client({
  region: process.env.ZUDO_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ZUDO_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.ZUDO_SECRET_ACCESS_KEY as string,
  },
});

export const dynamic = "force-dynamic";

async function uploadFilesToS3(file:any, fileName:any){
  const fileBuffer = file;
  console.log(fileName);
  const params = {
    Bucket: process.env.ZUDO_BUCKET_NAME,
    Key:`${fileName}`,
    Body:fileBuffer,
    ContentType:"image/jpg"
  }
  const command = new PutObjectCommand(params);
  await S3client.send(command);
  return fileName;
}

export async function POST(request: NextRequest) {
  try {
    console.log('posting in first step');
    const formData = await request.formData();
    const file = formData.get("profile-pic") as File;

    console.log('posting in second step');

    if(!file){
      return NextResponse.json({error: "file is required"},{status:400});
    }
    
    const buffer = Buffer.from( await file.arrayBuffer());
    const fileName = await uploadFilesToS3(buffer, file.name);
    console.log('final steps');
    return NextResponse.json({ success: true, fileName },{status:200});
  } catch (error) {
    return NextResponse.json({ error },{status: 404});
  }
}