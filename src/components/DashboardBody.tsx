import { Card, Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";

import AllBlog from "./AllBlog.tsx";
import Tecnology from "./Tecnology.tsx";
import FoodBlog from "./FoodBlog.tsx";
import EducationBlog from "./EducationBlog.tsx";
import { useGetAllBlogs } from "../hooks/query/useGetAllBlogsQuery.ts";

const DashboardBody = () => {
  // get allBlogs custom hook
  const { data, isLoading } = useGetAllBlogs();

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

  return !data || data.length === 0 ? (
    <Card>
      <div className="flex flex-col items-center justify-center p-10">
        <h2 className="text-2xl font-semibold mb-4">No Blogs Found</h2>
        <p className="text-gray-600 mb-6">You haven't added any blogs yet.</p>
      </div>
    </Card>
  ) : (
    <Card roundedAbove={false}>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted />
      <div className="mt-10">
        {selected === 0 && <AllBlog data={data} isLoading={isLoading} />}
        {selected === 1 && <Tecnology data={data} isLoading={isLoading} />}
        {selected === 2 && <FoodBlog data={data} isLoading={isLoading} />}
        {selected === 3 && <EducationBlog data={data} isLoading={isLoading} />}
      </div>
    </Card>
  );
};

export default DashboardBody;
