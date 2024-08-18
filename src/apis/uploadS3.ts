import AWS from 'aws-sdk';
import { AxiosError } from 'axios';
import { v4 } from 'uuid';
import { ApiResponseType } from '@/types/apiResponseType';

const {
  VITE_S3_ACCESS_KEY,
  VITE_S3_SECRET_ACCESS_KEY,
  VITE_S3_BUCKET_NAME,
  VITE_S3_REGION,
  VITE_S3_DOMAIN,
} = import.meta.env;

AWS.config.update({
  region: VITE_S3_REGION,
  accessKeyId: VITE_S3_ACCESS_KEY,
  secretAccessKey: VITE_S3_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();
const bucketName = VITE_S3_BUCKET_NAME;

export const uploadFile = async (file: File) => {
  const { type } = file;
  const params = {
    Bucket: bucketName,
    Key: `${v4().toString().replaceAll('-', '')}.${type.split('/')[1]}`,
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

export const deleteFile = (urls: string[]) => {
  urls.map(async (url) => {
    try {
      await s3
        .deleteObject({
          Bucket: bucketName,
          Key: url.split(VITE_S3_DOMAIN)[1].slice(1),
        })
        .promise();
    } catch (err) {
      console.error('이미지를 삭제하는데 실패했습니다.');
    }
  });
};
