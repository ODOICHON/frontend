import axios, { AxiosError } from 'axios';
import {
  ApiResponseType,
  ApiResponseWithDataType,
} from '@/types/apiResponseType';

const getPresignedUrl = async ({ name }: { name: string }) => {
  try {
    const { data } = await axios.get<
      ApiResponseWithDataType<{ imageKey: string; url: string }>
    >(`/file/pre-signed-url?fileKey=${name}`);
    return data;
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};

const putS3Image = async ({
  url,
  file,
  type,
}: {
  url: string;
  file: File;
  type: string;
}) => {
  try {
    delete axios.defaults.headers.common.Authorization;
    await axios.put(url, file, {
      headers: { 'Content-Type': type },
    });
  } catch (err) {
    alert('이미지 업로드에 실패했습니다.');
    throw new Error('Failed to upload file');
  }
};

const getImageUrl = async ({ imageKey }: { imageKey: string }) => {
  try {
    const { data } = await axios.get<ApiResponseWithDataType<string>>(
      `/file/image-url?imageKey=${imageKey}`,
    );
    return data;
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};

const deleteImage = async (url: string) => {
  const startIndex = url.indexOf('/prod/') + 6;
  const imageKey = url.substring(startIndex);
  try {
    axios.delete(`/file/uploaded-image?imageKey=${imageKey}`);
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};

export const uploadFile = async (file: File) => {
  const { name, type } = file;
  const presignedResponse = await getPresignedUrl({ name });

  if (!presignedResponse) {
    throw new Error('Failed to get presigned URL');
  }

  const {
    data: { imageKey, url },
  } = presignedResponse;

  await putS3Image({ url, file, type });
  const imageResponse = await getImageUrl({ imageKey });
  if (!imageResponse) {
    throw new Error('Failed to get image URL');
  }
  return imageResponse.data;
};

export const deleteFile = (urls: string[]) => {
  urls.map(async (url) => {
    try {
      await deleteImage(url);
    } catch (err) {
      console.error('이미지를 삭제하는데 실패했습니다.');
    }
  });
};
