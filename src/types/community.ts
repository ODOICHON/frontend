export type CategoryData = {
  code: string;
  name: string;
};

export type CategoryResponse = {
  code: string;
  message: string;
  data: CategoryData[];
};
