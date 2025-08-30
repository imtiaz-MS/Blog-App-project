import { Icon, InlineStack, MediaCard } from "@shopify/polaris";
import {
  ChatIcon,
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@shopify/polaris-icons";

import { useContext } from "react";
import { BlogContext } from "../useContex/BlogContext";
import { useNavigate } from "react-router-dom";
import { useGetMyBlogs } from "../hooks/useQueryHooks";
import { useDeleteBlog } from "../hooks/useMutationHooks";

const BlogCard = ({ blog }) => {
  const blogContext = useContext(BlogContext);
  if (!blogContext) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  const { setIsEditModalOpen, setSelectedBlog } = blogContext;
  const navigate = useNavigate();
  const { data } = useGetMyBlogs();
  const mutation = useDeleteBlog();
  const deleteBtnHandler = (id: string) => {
    mutation.mutate(id);
  };
  const author = data && data.length > 0 ? data[0].author : null;
  return (
    <MediaCard
      title={blog.title}
      primaryAction={{
        content: "Read More",
        onAction: () => (
          navigate(`/singleblog/${blog._id}`), setSelectedBlog(blog)
        ),
      }}
      description={
        blog.description.length > 100
          ? blog.description.slice(0, 100) + "..."
          : blog.description
      }
      size="small"
      popoverActions={
        blog.author === author
          ? [
              {
                content: "Edit",
                onAction: () => (
                  setIsEditModalOpen(true),
                  console.log("edit btn clicked"),
                  setSelectedBlog(blog)
                ),
              },
              {
                content: "Delete",
                onAction: () => deleteBtnHandler(blog._id),
                destructive: true,
              },
            ]
          : []
      }
    >
      <img
        className="w-fit"
        alt=""
        width="100%"
        height="100%"
        style={{
          aspectRatio: "16/9",
          objectFit: "cover",
          objectPosition: "center",
        }}
        src={blog.url}
      />

      <div className="absolute bottom-2 right-2">
        <InlineStack>
          <Icon source={ThumbsUpIcon} tone="info" />
          <Icon source={ThumbsDownIcon} tone="emphasis" />
          <Icon source={ChatIcon} tone="success" />
          <Icon source={ShareIcon} tone="base" />
        </InlineStack>
      </div>
    </MediaCard>
  );
};

export default BlogCard;
