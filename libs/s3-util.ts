import S3 from "aws-sdk/clients/s3";
import path from "path";

const s3 = new S3({
  region: process.env.ZUDO_BUCKET_REGION,
  accessKeyId: process.env.ZUDO_ACCESS_KEY_ID,
  secretAccessKey: process.env.ZUDO_SECRET_ACCESS_KEY,
});

export async function uploadFilesToS3(opts: {
  bucket: string;
  key: string;
  files: Record<string, string>;
}) {
  const { bucket, key, files } = opts;
  const s3 = new S3();
  await Promise.all(
    Object.entries(files).map(async ([file, content]) => {
      await s3
        .putObject({
          Bucket: bucket,
          Key: path.join(key, file),
          Body: content,
        })
        .promise();
    })
  );
}
