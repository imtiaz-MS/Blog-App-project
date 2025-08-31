import { Page } from "@shopify/polaris";
import DashboardBody from "./DashboardBody";
import Footer from "./Footer";
import Header from "./Header";
import { Navigate } from "react-router-dom";

const Dasboard = () => {
  const token = localStorage.getItem("loginToken");
  // If user is already logged in, redirect to homepage
  if (token) {
    return <Navigate to="/" replace />;
  }
  return (
    <Page>
      <div className="shadow-md">
        <Header />
        <DashboardBody />
        <Footer />
      </div>
    </Page>
  );
};

export default Dasboard;
