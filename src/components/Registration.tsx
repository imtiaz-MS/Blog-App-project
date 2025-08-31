import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Icon,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { MobileIcon, ViewIcon } from "@shopify/polaris-icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useRegistration } from "../hooks/mutation/useRegistrationMutation";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<RegistrationFromValues>({ mode: "onChange" });

  // use registration hook
  const mutation = useRegistration();

  interface RegistrationFromValues {
    name: string;
    phone: string;
    password: string;
  }
  const onsubmit = async (data: RegistrationFromValues) => {
    console.log(data);
    mutation.mutate({
      name: data.name,
      phone: data.phone,
      password: data.password,
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f6f6f7] to-[#e8e8ea]">
      <div className="max-w-[400px] w-full">
        <Card>
          <Box paddingBlockEnd="400">
            <BlockStack>
              <Text
                as="h1"
                variant="heading2xl"
                alignment="center"
                tone="magic"
              >
                Blogger
              </Text>
              <Text as="p" variant="bodyMd" alignment="center" tone="subdued">
                Registration to continue
              </Text>
            </BlockStack>
          </Box>
          <Divider />
          <Box padding="600">
            <form onSubmit={handleSubmit(onsubmit)}>
              <BlockStack gap="500">
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      label="Name"
                      type="text"
                      placeholder="Enter your name"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors?.name?.message as string}
                      autoComplete=""
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?\d{11}$/,
                      message: "Please enter a valid phone number",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      label="Phone number"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors?.phone?.message as string}
                      autoComplete="tel"
                      prefix={<Icon source={MobileIcon} />}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors?.password?.message as string}
                      autoComplete="current-password"
                      suffix={
                        <Button
                          variant="plain"
                          size="slim"
                          onClick={() => setShowPassword(!showPassword)}
                          ariaLabel={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          <Icon source={ViewIcon} tone="base" />
                        </Button>
                      }
                    />
                  )}
                />

                <BlockStack gap="400">
                  <Button
                    variant="primary"
                    size="large"
                    fullWidth
                    submit
                    loading={mutation.isPending}
                    disabled={!isValid}
                  >
                    "Registration
                  </Button>
                </BlockStack>
              </BlockStack>
            </form>
          </Box>
          <Divider />
          <Box paddingBlockStart="400">
            <InlineStack align="center" gap={"200"} blockAlign="center">
              <Text as="p" variant="bodyMd" tone="subdued">
                Already have an account?
              </Text>
              <NavLink to="/login">
                <Button variant="plain">Sign in</Button>
              </NavLink>
            </InlineStack>
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default Registration;
