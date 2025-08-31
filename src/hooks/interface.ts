export interface BlogUpdateData {
  title?: string;
  description?: string;
  url?: string;
  category?: string;
  phone?: string;
  password?: string;
  name?: string;
}
export interface EditBlogParams {
  id: string | number;
  updatedData: BlogUpdateData;
}
