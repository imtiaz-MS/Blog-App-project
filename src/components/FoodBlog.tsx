import { Card } from "@shopify/polaris";
import BlogCard from "./BlogCard";

const FoodBlog = ({ data, isLoading }) => {
  if (isLoading) {
    console.log("loading");
    return <div>Loading...</div>;
  }
  if (!data || !Array.isArray(data)) {
    return <div>No blogs found</div>;
  }
  return (
    <div>
      {data.map((blog: object) => {
        if (blog.category === "Food & Cooking") {
          return <BlogCard key={blog._id} blog={blog} />;
        } else {
          return (
            <Card>
              <div className="flex flex-col items-center justify-center p-10">
                <h2 className="text-2xl font-semibold mb-4">No Blogs Found</h2>
                <p className="text-gray-600 mb-6">No Food Blog</p>
              </div>
            </Card>
          );
        }
      })}
    </div>
  );
};

export default FoodBlog;
