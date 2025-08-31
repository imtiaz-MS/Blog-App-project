import {
  ActionList,
  Avatar,
  Button,
  Card,
  Icon,
  InlineStack,
  Popover,
} from "@shopify/polaris";
import { ClipboardIcon, EnterIcon } from "@shopify/polaris-icons";
import { useCallback, useContext, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { BlogContext } from "../useContex/BlogContext";

const HomeTopBar = () => {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const navigate = useNavigate();
  const blogContext = useContext(BlogContext);
  if (!blogContext) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  const { setIsAddModalOpen } = blogContext;
  const { setIsMyBlogOpen } = blogContext;

  const logOutBtnHandler = () => {
    navigate("/logIn", { replace: true });
    localStorage.removeItem("loginToken");
    return;
  };

  return (
    <>
      <Card>
        <InlineStack align="space-between" blockAlign="center">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img
              src="/src/images/Blogger-Logo.png"
              width="100px"
              alt="Blogger logo"
            />
          </div>

          <InlineStack align="space-between" gap={"300"}>
            <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
              + Add Blog
            </Button>
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
                    content: "Profile",
                    variant: "menu",
                    prefix: <Avatar />,
                    // onAction: () => navigate(),
                  },
                ]}
              />
              <ActionList
                actionRole="menuitem"
                items={[
                  {
                    content: "My blog",
                    variant: "menu",
                    prefix: <Icon source={ClipboardIcon} />,
                    onAction: () => {
                      navigate("/myblog");
                      setIsMyBlogOpen(true);
                    },
                  },
                ]}
              />
              <ActionList
                actionRole="menuitem"
                items={[
                  {
                    content: "Home",
                    variant: "menu",
                    prefix: <Icon source={ClipboardIcon} />,
                    onAction: () => navigate("/"),
                  },
                ]}
              />
              <ActionList
                actionRole="menuitem"
                items={[
                  {
                    content: "Log out",
                    destructive: true,
                    variant: "menu",
                    prefix: <Icon source={EnterIcon} tone="base" />,
                    onAction: logOutBtnHandler,
                  },
                ]}
              />
            </Popover>
          </InlineStack>
        </InlineStack>
      </Card>
    </>
  );
};

export default HomeTopBar;
