import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { BlogUpdateData } from "../interface";
import axios from "axios";

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
      navigate("/login", { replace: true });
    },
  });
};
