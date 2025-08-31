import { Icon, InlineStack, MediaCard, Text } from "@shopify/polaris";
import {
  ChatIcon,
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@shopify/polaris-icons";

import { useContext } from "react";
import { BlogContext } from "../useContex/BlogContext";
import { useNavigate } from "react-router-dom";

import { useGetMyBlogs } from "../hooks/query/useGetMyBlogQuery";
import { useDeleteBlog } from "../hooks/mutation/useDeleteMutation";

const BlogCard = ({ blog }) => {
  const blogContext = useContext(BlogContext);
  if (!blogContext) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  const { setIsEditModalOpen, setSelectedBlog, setIsDeleteModalOpen } =
    blogContext;
  const navigate = useNavigate();
  const { data } = useGetMyBlogs();
  /* const mutation = useDeleteBlog();
  const deleteBtnHandler = (id: string) => {
    mutation.mutate(id);
  }; */
  const author = data && data.length > 0 ? data[0].author : null;

  const popoverActions =
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
            onAction: () => (
              setIsDeleteModalOpen(true),
              console.log("select btn clicked"),
              setSelectedBlog(blog)
            ),
            destructive: true,
          },
        ]
      : [];
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
      popoverActions={popoverActions}
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

      <div className="absolute bottom-2 right-2 flex gap-2 items-center">
        <InlineStack align="center" blockAlign="center" gap="100">
          <InlineStack align="center" blockAlign="center">
            <Icon source={ThumbsUpIcon} tone="info" />
            <Text variant="bodySm" as="p" tone="subdued">
              10
            </Text>
          </InlineStack>
          <InlineStack align="center" blockAlign="center">
            <Icon source={ThumbsDownIcon} tone="critical" />
            <Text variant="bodySm" as="p" tone="subdued">
              10
            </Text>
          </InlineStack>
          <InlineStack align="center" blockAlign="center">
            <Icon source={ChatIcon} tone="success" />
            <Text variant="bodySm" as="p" tone="subdued">
              10
            </Text>
          </InlineStack>
        </InlineStack>
      </div>
    </MediaCard>
  );
};

export default BlogCard;
