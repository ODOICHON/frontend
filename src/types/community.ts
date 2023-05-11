export interface CategoryData {
  code: string;
  name: string;
}

export interface CategoryResponse {
  code: string;
  message: string;
  data: CategoryData[];
}
