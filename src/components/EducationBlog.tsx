import { Page } from "@shopify/polaris";
import BlogCard from "./BlogCard";
const EducationBlog = ({ data, isLoading }) => {
  if (isLoading) {
    console.log("loading");
    return <div>Loading...</div>;
  }
  if (!data || !Array.isArray(data)) {
    return <div>No blogs found</div>;
  }
  return (
    <>
      {data.map((blog: object) => {
        if (blog.category === "Education & Learning") {
          return <BlogCard key={blog._id} blog={blog} />;
        }
      })}
    </>
  );
};

export default EducationBlog;
