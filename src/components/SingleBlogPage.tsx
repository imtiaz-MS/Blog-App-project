import {
  BlockStack,
  Button,
  Card,
  Icon,
  InlineStack,
  MediaCard,
  Page,
  TextField,
} from "@shopify/polaris";
import {
  ChatIcon,
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
const SingleBlogPage = () => {
  const blogContext = useContext(BlogContext);
  if (!blogContext) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  const { isAddModalOpen } = blogContext;
  const { id } = useParams();
  //get single blog
  const { data: blog, isLoading } = useGetSingleBlog(id);
  //add comment
  const mutation = useAddComment();
  const { handleSubmit, control, reset } = useForm();
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

            <Card></Card>
          </BlockStack>
        </Card>
        <Footer />
      </BlockStack>
    </Page>
  );
};

export default SingleBlogPage;
