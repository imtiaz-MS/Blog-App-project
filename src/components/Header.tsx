import {
  ActionList,
  Avatar,
  Card,
  Icon,
  InlineStack,
  Page,
  Popover,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnterIcon } from "@shopify/polaris-icons";
const Header = () => {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const navigate = useNavigate();
  return (
    <Card roundedAbove={false}>
      <InlineStack align="space-between" blockAlign="center">
        <img src="/src/images/Blogger-Logo.png" width="100px" alt="" />

        {/* Avatar with Popover */}
        <Popover
          active={active}
          activator={
            <div onClick={toggleActive} style={{ cursor: "pointer" }}>
              <Avatar />
            </div>
          }
          onClose={toggleActive}
          autofocusTarget="first-node"
        >
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: "Login",
                prefix: <Icon source={EnterIcon} tone="base" />,
                onAction: () => navigate("/login"),
              },
            ]}
          />
        </Popover>
      </InlineStack>
    </Card>
  );
};

export default Header;
