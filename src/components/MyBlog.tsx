import { Page } from "@shopify/polaris";
import HomeTopBar from "./HomeTopBar";
import MyBlogBody from "./MyBlogBody";
import Footer from "./Footer";

const MyBlog = () => {
  return (
    <Page>
      <HomeTopBar />
      <MyBlogBody />
      <Footer />
    </Page>
  );
};

export default MyBlog;
