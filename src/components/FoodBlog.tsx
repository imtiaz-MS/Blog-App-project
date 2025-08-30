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
        }
      })}
    </div>
  );
};

export default FoodBlog;
