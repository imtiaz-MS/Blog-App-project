import { Page } from "@shopify/polaris";
import BlogCard from "./BlogCard";

const Tecnology = ({ data, isLoading }) => {
  if (isLoading) {
    console.log("loading");
    return <div>Loading...</div>;
  }
  if (!data || !Array.isArray(data)) {
    return <div>No blogs found</div>;
  }
  return (
    <>
      {data.toReversed().map((blog: object) => {
        if (blog.category === "Technology & Gadgets") {
          return <BlogCard key={blog._id} blog={blog} />;
        }
      })}
    </>
  );
};

export default Tecnology;
