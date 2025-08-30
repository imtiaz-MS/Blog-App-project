import { Page } from "@shopify/polaris";
import DashboardBody from "./DashboardBody";
import Footer from "./Footer";
import Header from "./Header";

const Dasboard = () => {
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
