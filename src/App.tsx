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
import { ToastContainer } from "react-toastify";

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMyBlogOpen, setIsMyBlogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<object | null>(null);
  const [userInfo, setUserInfo] = useState<object | null>(null);

  return (
    <BlogContext.Provider
      value={{
        isAddModalOpen,
        setIsAddModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isMyBlogOpen,
        setIsMyBlogOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        selectedBlog,
        setSelectedBlog,
        userInfo,
        setUserInfo,
      }}
    >
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dasboard />} />
        <Route
          path="/"
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
