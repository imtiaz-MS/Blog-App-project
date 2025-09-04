import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useGetAllBlogs } from "../query/useGetAllBlogsQuery";

interface LikeResponse {
  success: boolean;
  message: string;
}

export const useAddLike = () => {
  const queryClient = useQueryClient();

  window.queryClient = queryClient;
  const token = localStorage.getItem("loginToken");

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.patch<LikeResponse>(
        `http://localhost:8080/reaction/${id}`,
        {},
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      // Invalidate all possible queries that might have the blog data
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });

      // Force a refetch of the affected queries
      queryClient.refetchQueries({ queryKey: ["blogs"] });
      queryClient.refetchQueries({ queryKey: ["singleBlog"] });
    },
    onError: (error) => {
      console.error("Like error:", error);
    },
  });
};
