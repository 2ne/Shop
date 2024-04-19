import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Form, Input, InputRef, Space } from "antd";
import FormHeader from "../form-header";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export interface EmailVerificationFormsHandles {
  submitForm: () => Promise<boolean>;
}

interface EmailVerificationFormsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const EmailVerificationForms = forwardRef<
  EmailVerificationFormsHandles,
  EmailVerificationFormsProps
>(
  (
    { onFormValidation, title, subtitle }: EmailVerificationFormsProps,
    ref: React.Ref<EmailVerificationFormsHandles>
  ) => {
    const [EmailVerificationForm] = Form.useForm();

    // New state variable to control animation
    const [allPinsEntered, setAllPinsEntered] = React.useState(false);
    const [pin1, setPin1] = React.useState("");
    const [pin2, setPin2] = React.useState("");
    const [pin3, setPin3] = React.useState("");
    const [pin4, setPin4] = React.useState("");

    const pin1Ref = useRef<InputRef>(null);
    const pin2Ref = useRef<InputRef>(null);
    const pin3Ref = useRef<InputRef>(null);
    const pin4Ref = useRef<InputRef>(null);

    useEffect(() => {
      if (pin1 && pin2 && pin3 && pin4) {
        setAllPinsEntered(true);
      } else {
        setAllPinsEntered(false);
      }
    }, [pin1, pin2, pin3, pin4]);

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text/plain").trim();

      if (pastedData.length !== 4 || !/^\d+$/.test(pastedData)) {
        return;
      }

      const [p1, p2, p3, p4] = pastedData.split("");

      // Manually update state
      setPin1(p1);
      setPin2(p2);
      setPin3(p3);
      setPin4(p4);

      // Update form values
      EmailVerificationForm.setFieldsValue({
        pin1: p1,
        pin2: p2,
        pin3: p3,
        pin4: p4,
      });

      if (pin4Ref.current) {
        pin4Ref.current.focus();
      }
    };

    const handleBackspace = (
      e: React.KeyboardEvent<HTMLInputElement>,
      pinValue: string,
      currentRef: React.RefObject<InputRef>,
      prevRef: React.RefObject<InputRef> | null
    ) => {
      if (
        e.key === "Backspace" &&
        pinValue === "" &&
        prevRef &&
        prevRef.current
      ) {
        prevRef.current.focus();

        const fieldName =
          prevRef === pin1Ref
            ? "pin1"
            : prevRef === pin2Ref
            ? "pin2"
            : prevRef === pin3Ref
            ? "pin3"
            : "pin4";

        // Clear the previous field
        EmailVerificationForm.setFieldsValue({
          [fieldName]: "",
        });

        // Manually update state based on previous input
        if (fieldName === "pin1") {
          setPin1("");
        } else if (fieldName === "pin2") {
          setPin2("");
        } else if (fieldName === "pin3") {
          setPin3("");
        } else if (fieldName === "pin4") {
          setPin4("");
        }
      }
    };

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await EmailVerificationForm.validateFields();
          // If validation is successful, submit the form
          EmailVerificationForm.submit();
          // Notify the parent component that the form is valid
          onFormValidation(true);
          // Return true to indicate that the form submission was successful
          return true;
        } catch (error) {
          // Log the validation error
          console.log("Validation failed:", error);
          // Notify the parent component that the form is not valid
          onFormValidation(false);
          // Return false to indicate that the form submission failed
          return false;
        }
      },
    }));

    // This function is called when the form is submitted
    const onDetailsFinish = () => {
      console.log("TO DO");
    };

    const onDetailsFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    const handleAnimationComplete = () => {
      setTimeout(() => {
        window.location.href = "/Home?validated=true";
      }, 500);
    };

    return (
      <>
        <FormHeader
          title={title}
          subtitle={subtitle}
          icon={
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 7.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5.5 6.5l6.5 5.75 6.5-5.75"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={EmailVerificationForm}
          name="EmailVerificationForm"
          onFinish={onDetailsFinish}
          onFinishFailed={onDetailsFinishFailed}
          className="text-sm text-left"
          requiredMark="optional"
        >
          <Form.Item
            label="Verification PIN"
            required={true}
            className="mt-8 !mb-2"
          >
            <Space.Compact className="-space-x-px [&_.ant-form-item-label]:sr-only !w-full">
              <Form.Item
                name="pin1"
                label="Pin number 1"
                rules={[{ required: true, message: "" }]}
                className="!mb-0 !w-full"
              >
                <Input
                  disabled={allPinsEntered}
                  ref={pin1Ref}
                  size="large"
                  inputMode="numeric"
                  maxLength={1}
                  className="h-16 text-3xl text-center"
                  onKeyDown={(e) => handleBackspace(e, pin1, pin1Ref, null)}
                  onPaste={handlePaste}
                  onChange={(e) => {
                    setPin1(e.target.value);
                    if (e.target.value && pin2Ref.current) {
                      pin2Ref.current.focus();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                name="pin2"
                label="Pin number 2"
                rules={[{ required: true, message: "" }]}
                className="!mb-0 !w-full"
              >
                <Input
                  disabled={allPinsEntered}
                  ref={pin2Ref}
                  size="large"
                  inputMode="numeric"
                  maxLength={1}
                  className="h-16 text-3xl text-center"
                  onKeyDown={(e) => handleBackspace(e, pin2, pin2Ref, pin1Ref)}
                  onChange={(e) => {
                    setPin2(e.target.value);
                    if (e.target.value && pin3Ref.current) {
                      pin3Ref.current.focus();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                name="pin3"
                label="Pin number 3"
                rules={[{ required: true, message: "" }]}
                className="!mb-0 !w-full"
              >
                <Input
                  disabled={allPinsEntered}
                  ref={pin3Ref}
                  size="large"
                  inputMode="numeric"
                  maxLength={1}
                  className="h-16 text-3xl text-center"
                  onKeyDown={(e) => handleBackspace(e, pin3, pin3Ref, pin2Ref)}
                  onChange={(e) => {
                    setPin3(e.target.value);
                    if (e.target.value && pin4Ref.current) {
                      pin4Ref.current.focus();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                name="pin4"
                label="Pin number 4"
                rules={[{ required: true, message: "" }]}
                className="!mb-0 !w-full"
              >
                <Input
                  disabled={allPinsEntered}
                  ref={pin4Ref}
                  size="large"
                  inputMode="numeric"
                  maxLength={1}
                  className="h-16 text-3xl text-center"
                  onKeyDown={(e) => handleBackspace(e, pin4, pin4Ref, pin3Ref)}
                  onChange={(e) => {
                    setPin4(e.target.value);
                  }}
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          {!allPinsEntered && (
            <div className="sub-heading-sm">
              Didn't receive the email? Check your spam folder or{" "}
              <Link to="#" className="link" tabIndex={-1}>
                click to resend.
              </Link>
            </div>
          )}
        </Form>
        <AnimatePresence>
          {allPinsEntered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 40,
              }}
              className="fixed inset-0 z-50 gap-3 flex items-center justify-center bg-white position !m-0"
            >
              <motion.div
                initial={{ scale: 0, translateY: 20 }}
                animate={{ scale: 1, translateY: 0 }}
                transition={{
                  delay: 1,
                  duration: 0.25,
                  type: "spring",
                  stiffness: 260,
                  damping: 40,
                }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500"
              >
                <motion.svg
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 1.25,
                    duration: 0.25,
                    type: "spring",
                    stiffness: 260,
                    damping: 40,
                  }}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="w-10 h-10"
                >
                  <motion.path
                    initial={{
                      strokeDashoffset: 100,
                      strokeDasharray: 100,
                    }}
                    animate={{
                      strokeDashoffset: 0,
                    }}
                    transition={{
                      delay: 1.25,
                      duration: 2,
                      type: "spring",
                      stiffness: 260,
                      damping: 40,
                    }}
                    onAnimationComplete={handleAnimationComplete}
                    d="M7.75 12.75L10 15.25L16.25 8.75"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fill-transparent"
                  ></motion.path>
                </motion.svg>
              </motion.div>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                transition={{
                  delay: 1.5,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 40,
                }}
                className="overflow-hidden"
              >
                <div className="text-2xl font-medium tracking-wide whitespace-nowrap text-emerald-600/90">
                  Verified
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

export default EmailVerificationForms;
