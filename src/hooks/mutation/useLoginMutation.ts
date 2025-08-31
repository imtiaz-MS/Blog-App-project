import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { BlogUpdateData } from "../interface";
import axios from "axios";
import { toast } from "react-toastify";

// custom hook for login
export const useLogin = () => {
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
      console.log("user info>>", data);
      localStorage.setItem("loginToken", data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      if (data) {
        navigate("/", { replace: true });
      }
    },
    onError: () => toast.error("Password and number do not match"),
  });
};
