import { useState } from "react";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import Main from "../components/main";
import Footer from "../components/footer";
import { Button, Form, Input } from "antd";
import Balancer from "react-wrap-balancer";
export default function Contact() {
  const breadcrumbItems = [{ label: "Contact", link: "/Contact" }];
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    setFormSubmitted(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="grid lg:!py-10">
        <div className="w-full max-w-xl px-2 py-6 mx-auto mb-12 bg-white isolate">
          {formSubmitted ? (
            <div className="text-center">
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Message Sent
              </h2>
              <Balancer className="mt-4 text-base sm:text-lg text-neutral-600">
                Thank you for reaching out. We will get back to you as soon as
                possible.
              </Balancer>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                  Enquiry Form
                </h2>
                <Balancer className="mt-4 text-base sm:text-lg text-neutral-600">
                  Looking for more information on the products and services we
                  provide? Send us a message and we will get back to you as
                  quick as possible!
                </Balancer>
              </div>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="mt-12 [&_.ant-input-lg]:border-color-[rgba(0,0,0,0.125)]"
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <Form.Item
                      label="First name"
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your first name",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        autoComplete="given-name"
                        className="w-full"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label="Last name"
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your last name",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        autoComplete="family-name"
                        className="w-full"
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-2">
                    <Form.Item
                      label="Email"
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
                    >
                      <Input
                        size="large"
                        type="email"
                        autoComplete="email"
                        className="w-full"
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-2">
                    <Form.Item
                      label="Mobile number"
                      name="mobileNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your mobile number",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        type="tel"
                        autoComplete="tel"
                        className="w-full"
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-2">
                    <Form.Item
                      label="Message"
                      name="message"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a message",
                        },
                      ]}
                    >
                      <Input.TextArea
                        size="large"
                        rows={4}
                        className="w-full"
                        placeholder="Tell us about which product you are interested in and what information you would like us to provide to you."
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="mt-10">
                  <Form.Item>
                    <Button type="primary" size="large" htmlType="submit" block>
                      Send message
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </>
          )}
        </div>
      </Main>
      <Footer />
    </>
  );
}
