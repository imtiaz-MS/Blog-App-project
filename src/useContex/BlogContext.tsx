import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type BlogContextType = {
  isAddModalOpen: boolean;
  setIsAddModalOpen: Dispatch<SetStateAction<boolean>>;
  isMyBlogOpen: boolean;
  setIsMyBlogOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedBlog: Dispatch<SetStateAction<object | null>>;
  selectedBlog: object | null;
};

export const BlogContext = createContext<BlogContextType | undefined>(
  undefined
);
