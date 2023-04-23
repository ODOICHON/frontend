import ReactS3Client from 'react-aws-s3-typescript';

const {
  VITE_S3_ACCESS_KEY,
  VITE_S3_SECRET_ACCESS_KEY,
  VITE_S3_BUCKET_NAME,
  VITE_S3_REGION,
  VITE_S3_URL,
} = import.meta.env;

export const s3Config = {
  bucketName: VITE_S3_BUCKET_NAME,
  region: VITE_S3_REGION,
  accessKeyId: VITE_S3_ACCESS_KEY,
  secretAccessKey: VITE_S3_SECRET_ACCESS_KEY,
  s3Url: VITE_S3_URL,
};

export const uploadFile = async (file: File) => {
  const s3 = new ReactS3Client(s3Config);

  const filename = file.name.trim().replace(/(.png|.jpg|.jpeg|.gif|.svg)$/, '');

  try {
    const res = await s3.uploadFile(file, filename);

    return res;
    /*
     * {
     *   Response: {
     *     bucket: "bucket-name",
     *     key: "directory-name/filename-to-be-uploaded",
     *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
     *   }
     * }
     */
  } catch (exception) {
    console.log(exception);
  }
};
