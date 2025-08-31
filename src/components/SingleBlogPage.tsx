import {
  BlockStack,
  Card,
  Icon,
  MediaCard,
  Page,
  Text,
} from "@shopify/polaris";
import {
  // ChatIcon,
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@shopify/polaris-icons";

import Footer from "./Footer";
// import CommentModal from "./CommentModal";
import HomeTopBar from "./HomeTopBar";
import { useParams } from "react-router-dom";
import { useGetSingleBlog } from "../hooks/query/useGetSingleBlogQuery";

const SingleBlogPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBlog(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Page>
      <BlockStack gap={"100"}>
        <HomeTopBar />
        {/* {isCommentModalOpen && <CommentModal />} */}

        <MediaCard portrait title={data.title} description={data.description}>
          <div className="w-full h-96 overflow-hidden">
            <img className="w-full" alt="" src={data.url} />
          </div>

          <div className="absolute bottom-2 right-2  flex">
            <Icon source={ThumbsUpIcon} tone="info" />
            <Icon source={ThumbsDownIcon} tone="emphasis" />
            {/* <div onClick={() => setIsCommentModalOpen(true)}>
              <Icon source={ChatIcon} tone="success" />
            </div> */}
            <Icon source={ShareIcon} tone="base" />
          </div>
        </MediaCard>

        <Card>
          <Text as="h4">Comments</Text>
          <Card></Card>
        </Card>
        <Footer />
      </BlockStack>
    </Page>
  );
};

export default SingleBlogPage;
