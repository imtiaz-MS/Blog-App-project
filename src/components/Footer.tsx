import { Card, Icon, InlineStack, Page, Text } from "@shopify/polaris";
import {
  LogoFacebookIcon,
  LogoInstagramIcon,
  LogoPinterestIcon,
  LogoXIcon,
} from "@shopify/polaris-icons";

const Footer = () => {
  return (
    <Card roundedAbove="sm">
      <InlineStack blockAlign="center" align="space-between">
        <Text as="p" variant="bodyMd" tone="disabled">
          @ All right reserved
        </Text>

        <InlineStack>
          <Icon source={LogoFacebookIcon} tone="info" />
          <Icon source={LogoInstagramIcon} tone="magic" />
          <Icon source={LogoXIcon} tone="primary" />
          <Icon source={LogoPinterestIcon} tone="success" />
        </InlineStack>
      </InlineStack>
    </Card>
  );
};

export default Footer;
