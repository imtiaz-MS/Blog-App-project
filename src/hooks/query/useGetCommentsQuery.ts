import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//custom hook for get single blog
export const useGetComments = (id: string) => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8080/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
      });
      console.log("comment response>>", res.data);
      return res.data;
    },
    enabled: !!id, // Only run the query if id is available
  });
};
