import { Modal, Text } from "@shopify/polaris";
import { useContext } from "react";
import { BlogContext } from "../useContex/BlogContext";
import { toast } from "react-toastify";
import { useDeleteBlog } from "../hooks/mutation/useDeleteMutation";

export const DeleteBlogModal = () => {
  const blogContext = useContext(BlogContext);
  if (!blogContext) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  const { isDeleteModalOpen, setIsDeleteModalOpen, selectedBlog } = blogContext;

  const handleClose = () => {
    setIsDeleteModalOpen(false);
  };

  // delete Custom Hook
  const mutation = useDeleteBlog();

  //deleteBtnHandler
  const deleteBtnHandler = () => {
    mutation.mutate(selectedBlog._id);
    toast.warn(`"${selectedBlog.title}" deleted successfully!`);
    setIsDeleteModalOpen(false);
  };

  console.log("Selected blog for delete>>", selectedBlog._id);

  return (
    <Modal
      onClose={handleClose}
      open={isDeleteModalOpen}
      title="Delete Blog"
      primaryAction={{
        content: "Delete",
        onAction: deleteBtnHandler,
        destructive: true,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleClose,
        },
      ]}
    >
      <Modal.Section>
        <Text variant="headingMd" as="h3">
          Are you sure you want to delete this blog?
        </Text>
        <Text variant="bodyMd" as="p" tone="subdued">
          {selectedBlog?.title ? `"${selectedBlog.title}"` : "This blog"} will
          be permanently removed and cannot be recovered.
        </Text>
      </Modal.Section>
    </Modal>
  );
};
