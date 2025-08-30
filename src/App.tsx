import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ProtectedRoter from "./components/ProtectedRoter";
import Dasboard from "./components/Dasboard";
import HomePage from "./components/HomePage";
import { BlogContext } from "./useContex/BlogContext";
import { useState } from "react";
import MyBlog from "./components/MyBlog";
import SingleBlogPage from "./components/SingleBlogPage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { addBlog, deleteBlog, getAllBlogs, updateBlog } from "./api/api";

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMyBlogOpen, setIsMyBlogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  // const queryClient = useQueryClient();
  /*   // get all blogs
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  }); */
  // console.log("allData>>", data);
  /* //add blogs
  const mutation = useMutation({
    mutationFn: addBlog,
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  }); */

  /* // delete blogs
  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => queryClient.invalidateQueries(["myBlogs"]),
  }); */

  /* //edit blogs
  const editMutatation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => queryClient.invalidateQueries(["myBlogs"]),
  }); */
  return (
    <BlogContext.Provider
      value={{
        isAddModalOpen,
        setIsAddModalOpen,
        isMyBlogOpen,
        setIsMyBlogOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        selectedBlog,
        setSelectedBlog,
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dasboard />} />
        <Route
          path="/homepage"
          element={
            <ProtectedRoter>
              <HomePage />
            </ProtectedRoter>
          }
        />
        <Route
          path="/myblog"
          element={
            <ProtectedRoter>
              <MyBlog />
            </ProtectedRoter>
          }
        />
        <Route
          path="/singleblog/:id"
          element={
            <ProtectedRoter>
              <SingleBlogPage />
            </ProtectedRoter>
          }
        />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BlogContext.Provider>
  );
}

export default App;
