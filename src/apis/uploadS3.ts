import AWS from 'aws-sdk';
import { AxiosError } from 'axios';
import { v4 } from 'uuid';
import { ApiResponseType } from '@/types/apiResponseType';

const {
  VITE_S3_ACCESS_KEY,
  VITE_S3_SECRET_ACCESS_KEY,
  VITE_S3_BUCKET_NAME,
  VITE_S3_REGION,
} = import.meta.env;

AWS.config.update({
  region: VITE_S3_REGION,
  accessKeyId: VITE_S3_ACCESS_KEY,
  secretAccessKey: VITE_S3_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();
const bucketName = VITE_S3_BUCKET_NAME;

export const uploadFile = async (file: File) => {
  const { type, name } = file;
  const params = {
    Bucket: bucketName,
    Key: `${name}/${v4().toString().replace('-', '')}.${
      file.type.split('/')[1]
    }`,
    Body: file,
    ContentType: type,
    ACL: 'public-read',
  };
  try {
    const { Location } = await s3.upload(params).promise();
    return Location;
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};
