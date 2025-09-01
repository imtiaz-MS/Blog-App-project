import { BlockStack, Page } from "@shopify/polaris";
import HomeTopBar from "./HomeTopBar";
import MyBlogBody from "./MyBlogBody";
import Footer from "./Footer";

const MyBlog = () => {
  return (
    <Page>
      <BlockStack gap={"200"}>
        <HomeTopBar />
        <MyBlogBody />
        <Footer />
      </BlockStack>
    </Page>
  );
};

export default MyBlog;
