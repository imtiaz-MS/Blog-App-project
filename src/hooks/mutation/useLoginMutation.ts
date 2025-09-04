import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { BlogUpdateData } from "../interface";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { BlogContext } from "../../useContex/BlogContext";

// custom hook for login
export const useLogin = () => {
  const blogContext = useContext(BlogContext);
  if (!blogContext) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  const { setUserInfo } = blogContext;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (loginData: BlogUpdateData) => {
      const res = await axios.post(
        "http://localhost:8080/user/login",
        loginData
      );

      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("loginToken", data.accessToken);
      localStorage.setItem("userId", data.userId);
      setUserInfo(data);
      console.log("user info from login>>", data);
      if (data) {
        queryClient.invalidateQueries(["blogs"]);
        navigate("/", { replace: true });
      }
    },
    onError: () => toast.error("Password and number do not match"),
  });
};
