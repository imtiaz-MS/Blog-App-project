import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BlogUpdateData } from "../interface";
import axios from "axios";
import { toast } from "react-toastify";

// login token from local storage
const token = localStorage.getItem("loginToken");

//custom hook for add blog
export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (blogData: BlogUpdateData) => {
      if (!token) {
        throw new Error("No authentication token found");
      }
      const res = await axios.post("http://localhost:8080/blogs", blogData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });
};
