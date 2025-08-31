import { Card, Tabs } from "@shopify/polaris";
import { useCallback, useContext, useState } from "react";
import AllBlog from "./AllBlog";
import Tecnology from "./Tecnology";
import FoodBlog from "./FoodBlog";
import EducationBlog from "./EducationBlog";
import { BlogContext } from "../useContex/BlogContext";
import { AddBlogModal } from "./AddBlogModal";
import EditBlogModal from "./EditBlogModal";
import { useGetAllBlogs } from "../hooks/query/useGetAllBlogsQuery";

const HomePageBody = () => {
  // get allBlogs custom hook
  const { data, isLoading } = useGetAllBlogs();

  const context = useContext(BlogContext);
  if (!context)
    throw new Error("HomePageBody must be used within BlogContext.Provider");
  const { isAddModalOpen, isEditModalOpen } = useContext(BlogContext);
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex: number) => {
    setSelected(selectedTabIndex);
  }, []);

  const allBlogsCount = data?.length || 0;
  const techCount =
    data?.filter((blog) => blog.category === "Technology & Gadgets")?.length ||
    0;
  const foodCount =
    data?.filter((blog) => blog.category === "Food & Cooking")?.length || 0;
  const educationCount =
    data?.filter((blog) => blog.category === "Education & Learning")?.length ||
    0;
  const tabs = [
    { id: "1", content: `All Blogs (${allBlogsCount})` },
    { id: "2", content: `Technology & Gadgets(${techCount})` },
    { id: "3", content: `Food & Cooking (${foodCount})` },
    { id: "4", content: `Education & Learning(${educationCount})` },
  ];

  return (
    <>
      {isAddModalOpen && <AddBlogModal />}
      {isEditModalOpen && <EditBlogModal />}
      <Card>
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={handleTabChange}
          fitted
        />

        <div className="mt-10">
          {selected === 0 && <AllBlog data={data} isLoading={isLoading} />}
          {selected === 1 && <Tecnology data={data} isLoading={isLoading} />}
          {selected === 2 && <FoodBlog data={data} isLoading={isLoading} />}
          {selected === 3 && (
            <EducationBlog data={data} isLoading={isLoading} />
          )}
        </div>
      </Card>
    </>
  );
};

export default HomePageBody;
