import {
  BlockStack,
  Button,
  Card,
  InlineStack,
  Text,
  TextField,
  Divider,
  Box,
  Icon,
} from "@shopify/polaris";
import { Controller, useForm } from "react-hook-form";
import { MobileIcon, ViewIcon } from "@shopify/polaris-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLogin } from "../hooks/mutation/useLoginMutation";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useLogin();
  interface LoginFromValues {
    phone: string;
    password: string;
  }
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginFromValues>({ mode: "onChange" });

  const onsubmit = async (data: LoginFromValues) => {
    console.log(data);
    mutation.mutate({
      phone: data.phone,
      password: data.password,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-[#f6f6f7] to-[#e8e8ea]">
      <div className="max-w-[400px] w-full">
        <Card>
          <Box paddingBlockEnd="400">
            <BlockStack gap="200" align="center">
              <Text
                as="h1"
                variant="heading2xl"
                fontWeight="bold"
                alignment="center"
                tone="magic"
              >
                Blogger
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued" alignment="center">
                Sign in to your account to continue
              </Text>
            </BlockStack>
          </Box>

          <Divider />
          <ToastContainer />
          <Box padding="600">
            <form onSubmit={handleSubmit(onsubmit)}>
              <BlockStack gap="500">
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
                    Sign in
                  </Button>
                </BlockStack>
              </BlockStack>
            </form>
          </Box>

          <Divider />

          <Box padding="400">
            <InlineStack align="center" gap="200" blockAlign="center">
              <Text as="p" variant="bodySm" tone="subdued">
                Don't have an account?
              </Text>
              <NavLink to="/registration">
                <Button variant="plain" size="slim">
                  Create account
                </Button>
              </NavLink>
            </InlineStack>
          </Box>
        </Card>

        {/* Additional help text */}
        <Box paddingBlockStart="400">
          <Text as="p" variant="bodySm" tone="subdued" alignment="center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Text>
        </Box>
      </div>
    </div>
  );
};

export default Login;
