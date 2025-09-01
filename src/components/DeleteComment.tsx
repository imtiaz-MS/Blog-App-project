import { Modal, Text } from "@shopify/polaris";
import { useContext } from "react";
import { BlogContext } from "../useContex/BlogContext";
import { useDeleteComment } from "../hooks/mutation/useDeleteCommentMutation";
import { toast } from "react-toastify";

const DeleteComment = ({ comment }) => {
  const blogContext = useContext(BlogContext);
  if (!blogContext) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  const { isDeleteModalOpen, setIsDeleteModalOpen } = blogContext;

  const handleClose = () => {
    setIsDeleteModalOpen(false);
  };

  // delete Custom Hook
  const mutation = useDeleteComment();
  //deleteBtnHandler
  const deleteBtnHandler = () => {
    mutation.mutate(comment._id);

    setIsDeleteModalOpen(false);
  };
  return (
    <Modal
      onClose={handleClose}
      open={isDeleteModalOpen}
      title="Delete Comment"
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
          Are you sure you want to delete this Comment?
        </Text>
        <Text variant="bodyMd" as="p" tone="subdued">
          This comment will be permanently removed and cannot be recovered.
        </Text>
      </Modal.Section>
    </Modal>
  );
};

export default DeleteComment;
