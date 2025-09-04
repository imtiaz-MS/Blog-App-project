import { Modal, Select, TextField } from "@shopify/polaris";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { BlogContext } from "../useContex/BlogContext";
import { useEditBlog } from "../hooks/mutation/useEditMutation";

const EditBlogModal = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("Error find in EditBlogModal");
  const { isEditModalOpen, setIsEditModalOpen, selectedBlog } = context;

  // from hook for edit blog
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      addBlog: selectedBlog?.title || "",
      description: selectedBlog?.description || "",
      url: selectedBlog?.url || "",
      category: selectedBlog?.category || "",
    },
  });

  console.log("selected blog>>", selectedBlog._id);
  // custom hook for edit blog
  const mutation = useEditBlog();
  const onsubmit = (data) => {
    mutation.mutate({
      id: selectedBlog._id,
      updatedData: {
        title: data.addBlog,
        description: data.description,
        category: data.category,
        url: String(data.url),
      },
    });
    setIsEditModalOpen(false);
  };

  return (
    <Modal
      onClose={() => setIsEditModalOpen(false)}
      open={isEditModalOpen}
      title="Edit Blog"
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
              error={errors?.category?.message as string}
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

export default EditBlogModal;
