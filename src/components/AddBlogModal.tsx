import { Modal, Select, TextField } from "@shopify/polaris";
import { useContext } from "react";
import { BlogContext } from "../useContex/BlogContext";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { useAddBlog } from "../hooks/useMutationHooks";
export const AddBlogModal = () => {
  const blogContext = useContext(BlogContext);
  if (!blogContext) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  const { isAddModalOpen, setIsAddModalOpen } = blogContext;

  const handleClose = () => {
    setIsAddModalOpen(false);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // addBlog Custom Hook
  const mutation = useAddBlog();

  const onsubmit = (data: FieldValues) => {
    setIsAddModalOpen(false);
    mutation.mutate({
      title: data.addBlog,
      description: data.description,
      category: data.category,
      url: String(data.url),
    });
  };
  return (
    <Modal
      onClose={handleClose}
      open={isAddModalOpen}
      title="Add New Blog"
      primaryAction={{
        content: "Add",
        onAction: handleSubmit(onsubmit),
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleClose,
        },
      ]}
    >
      <Modal.Section>
        <Controller
          name="addBlog"
          control={control}
          rules={{
            required: { value: true, message: "this field is requiered" },
          }}
          render={({ field }) => (
            <TextField
              label="Title:"
              placeholder="Blog Title"
              type="text"
              value={field.value}
              onChange={field.onChange}
              autoComplete=""
              error={errors?.addBlog?.message as string}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{
            required: { value: true, message: "this field is requiered" },
          }}
          render={({ field }) => (
            <TextField
              label="Description :"
              placeholder="Write blog description"
              type="text"
              value={field.value}
              onChange={field.onChange}
              autoComplete=""
              error={errors?.addBlog?.message as string}
              multiline={5}
            />
          )}
        />
        <Controller
          name="url"
          control={control}
          rules={{
            required: { value: true, message: "this field is requiered" },
          }}
          render={({ field }) => (
            <TextField
              label="Image Url:"
              placeholder="add a img url"
              type="url"
              value={field.value}
              onChange={field.onChange}
              autoComplete=""
              error={errors?.addBlog?.message as string}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This field is requierd",
            },
          }}
          render={({ field }) => (
            <Select
              label="Category"
              placeholder="Select your Category"
              value={field.value}
              onChange={field.onChange}
              error={errors?.select?.message as string}
              options={[
                {
                  value: "Technology & Gadgets",
                  label: "Technology & Gadgets",
                },
                { value: "Food & Cooking", label: "Food & Cooking" },
                {
                  value: "Education & Learning",
                  label: "Education & Learning",
                },
                { value: "Other", label: "Other" },
              ]}
            />
          )}
        />
      </Modal.Section>
    </Modal>
  );
};
