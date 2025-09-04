import { Card } from "@shopify/polaris";
import BlogCard from "./BlogCard";

const AllBlog = ({ data, isLoading }) => {
  if (isLoading) {
    console.log("loading");
    return <div>Loading...</div>;
  }
  return (
    <>
      {!data ||
        (data.length === 0 && (
          <Card>
            <div className="flex flex-col items-center justify-center p-10">
              <h2 className="text-2xl font-semibold mb-4">No Blogs Found</h2>
              <p className="text-gray-600 mb-6">No blogs found</p>
            </div>
          </Card>
        ))}
      {data.toReversed().map((blog: object) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </>
  );
};

export default AllBlog;
