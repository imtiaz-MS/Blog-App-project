import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//custom hook for get single blog
export const useGetSingleBlog = (id) => {
  return useQuery({
    queryKey: ["singleBlog"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8080/blogs/${id}`);
      return res.data;
    },
    enabled: !!id, // Only run the query if id is available
  });
};
