import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { BlogUpdateData } from "../interface";
import axios from "axios";
import { toast } from "react-toastify";

//custom hook for registration
export const useRegistration = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (registrationData: BlogUpdateData) => {
      const res = await axios.post(
        "http://localhost:8080/user/registration",
        registrationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Successfully Registered");
      navigate("/login", { replace: true });
    },

    onError: () => toast.error("This account already exist"),
  });
};
