import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { filename, contentType } = await request.json();
  try {
    console.log('file structure of somefunction',filename);
    const client = new S3Client({ region: process.env.ZUDO_BUCKET_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.ZUDO_BUCKET_NAME as string,
      Key: uuidv4(),
      Conditions: [
        ["content-length-range", 0, 1000000],
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600,
    });
    return Response.json({ url, fields });
  } catch (errors: any) {
    return Response.json({ error: errors.message });
  }
}
