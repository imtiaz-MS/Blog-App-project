import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//base url for api
const api = axios.create({
  baseURL: "http://localhost:8080",
});
// login token from local storage
const token = localStorage.getItem("loginToken");
//cusrtom hook for getAllBlogs
export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await api.get("/blogs", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return res.data;
    },
  });
};

//custom hook for getMyBlogs
export const useGetMyBlogs = () => {
  return useQuery({
    queryKey: ["myBlogs"],
    queryFn: async () => {
      if (!token) {
        throw new Error("No authentication token found");
      }
      const res = await api.get("/myblogs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
};

//custom hook for get single blog
export const useGetSingleBlog = (id) => {
  return useQuery({
    queryKey: ["singleBlog"],
    queryFn: async () => {
      const res = await api.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: !!id, // Only run the query if id is available
  });
};
