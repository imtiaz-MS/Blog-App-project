import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EditBlogParams } from "../interface";
import axios from "axios";

// login token from local storage
const token = localStorage.getItem("loginToken");
//custom hook for editBlog
export const useEditcomment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updatedData }: EditBlogParams) => {
      const res = await axios.patch(
        `http://localhost:8080/comments/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
  });
};
