import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import FormHeader from "../form-header";
import { orgLogo, orgName } from "../../org";
import Balancer from "react-wrap-balancer";
import { CheckOutlined } from "@ant-design/icons";

export interface CheckoutPaymentHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutPaymentProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutPayment = forwardRef<
  CheckoutPaymentHandles,
  CheckoutPaymentProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutPaymentProps,
    ref: React.Ref<CheckoutPaymentHandles>
  ) => {
    const [editDetailsLondonZurichModal, setEditDetailsLondonZurichModal] =
      useState(false);
    const [paymentForm] = Form.useForm();

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        // Notify the parent component that the form is valid
        onFormValidation(true);

        // Return true to indicate that the form submission was successful
        return true;
      },
    }));

    const onFinish = (values: any) => {
      console.log("Payment form values:", values);
    };

    const [editDetailsLondonZurich] = Form.useForm();

    function handleOk() {
      editDetailsLondonZurich.validateFields().then((values) => {
        console.log("ok");
        setEditDetailsLondonZurichModal(false);
      });
    }

    function handleCancel() {
      console.log("cancel");
      setEditDetailsLondonZurichModal(false);
    }

    return (
      <>
        <FormHeader
          title={title}
          subtitle={subtitle}
          // requiredText="Direct Debits can be used for single, one-time payments. Rest assured that a one-off transaction will not repeat."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 7.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM5 10.25h14M7.75 14.25h2.5M15.75 14.25h.5"
              ></path>
            </svg>
          }
        />
        {/*         <div className="p-6 rounded-md bg-neutral-100">
          <img
            src={orgLogo}
            alt={orgName + " Logo"}
            className="-mt-0.5 block max-h-[3.25rem] sm:max-h-[3.5rem] rounded mx-auto mb-2"
            loading="lazy"
          />
          <div className="pb-4 text-center border-b mb-7 heading border-neutral-200">
            <Balancer>Set up a Direct Debit with CG Swim School</Balancer>
          </div>
          <Form
            form={paymentForm}
            name="paymentForm"
            layout="vertical"
            onFinish={(values) => onFinish(values)}
            className="space-y-6 text-left hide-validation-asterix"
          >
            <Form.Item
              label="Name on the account"
              name="nameOnAccount"
              rules={[
                {
                  required: true,
                  message: "Please enter the name on the account",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
                { required: true, message: "Please enter your email" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Sort code"
              name="sortCode"
              extra="Must be 6 digits long"
              rules={[
                { required: true, message: "Please enter your sort code" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Account number"
              name="accountNumber"
              extra="Must be between 6 and 8 digits long"
              rules={[
                {
                  required: true,
                  message: "Please enter your account number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Post code"
              name="postCode"
              rules={[
                { required: true, message: "Please enter your post code" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item className="pt-2">
              <Button type="primary" block>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.75 11.75a1 1 0 011-1h10.5a1 1 0 011 1v5.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-5.5zM7.75 10.5v-.157c0-1.562-.094-3.302.996-4.42C9.368 5.288 10.374 4.75 12 4.75c1.626 0 2.632.537 3.254 1.174 1.09 1.117.996 2.857.996 4.419v.157"
                  ></path>
                </svg>
                <span>Set up Direct Debit</span>
              </Button>
            </Form.Item>
            <div className="flex items-center justify-center text-center gap-x-1.5">
              <span className="text-sm text-neutral-500/75">Powered by</span>
              <img
                src="./src/assets/Go-Cardles.png"
                alt="GoCardless Logo"
                className="relative block h-[15px] -top-px"
              />
            </div>
          </Form>
        </div>
        <div className="px-6 py-8 rounded-md bg-neutral-100">
          <div className="flex justify-center mt-1 mb-5">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-neutral-200 animate-spin fill-interactive"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="mb-4 font-medium text-center border-neutral-200">
            Setting up Direct Debit...
          </div>
          <div className="flex items-center justify-center text-center gap-x-1.5">
            <span className="text-sm text-neutral-500/75">Powered by</span>
            <img
              src="./src/assets/Go-Cardles.png"
              alt="GoCardless Logo"
              className="relative block h-[15px] -top-px"
            />
          </div>
        </div>
        <div className="px-6 py-8 rounded-md bg-neutral-100">
          <img
            src={orgLogo}
            alt={orgName + " Logo"}
            className="block max-h-[3.25rem] sm:max-h-[3.5rem] rounded mx-auto mb-2"
            loading="lazy"
          />
          <div className="mb-4 font-medium text-center border-neutral-200">
            Direct Debit successfully setup
          </div>
          <div className="flex items-center justify-center text-center gap-x-1.5">
            <span className="text-sm text-neutral-500/75">Powered by</span>
            <img
              src="./src/assets/Go-Cardles.png"
              alt="GoCardless Logo"
              className="relative block h-[15px] -top-px"
            />
          </div>
        </div> */}
        <div className="p-6 rounded-md bg-neutral-100">
          <Form
            form={paymentForm}
            name="paymentForm"
            layout="vertical"
            onFinish={(values) => onFinish(values)}
            className="space-y-6 text-left hide-validation-asterix"
          >
            <Form.Item
              label="Name on card"
              name="nameOnCard"
              rules={[
                {
                  required: true,
                  message: "Please enter the name on the card",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Card number"
              name="cardNumber"
              rules={[
                { required: true, message: "Please enter your card number" },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="flex gap-x-8">
              <Form.Item
                label="Expiry (mm/yyyy)"
                name="expiryDate"
                rules={[
                  { required: true, message: "Please enter the expiry date" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Security code"
                name="securityCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter your security code",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="flex items-center justify-center !mt-0.5 text-center gap-x-2 !-mb-0.5">
              <span className="text-sm text-neutral-500/75">Powered by</span>
              <img
                src="./src/assets/paypal.png"
                alt="PayPal Logo"
                className="relative block h-[23px] top-px"
              />
            </div>
          </Form>
        </div>
        {/*         <div className="p-6 rounded-md bg-neutral-100">
          <img
            src={orgLogo}
            alt={orgName + " Logo"}
            className="-mt-0.5 block max-h-[3.25rem] sm:max-h-[3.5rem] rounded mx-auto mb-2"
            loading="lazy"
          />
          <div className="pb-4 text-center border-b mb-7 heading border-neutral-200">
            <Balancer>Set up a Direct Debit with CG Swim School</Balancer>
          </div>
          <div className="flex pb-4 text-sm text-left border-b mb-7 border-neutral-200">
            <div>
              <div className="-mt-1 font-medium">James Toone</div>
              <div className="text-neutral-600">jamestoone@gmail.com</div>
              <div className="text-neutral-600">28 Longhurst</div>
              <div className="text-neutral-600">RH15 0TG</div>
            </div>
            <div className="ml-auto">
              <Button
                className="bg-white"
                onClick={() => setEditDetailsLondonZurichModal(true)}
              >
                Edit
              </Button>
            </div>
          </div>
          <Form
            form={paymentForm}
            name="paymentForm"
            layout="vertical"
            onFinish={(values) => onFinish(values)}
            className="space-y-6 text-left hide-validation-asterix"
          >
            <Form.Item
              label="Account name"
              name="accountName"
              rules={[
                {
                  required: true,
                  message: "Please enter an account name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Sort code"
              name="sortCode"
              extra="Must be 6 digits long"
              rules={[
                { required: true, message: "Please enter your sort code" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Account number"
              name="accountNumber"
              extra="Must be between 6 and 8 digits long"
              rules={[
                {
                  required: true,
                  message: "Please enter your account number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item className="pt-2">
              <Button type="primary" block>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.75 11.75a1 1 0 011-1h10.5a1 1 0 011 1v5.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-5.5zM7.75 10.5v-.157c0-1.562-.094-3.302.996-4.42C9.368 5.288 10.374 4.75 12 4.75c1.626 0 2.632.537 3.254 1.174 1.09 1.117.996 2.857.996 4.419v.157"
                  ></path>
                </svg>
                <span>Set up Direct Debit</span>
              </Button>
            </Form.Item>
            <div className="flex items-center justify-center text-center gap-x-1.5">
              <span className="text-sm text-neutral-500/75">Powered by</span>
              <img
                src="./src/assets/landz-logo-on-white-1.jpg"
                alt="London & Zurich Logo"
                className="block h-[26px] rounded-md"
              />
            </div>
          </Form>
        </div>
        <div className="px-6 py-8 rounded-md bg-neutral-100">
          <div className="flex justify-center mt-1 mb-5">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-neutral-200 animate-spin fill-interactive"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="mb-4 font-medium text-center border-neutral-200">
            Setting up Direct Debit...
          </div>
          <div className="flex items-center justify-center text-center gap-x-1.5">
            <span className="text-sm text-neutral-500/75">Powered by</span>
            <img
              src="./src/assets/landz-logo-on-white-1.jpg"
              alt="London & Zurich Logo"
              className="block h-[26px] rounded-md"
            />
          </div>
        </div>
        <div className="px-6 py-8 rounded-md bg-neutral-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 h-12 mx-auto -mt-4"
          >
            <path
              fill="currentColor"
              d="M18.5 12a6.5 6.5 0 01-6.5 6.5V20a8 8 0 008-8h-1.5zM12 18.5A6.5 6.5 0 015.5 12H4a8 8 0 008 8v-1.5zM5.5 12A6.5 6.5 0 0112 5.5V4a8 8 0 00-8 8h1.5zM12 5.5a6.5 6.5 0 016.5 6.5H20a8 8 0 00-8-8v1.5z"
            ></path>
            <path
              fill="currentColor"
              d="M9.01 15.127a.75.75 0 101.48.246l-1.48-.246zm4.5.246a.75.75 0 101.48-.246l-1.48.246zm-3.76-.123l.74.124v.003l-.001.003-.001.004v.004l.002-.012a1.12 1.12 0 01.211-.396c.166-.2.515-.48 1.299-.48V13c-1.216 0-1.992.47-2.451 1.02a2.616 2.616 0 00-.51.976 1.797 1.797 0 00-.025.111l-.002.011-.001.005v.002c0 .001 0 .002.739.125zM12 14.5c.784 0 1.133.28 1.299.48a1.12 1.12 0 01.21.396l.004.012v-.004l-.002-.004v-.003-.002c0-.001 0-.002.739-.125l.74-.124v-.001-.002l-.002-.005-.002-.011a.986.986 0 00-.025-.111 2.616 2.616 0 00-.51-.976C13.992 13.47 13.216 13 12 13v1.5zM10 10v1a1 1 0 001-1h-1zm0 0H9a1 1 0 001 1v-1zm0 0V9a1 1 0 00-1 1h1zm0 0h1a1 1 0 00-1-1v1zM14 10v1a1 1 0 001-1h-1zm0 0h-1a1 1 0 001 1v-1zm0 0V9a1 1 0 00-1 1h1zm0 0h1a1 1 0 00-1-1v1z"
            ></path>
          </svg>
          <div className="mb-4 text-center border-neutral-200">
            <p className="mb-4 font-medium leading-6">
              Our system is currently unable to deal with your request
            </p>
            <p className="text-sm">
              Your Direct Debit has not been created. For any queries contact
              our help desk on{" "}
              <span className="whitespace-nowrap">0121 234 7999</span>.
            </p>
          </div>
          <div className="flex items-center justify-center text-center gap-x-1.5">
            <span className="text-sm text-neutral-500/75">Powered by</span>
            <img
              src="./src/assets/landz-logo-on-white-1.jpg"
              alt="London & Zurich Logo"
              className="block h-[26px] rounded-md"
            />
          </div>
        </div>
        <div className="px-6 py-8 rounded-md bg-neutral-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 h-12 mx-auto -mt-4"
          >
            <path
              fill="currentColor"
              d="M18.5 12a6.5 6.5 0 01-6.5 6.5V20a8 8 0 008-8h-1.5zM12 18.5A6.5 6.5 0 015.5 12H4a8 8 0 008 8v-1.5zM5.5 12A6.5 6.5 0 0112 5.5V4a8 8 0 00-8 8h1.5zM12 5.5a6.5 6.5 0 016.5 6.5H20a8 8 0 00-8-8v1.5z"
            ></path>
            <path
              fill="currentColor"
              d="M9.01 15.127a.75.75 0 101.48.246l-1.48-.246zm4.5.246a.75.75 0 101.48-.246l-1.48.246zm-3.76-.123l.74.124v.003l-.001.003-.001.004v.004l.002-.012a1.12 1.12 0 01.211-.396c.166-.2.515-.48 1.299-.48V13c-1.216 0-1.992.47-2.451 1.02a2.616 2.616 0 00-.51.976 1.797 1.797 0 00-.025.111l-.002.011-.001.005v.002c0 .001 0 .002.739.125zM12 14.5c.784 0 1.133.28 1.299.48a1.12 1.12 0 01.21.396l.004.012v-.004l-.002-.004v-.003-.002c0-.001 0-.002.739-.125l.74-.124v-.001-.002l-.002-.005-.002-.011a.986.986 0 00-.025-.111 2.616 2.616 0 00-.51-.976C13.992 13.47 13.216 13 12 13v1.5zM10 10v1a1 1 0 001-1h-1zm0 0H9a1 1 0 001 1v-1zm0 0V9a1 1 0 00-1 1h1zm0 0h1a1 1 0 00-1-1v1zM14 10v1a1 1 0 001-1h-1zm0 0h-1a1 1 0 001 1v-1zm0 0V9a1 1 0 00-1 1h1zm0 0h1a1 1 0 00-1-1v1z"
            ></path>
          </svg>
          <div className="mb-4 text-center border-neutral-200">
            <p className="mb-4 font-medium leading-6">
              Our system is currently unable to deal with your request
            </p>
            <p className="text-sm">
              Your Direct Debit has not been created. For any queries contact
              our help desk on{" "}
              <span className="whitespace-nowrap">0121 234 7999</span>.
            </p>
          </div>
          <div className="flex items-center justify-center text-center gap-x-1.5">
            <span className="text-sm text-neutral-500/75">Powered by</span>
            <img
              src="./src/assets/landz-logo-on-white-1.jpg"
              alt="London & Zurich Logo"
              className="block h-[26px] rounded-md"
            />
          </div>
        </div>
        <div className="px-6 py-8 rounded-md bg-neutral-100">
          <img
            src={orgLogo}
            alt={orgName + " Logo"}
            className="block max-h-[3.25rem] sm:max-h-[3.5rem] rounded mx-auto mb-2"
            loading="lazy"
          />
          <div className="mb-4 font-medium text-center border-neutral-200">
            Confirm your Direct Debit agreement
          </div>
          <p className="mb-6 text-sm border-neutral-200">
            Please review your agreement with Longon & Zurich{" "}
            <a className="link">Here</a>. Upon confirmation of your agreement, a
            copy will be sent to your email.
          </p>
          <Button
            type="primary"
            block
            className="!bg-emerald-500 hover:!bg-emerald-400"
            icon={<CheckOutlined />}
          >
            Confirm
          </Button>
        </div>
        <div className="grid place-items-center aspect-square">
          <div className="grid gap-4 place-items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-neutral-200 animate-spin fill-interactive"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <div className="text-lg font-bold">Processing your order</div>
          </div>
        </div>
        <div className="mb-14">
          <div className="justify-center hidden mb-2.5 lg:flex">
            <i className="w-[3.25rem] h-[3.25rem] p-[calc(0.5rem+1px)] rounded-full bg-emerald-100/75 flex items-center justify-center border-4 border-white/50 text-emerald-700">
              <CheckOutlined />
            </i>
          </div>

          <div className="mb-24">
            <Balancer className="mb-8">
              <div className="mb-2 heading-lg">Thank you for your order</div>
              <div className="sub-heading">Order number · #483299</div>
              <p className="mt-4 text-sm border-neutral-200">
                We'll send a confirmation email to jtoone@loveadmin.com shortly.
                Please also check your spam folder.
              </p>
            </Balancer>
            <div className="space-y-4">
              <Button type="primary" size="large" block>
                Continue shopping
              </Button>
              <Button size="large" block>
                Sign out
              </Button>
            </div>
          </div>
        </div> */}
        <Modal
          title="Edit details"
          open={editDetailsLondonZurichModal}
          onCancel={handleCancel}
          onOk={handleOk}
          className="max-w-sm"
        >
          <Form
            form={editDetailsLondonZurich}
            name="editDetailsLondonZurichForm"
            layout="vertical"
            className="space-y-6 text-left hide-validation-asterix"
          >
            <Form.Item
              label="First name"
              name="firstName"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email address"
              name="email"
              rules={[
                { required: true, message: "Please enter your email address" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
              className="!mb-8"
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
);

export default CheckoutPayment;
