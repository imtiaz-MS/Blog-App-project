import { Page } from "@shopify/polaris";
import BlogCard from "./BlogCard";

const AllBlog = ({ data, isLoading }) => {
  if (isLoading) {
    console.log("loading");
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No blogs found. Add your first blog!</div>;
  }
  return (
    <>
      {data.toReversed().map((blog: object) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </>
  );
};

export default AllBlog;
