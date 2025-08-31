import { Card, Tabs } from "@shopify/polaris";
import { useCallback, useContext, useState } from "react";
import AllBlog from "./AllBlog";
import Tecnology from "./Tecnology";
import FoodBlog from "./FoodBlog";
import EducationBlog from "./EducationBlog";
import { BlogContext } from "../useContex/BlogContext";
import { AddBlogModal } from "./AddBlogModal";
import { useGetMyBlogs } from "../hooks/query/useGetMyBlogQuery";
import EditBlogModal from "./EditBlogModal";

const MyBlogBody = () => {
  // get myBlogs custom hook
  const { data, isLoading } = useGetMyBlogs();

  const context = useContext(BlogContext);
  if (!context)
    throw new Error("HomePageBody must be used within BlogContext.Provider");
  const { isAddModalOpen, isEditModalOpen } = context;
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex: number) => {
    setSelected(selectedTabIndex);
  }, []);

  // Only show loading for initial load
  if (isLoading) {
    console.log("loading");
    return <div>Loading...</div>;
  }

  // Count blogs by category for tab labels
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
    <div>
      {isAddModalOpen && <AddBlogModal />}
      {isEditModalOpen && <EditBlogModal />}

      {!data || data.length === 0 ? (
        <Card>
          <div className="flex flex-col items-center justify-center p-10">
            <h2 className="text-2xl font-semibold mb-4">No Blogs Found</h2>
            <p className="text-gray-600 mb-6">
              You haven't added any blogs yet.
            </p>
          </div>
        </Card>
      ) : (
        <Card>
          <Tabs
            tabs={tabs}
            selected={selected}
            onSelect={handleTabChange}
            fitted
          />

          <div className="mt-10">
            {/* Pass data (even if empty) to child components */}
            {selected === 0 && (
              <AllBlog data={data || []} isLoading={isLoading} />
            )}
            {selected === 1 && (
              <Tecnology data={data || []} isLoading={isLoading} />
            )}
            {selected === 2 && (
              <FoodBlog data={data || []} isLoading={isLoading} />
            )}
            {selected === 3 && (
              <EducationBlog data={data || []} isLoading={isLoading} />
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default MyBlogBody;
