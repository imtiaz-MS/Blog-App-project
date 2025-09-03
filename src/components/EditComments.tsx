import { Modal, TextField } from "@shopify/polaris";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { BlogContext } from "../useContex/BlogContext";
import { useEditcomment } from "../hooks/mutation/useEditCommentMutation";

const EditComments = ({ comment }) => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("Error find in EditBlogModal");
  const { isEditModalOpen, setIsEditModalOpen } = context;

  // from hook for edit blog
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: comment?.comment || "",
    },
  });

  // custom hook for edit blog
  const mutation = useEditcomment();
  const onsubmit = (data) => {
    mutation.mutate({
      id: comment._id,
      updatedData: {
        comment: data.comment,
      },
    });
    setIsEditModalOpen(false);
  };

  return (
    <Modal
      onClose={() => setIsEditModalOpen(false)}
      open={isEditModalOpen}
      title="Edit Comment"
      primaryAction={{
        content: "Save",
        onAction: handleSubmit(onsubmit),
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => setIsEditModalOpen(false),
        },
      ]}
    >
      <Modal.Section>
        <Controller
          name="comment"
          control={control}
          rules={{
            required: { value: true, message: "this field is requiered" },
          }}
          render={({ field }) => (
            <TextField
              label=""
              type="text"
              value={field.value}
              onChange={field.onChange}
              autoComplete=""
              error={errors?.addBlog?.message as string}
            />
          )}
        />
      </Modal.Section>
    </Modal>
  );
};

export default EditComments;
