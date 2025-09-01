import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type BlogContextType = {
  isAddModalOpen: boolean;
  setIsAddModalOpen: Dispatch<SetStateAction<boolean>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  isMyBlogOpen: boolean;
  setIsMyBlogOpen: Dispatch<SetStateAction<boolean>>;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedBlog: Dispatch<SetStateAction<object | null>>;
  selectedBlog: object | null;
  userInfo: object | null;
  setUserInfo: Dispatch<SetStateAction<object | null>>;
};

export const BlogContext = createContext<BlogContextType | undefined>(
  undefined
);
