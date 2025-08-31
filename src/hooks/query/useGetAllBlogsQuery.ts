import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// login token from local storage
const token = localStorage.getItem("loginToken");

//cusrtom hook for getAllBlogs
export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8080/blogs", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return res.data;
    },
  });
};
