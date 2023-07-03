export type ApiResponseType = {
  code: string;
  message: string;
};

export type ApiResponseWithDataType<T> = ApiResponseType & {
  data: T;
};
