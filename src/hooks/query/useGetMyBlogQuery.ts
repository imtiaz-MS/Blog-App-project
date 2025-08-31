import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//login token from local storage
const token = localStorage.getItem("loginToken");
export const useGetMyBlogs = () => {
  return useQuery({
    queryKey: ["myBlogs"],
    queryFn: async () => {
      if (!token) {
        throw new Error("No authentication token found");
      }
      const res = await axios.get("http://localhost:8080/myblogs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
};
