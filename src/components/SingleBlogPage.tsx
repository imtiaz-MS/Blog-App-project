import {
  Avatar,
  BlockStack,
  Button,
  Card,
  Icon,
  InlineStack,
  MediaCard,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import {
  ChatIcon,
  DeleteIcon,
  EditIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@shopify/polaris-icons";

import Footer from "./Footer";
import HomeTopBar from "./HomeTopBar";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleBlog } from "../hooks/query/useGetSingleBlogQuery";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { useContext, useState } from "react";
import { BlogContext } from "../useContex/BlogContext";
import { AddBlogModal } from "./AddBlogModal";
import { useAddComment } from "../hooks/mutation/useAddCommentMutation";
import { useGetComments } from "../hooks/query/useGetCommentsQuery";
import DeleteComment from "./DeleteComment";
import EditComments from "./EditComments";
import { useAddLike } from "../hooks/mutation/useAddLikeMutation";
import { useDisLike } from "../hooks/mutation/useDislikeMutation";

const SingleBlogPage = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useGetSingleBlog(id);
  //add comment mutation
  const mutation = useAddComment();
  //get comment mutation
  const { data: comments, isLoading: commentLoading } = useGetComments(id);
  //like mutation
  const likeMutation = useAddLike();
  //dislikeMutation
  const dislikeMutation = useDisLike();

  //like controller
  const likeController = async () => {
    await likeMutation.mutate(blog._id);
  };

  //dislike controller
  const disLikeController = () => {
    dislikeMutation.mutate(blog._id);
  };

  // const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { handleSubmit, control, reset } = useForm();

  const blogContext = useContext(BlogContext);

  // const navigate = useNavigate();
  if (!blogContext) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }

  const {
    isAddModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    userInfo,
  } = blogContext;
  console.log("user info>>", userInfo);
  // Track which comment is being deleted
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const userId = localStorage.getItem("userId");
  if (isLoading || commentLoading) {
    return <div>Loading...</div>;
  }

  if (!blog) return <div>Blog not found</div>;

  const onsubmit = (data: FieldValues) => {
    mutation.mutate({
      commentsInfo: {
        id: blog._id,
        comment: data,
      },
    });
    reset();
  };

  return (
    <Page>
      <BlockStack gap="100">
        <HomeTopBar />
        {isAddModalOpen && <AddBlogModal />}

        {isDeleteModalOpen && selectedComment && (
          <DeleteComment comment={selectedComment} />
        )}
        {isEditModalOpen && selectedComment && (
          <EditComments comment={selectedComment} />
        )}

        <MediaCard portrait title={blog.title} description={blog.description}>
          {blog.url && !imageError && (
            <div className="w-full h-96 overflow-hidden">
              <img
                className="w-full"
                alt={blog.title}
                src={blog.url}
                // onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </div>
          )}
          <div className="absolute bottom-2 right-2 flex gap-2 items-center z-50">
            <InlineStack align="center" blockAlign="center" gap="100">
              <InlineStack align="center" blockAlign="center">
                <span
                  className="cursor-pointer"
                  onClick={() => likeController()}
                >
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

              <InlineStack align="center" blockAlign="center">
                <Icon source={ChatIcon} tone="success" />
                <Text variant="bodySm" as="p" tone="subdued">
                  {comments?.length || 0}
                </Text>
              </InlineStack>
            </InlineStack>
          </div>
        </MediaCard>

        <Card>
          <BlockStack align="center" gap="200">
            {/* Add Comment Form */}
            <Controller
              name="comment"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please add a comment",
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Add a comment"
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="off"
                  multiline={4}
                />
              )}
            />
            <InlineStack align="end">
              <Button variant="primary" onClick={handleSubmit(onsubmit)}>
                Add
              </Button>
            </InlineStack>

            {/* Render Comments */}
            {comments?.map((comment) => {
              const isLongComment = comment.comment.length > 100; // 100 chars threshold
              return (
                <Card key={comment._id} roundedAbove="sm">
                  <div className="flex flex-col gap-2 p-2">
                    {/* Top Row: Avatar + Date */}
                    <div className="flex justify-between items-center">
                      <Avatar
                        size="xs"
                        customer
                        name={comment.userName || "User"}
                      />
                      <Text tone="subdued" variant="bodySm">
                        {new Date(comment.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </div>

                    {/* Comment + Buttons */}
                    <div
                      className={
                        isLongComment
                          ? "flex flex-col gap-2"
                          : "flex justify-between items-center"
                      }
                    >
                      <Text
                        className={isLongComment ? "" : "flex-1"}
                        variant="bodyMd"
                      >
                        {comment.comment}
                      </Text>
                      {comment.userId === userId && (
                        <InlineStack align="end">
                          <button
                            onClick={() => {
                              setSelectedComment(comment);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1 hover:bg-gray-100 rounded"
                            style={{ lineHeight: 0 }}
                          >
                            <Icon source={DeleteIcon} tone="critical" />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedComment(comment);
                              setIsEditModalOpen(true);
                            }}
                            className="p-1 hover:bg-gray-100 rounded"
                            style={{ lineHeight: 0 }}
                          >
                            <Icon source={EditIcon} tone="base" />
                          </button>
                        </InlineStack>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </BlockStack>
        </Card>
        <Footer />
      </BlockStack>
    </Page>
  );
};

export default SingleBlogPage;
