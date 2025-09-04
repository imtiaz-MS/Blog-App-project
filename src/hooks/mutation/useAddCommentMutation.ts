import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

interface CommentData {
  commentsInfo: {
    id: string;
    comment: {
      comment: string;
    };
  };
}

export const useAddComment = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("loginToken");

  return useMutation({
    mutationFn: async (data: CommentData) => {
      const response = await axios.post(
        `http://localhost:8080/comments/${data.commentsInfo.id}`,
        { comment: data.commentsInfo.comment },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment added successfully!");
    },
  });
};
