import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// login token from local storage
const token = localStorage.getItem("loginToken");

//custom Hook for delete blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => {
      const res = await axios.delete(`http://localhost:8080/blogs/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["myBlogs"]),
  });
};
