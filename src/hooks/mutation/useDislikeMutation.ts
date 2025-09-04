import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

// pass both id and type when calling
export const useDisLike = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("loginToken");

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.post(
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["singleBlog"] });
    },
  });
};
