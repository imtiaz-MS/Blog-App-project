import { Icon, InlineStack, MediaCard, Text } from "@shopify/polaris";
import { ChatIcon, ThumbsDownIcon, ThumbsUpIcon } from "@shopify/polaris-icons";

import { useContext } from "react";
import { BlogContext } from "../useContex/BlogContext";
import { useNavigate } from "react-router-dom";
import { useGetMyBlogs } from "../hooks/query/useGetMyBlogQuery";

import { useAddLike } from "../hooks/mutation/useAddLikeMutation";
import { useDisLike } from "../hooks/mutation/useDislikeMutation";
import { useGetComments } from "../hooks/query/useGetCommentsQuery";

const BlogCard = ({ blog }) => {
  const blogContext = useContext(BlogContext);
  if (!blogContext) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  const { setIsEditModalOpen, setSelectedBlog, setIsDeleteModalOpen } =
    blogContext;
  const navigate = useNavigate();
  //get my blog
  const { data } = useGetMyBlogs();
  //like mutation
  const likeMutation = useAddLike();
  //dislikeMutation
  const dislikeMutation = useDisLike();
  //getCommentMutation
  const { data: comments } = useGetComments(blog._id);
  console.log("blog id>>>", blog._id);
  console.log("comments for specific blog>>", comments);

  //like controller
  const likeController = async () => {
    await likeMutation.mutateAsync(blog._id);
  };

  //dislike controller
  const disLikeController = async () => {
    dislikeMutation.mutate(blog._id);
  };

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
      title={
        <span
          className="cursor-pointer"
          onClick={() => navigate(`/singleblog/${blog._id}`)}
        >
          {blog.title}
        </span>
      }
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
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/singleblog/${blog._id}`)}
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
      </div>

      <div className="absolute bottom-2 right-2 flex gap-2 items-center z-50">
        <InlineStack align="center" blockAlign="center" gap="100">
          <InlineStack align="center" blockAlign="center">
            <span className="cursor-pointer" onClick={() => likeController()}>
              <Icon source={ThumbsUpIcon} tone="info" />
            </span>
            <Text variant="bodySm" as="p" tone="subdued">
              {blog?.like?.length || 0}
            </Text>
          </InlineStack>

          <InlineStack align="center" blockAlign="center">
            <span
              className="cursor-pointer"
              onClick={() => disLikeController()}
            >
              <Icon source={ThumbsDownIcon} tone="critical" />
            </span>
            <Text variant="bodySm" as="p" tone="subdued">
              {blog?.dislike?.length}
            </Text>
          </InlineStack>
          {/* 
          <InlineStack align="center" blockAlign="center">
            <Icon source={ChatIcon} tone="success" />
            <Text variant="bodySm" as="p" tone="subdued"></Text>
          </InlineStack> */}
        </InlineStack>
      </div>
    </MediaCard>
  );
};

export default BlogCard;
