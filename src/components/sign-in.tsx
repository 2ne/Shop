import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import type { InputRef } from "antd";
import {
  UserOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { orgLogo, orgName } from "../org";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Motion } from "./framer-motion-custom";
import SignInFAQModal from "./sign-in-faq";

interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessfulLogin: () => void;
}

const SignInModal: React.FC<SignInProps> = ({
  isOpen,
  onClose,
  onSuccessfulLogin,
}) => {
  const [signInForm] = Form.useForm();
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [signInFAQOpen, setSignInFAQOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [resetPasswordForm] = Form.useForm();

  useEffect(() => {
    if (isOpen && emailRef.current) {
      setTimeout(
        () =>
          emailRef.current?.focus({
            cursor: "start",
          }),
        200
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (userExists && passwordRef.current) {
      setTimeout(
        () =>
          passwordRef.current?.focus({
            cursor: "start",
          }),
        200
      );
    }
  }, [userExists]);

  const handleContinue = () => {
    if (email === "jamestoone@gmail.com") {
      setUserExists(true);
      setNewUser(false);
      if (password && password !== "password") {
        setPasswordValidation(true);
      }
      if (password === "password") {
        onClose();
        onSuccessfulLogin();
      }
    } else {
      setNewUser(true);
      setUserExists(false);
      setPasswordValidation(false);
    }
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    handleContinue();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleEmailReset = () => {
    setUserExists(false);
    signInForm.resetFields();
    setTimeout(() => emailRef.current?.focus(), 100);
  };

  const onResetFinish = (values: any) => {
    console.log("Success:", values);
    setResetPasswordOpen(false);
    message.success(
      "Password reset email sent. Make sure to check your spam folder. "
    );
  };

  const onResetFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const navigate = useNavigate();

  return (
    <>
      <Modal width={340} open={isOpen} onCancel={onClose} footer={null}>
        <div className="grid gap-6 px-1 pb-2">
          <div className="pt-8">
            <img
              src={orgLogo}
              alt={orgName + " Logo"}
              className="object-contain w-16 h-16 mx-auto"
              loading="lazy"
            />
          </div>
          <div className="text-center">
            <h2 className="mb-1 text-base font-medium">
              {!userExists ? "Sign in or create a new account" : "Welcome back"}
            </h2>
            <div className="text-base text-neutral-500">
              {!userExists
                ? "Enter your email to continue"
                : "Enter your password to continue"}
            </div>
          </div>
          <Form
            layout="vertical"
            name="basic"
            id="signInForm"
            form={signInForm}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className="mb-6">
              <Button className="flex items-center justify-center w-full mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="24px"
                  height="24px"
                  className="mr-2"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Continue with Google
              </Button>
              <Button className="flex items-center justify-center w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24px"
                  height="24px"
                  className="mr-2"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.55-2.09-.56-3.23 0-1.44.71-2.23.53-3.08-.35C3.14 15.54 3.9 7.5 9.14 7.18c1.4.05 2.37.79 3.13.84 1.14-.28 2.22-.86 3.36-.82 1.61.06 2.8.78 3.57 1.96-3.11 1.8-2.59 5.88.72 7.16-.64 1.39-1.51 2.74-2.87 3.96zM12.03 7c-.15-2.28 1.93-4.08 4.11-4-0.18 2.17-2.12 3.89-4.11 4z" />
                </svg>
                Continue with Apple
              </Button>
            </div>

            <div className="relative">
              <Form.Item
                className={userExists ? "!mb-4" : "!mb-6"}
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Email address is not valid",
                  },
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                ]}
                help={
                  <AnimatePresence>
                    {newUser && !userExists && (
                      <Motion animation="heightInOut">
                        <div className="mt-1 mb-4 text-sm">
                          No JoinIn account found. Try a different email or{" "}
                          <button
                            type="button"
                            onClick={() => {
                              navigate("/CreateAccount", {
                                state: { email: email },
                              });
                              onClose();
                            }}
                            className="link"
                          >
                            create a JoinIn account.
                          </button>
                        </div>
                      </Motion>
                    )}
                  </AnimatePresence>
                }
                validateStatus={newUser ? "error" : ""}
              >
                <Input
                  type="email"
                  ref={emailRef}
                  prefix={<UserOutlined className="w-5 text-neutral-600" />}
                  placeholder="Email address"
                  className="[&>input.ant-input:disabled]:!shadow-[0_0_0_20px_#f5f5f5_inset] [&>input.ant-input]:!shadow-[0_0_0_20px_white_inset] [&>input.ant-input:focus]:!shadow-[0_0_0_20px_white_inset]"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={userExists}
                />
              </Form.Item>
              {userExists && (
                <Button
                  onClick={handleEmailReset}
                  size="small"
                  type="text"
                  icon={<CloseCircleOutlined className="mr-px" />}
                  className="!w-auto !h-auto !p-0 !bg-transparent text-neutral-500 hover:text-neutral-700 active:text-neutral-800 absolute right-2.5 top-2 z-20"
                ></Button>
              )}
            </div>
            <AnimatePresence>
              {userExists && (
                <Motion animation="heightInOut">
                  <Form.Item
                    name="password"
                    help={
                      passwordValidation &&
                      "Your email or password is incorrect"
                    }
                    validateStatus={passwordValidation ? "error" : ""}
                    className="!mb-6"
                  >
                    <Input.Password
                      ref={passwordRef}
                      prefix={<LockOutlined className="w-5 text-neutral-600" />}
                      placeholder="Password"
                      className="[&>input.ant-input]:!shadow-[0_0_0_20px_white_inset] [&>input.ant-input:focus]:!shadow-[0_0_0_20px_white_inset]"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                </Motion>
              )}
            </AnimatePresence>
            <Form.Item className="!mb-0">
              <Button key="submit" type="primary" block htmlType="submit">
                Continue
              </Button>
            </Form.Item>
          </Form>
          {userExists && (
            <div className="flex justify-between -mt-1 -mb-1">
              <Button
                type="link"
                className="h-auto p-0 m-0"
                onClick={() => setSignInFAQOpen(true)}
              >
                Trouble signing in?
              </Button>
              <Button
                type="link"
                className="h-auto p-0 m-0"
                onClick={() => setResetPasswordOpen(true)}
              >
                Reset password
              </Button>
            </div>
          )}
        </div>
      </Modal>
      <Modal
        width={340}
        open={resetPasswordOpen}
        onCancel={() => setResetPasswordOpen(false)}
        footer={null}
        style={{ top: 152 }}
      >
        <div className="grid gap-6 px-1 pb-2">
          <div className="pt-8">
            <img
              src={orgLogo}
              alt={orgName + " Logo"}
              className="object-contain h-16 mx-auto w-15"
              loading="lazy"
            />
          </div>
          <div className="text-center">
            <h2 className="mb-1 text-base font-medium">Reset Password</h2>
            <div className="text-sm text-neutral-500">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </div>
          </div>
          <Form
            layout="vertical"
            name="basic"
            id="resetPasswordForm"
            form={resetPasswordForm}
            onFinish={onResetFinish}
            onFinishFailed={onResetFinishFailed}
          >
            <Form.Item
              name="current-email"
              rules={[
                {
                  type: "email",
                  message: "Email address is not valid",
                },
                {
                  required: true,
                  message: "Please enter your email address",
                },
              ]}
            >
              <Input
                type="email"
                prefix={<UserOutlined className="w-5 text-neutral-600" />}
                placeholder="Email address"
                className="[&>input.ant-input:disabled]:!shadow-[0_0_0_20px_#f5f5f5_inset] [&>input.ant-input]:!shadow-[0_0_0_20px_white_inset] [&>input.ant-input:focus]:!shadow-[0_0_0_20px_white_inset]"
              />
            </Form.Item>
            <Form.Item className="!mb-0">
              <Button key="submit" type="primary" block htmlType="submit">
                Reset password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <SignInFAQModal
        isOpen={signInFAQOpen}
        onClose={() => setSignInFAQOpen(false)}
      />
    </>
  );
};

export default SignInModal;
