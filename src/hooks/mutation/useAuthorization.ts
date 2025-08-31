import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// login token from local storage
const token = localStorage.getItem("loginToken");

//custom hook for authorization
export const useAuthorization = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.get("/user/current", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      console.log("Authorized");
    },
    onError: (err) => {
      console.log("authorization failed", err);
      navigate("/dashboard");
    },
  });
};
