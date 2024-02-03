import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { filename, contentType } = await request.json();
  try {
    const client = new S3Client({ region: process.env.ZUDO_BUCKET_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.ZUDO_BUCKET_NAME as string,
      Key: uuidv4(),
      Conditions: [
        ["content-length-range", 0, 10485760],
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600,
    });
    console.log('success on aws');
    console.log(filename);
    return Response.json({ url, fields });
  } catch (errors: any) {
    return Response.json({ error: errors.message });
  }
}