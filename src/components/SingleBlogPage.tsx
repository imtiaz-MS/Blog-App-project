import {
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
  // ChatIcon,
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@shopify/polaris-icons";

import Footer from "./Footer";
import HomeTopBar from "./HomeTopBar";
import { useParams } from "react-router-dom";
import { useGetSingleBlog } from "../hooks/query/useGetSingleBlogQuery";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { useContext } from "react";
import { BlogContext } from "../useContex/BlogContext";
import { AddBlogModal } from "./AddBlogModal";
import { useAddComment } from "../hooks/mutation/useAddCommentMutation";
import { useGetComments } from "../hooks/query/useGetCommentsQuery";
const SingleBlogPage = () => {
  const { id } = useParams();
  //get single blog
  const { data: blog, isLoading } = useGetSingleBlog(id);
  //add comment
  const mutation = useAddComment();
  //get all comments
  const { data: comments, isLoading: commentLoading } = useGetComments(id);
  //use form
  const { handleSubmit, control, reset } = useForm();
  //blogContext
  const blogContext = useContext(BlogContext);

  if (!blogContext) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  const { isAddModalOpen } = blogContext;

  if (commentLoading) {
    return <div>Loading...</div>;
  }
  if (!blog) return <div>Blog not found</div>;

  console.log("comments>>", comments);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <BlockStack gap={"100"}>
        <HomeTopBar />
        {isAddModalOpen && <AddBlogModal />}

        <MediaCard portrait title={blog.title} description={blog.description}>
          <div className="w-full h-96 overflow-hidden">
            <img className="w-full" alt="" src={blog.url} />
          </div>

          <div className="absolute bottom-2 right-2  flex">
            <Icon source={ThumbsUpIcon} tone="info" />
            <Icon source={ThumbsDownIcon} tone="emphasis" />
            <Icon source={ChatIcon} tone="success" />
            <Icon source={ShareIcon} tone="base" />
          </div>
        </MediaCard>

        <Card>
          <BlockStack align="center" gap={"200"}>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Add a comment"
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete=""
                  multiline={4}
                />
              )}
            />
            <InlineStack align="end">
              <Button variant="primary" onClick={handleSubmit(onsubmit)}>
                Add
              </Button>
            </InlineStack>

            {comments.map((comment) => (
              <Card key={comment._id}>
                <InlineStack align="space-between" blockAlign="center">
                  <Text>{comment.comment}</Text>
                  <BlockStack>
                    <Text tone="inherit" variant="bodyMd" as="dt">
                      {new Date(comment.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                    <Icon source={DeleteIcon} tone="critical" />
                  </BlockStack>
                </InlineStack>
              </Card>
            ))}
          </BlockStack>
        </Card>
        <Footer />
      </BlockStack>
    </Page>
  );
};

export default SingleBlogPage;
