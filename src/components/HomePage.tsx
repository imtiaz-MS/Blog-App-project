import { BlockStack, Page } from "@shopify/polaris";
import HomePageBody from "./HomePageBody";
import Footer from "./Footer";
import HomeTopBar from "./HomeTopBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthorization } from "../hooks/mutation/useAuthorization";

const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("loginToken");
  // use authorization hook
  const mutation = useAuthorization();
  useEffect(() => {
    if (token) {
      mutation.mutate(token);
    } else {
      navigate("/dashboard");
    }
  }, [token]);
  return (
    <Page>
      <BlockStack gap={"200"}>
        <HomeTopBar />
        <HomePageBody />
        <Footer />
      </BlockStack>
    </Page>
  );
};

export default HomePage;
