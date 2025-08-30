import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//base url for api
const api = axios.create({
  baseURL: "http://localhost:8080",
});
interface BlogUpdateData {
  title?: string;
  description?: string;
  url?: string;
  category?: string;
  phone?: string;
  password?: string;
  name?: string;
}
interface EditBlogParams {
  id: string | number;
  updatedData: BlogUpdateData;
}

// login token from local storage
const token = localStorage.getItem("loginToken");

//custom hook for editBlog
export const useEditBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updatedData }: EditBlogParams) => {
      const res = await api.patch(`/blogs/${id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["myBlogs"]),
  });
};

//custom Hook for delete blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => {
      const res = await api.delete(`/blogs/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["myBlogs"]),
  });
};

//custom hook for add blog
export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (blogData: BlogUpdateData) => {
      if (!token) {
        throw new Error("No authentication token found");
      }
      const res = await api.post("/blogs", blogData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  });
};

// custom hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (loginData: BlogUpdateData) => {
      const res = await api.post("/user/login", loginData);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("loginToken", data);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      if (data) {
        navigate("/homepage", { replace: true });
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

//custom hook for registration

export const useRegistration = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (registrationData: BlogUpdateData) => {
      const res = await api.post("/user/registration", registrationData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/login", { replace: true });
    },
  });
};

//custom hook for authorization
export const useAuthorization = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const res = await api.get("/user/current", {
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
