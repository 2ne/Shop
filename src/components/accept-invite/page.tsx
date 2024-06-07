import { ReactElement, useImperativeHandle, useState } from "react";
import Breadcrumb from "../breadcrumb";
import Header from "../header";
import Main from "../main";
import Wrapper from "../wrapper";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Checkbox, Form, Input } from "antd";
import FormHeader from "../form-header";
import { Link } from "react-router-dom";
import { CheckboxChangeEvent } from "antd/es/checkbox";

function CreateAccountInvite(): ReactElement {
  const breadcrumbItems = [
    { label: "Create a JoinIn account", link: "/CreateAccountInvite" },
  ];

  const [setPasswordForm] = Form.useForm();
  const [acceptTermsConditions, setAcceptTermsConditions] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleTermsChange = (e: CheckboxChangeEvent) => {
    setAcceptTermsConditions(e.target.checked);
  };

  const handleMarketingChange = (e: CheckboxChangeEvent) => {
    setAcceptMarketing(e.target.checked);
  };

  // This function is called when the form is submitted
  const onDetailsFinish = () => {
    console.log("TO DO");
  };

  const onDetailsFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.5,
      }}
    >
      <Header loggedIn={true} hideButtons={true} />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="grid pb-24 lg:divide-x lg:grid-cols-6 xl:grid-cols-7 xl:pb-12">
        <aside className="lg:pr-5 max-lg:hidden md:col-span-2 lg:col-span-2">
          <div className="lg:sticky lg:top-4">
            <div className="hidden lg:block">
              <div className="mb-3 heading">
                Create a JoinIn account
                <span className="text-neutral-500">
                  <span className="mx-1.5">·</span>
                  <span>Step 1 of 2</span>
                </span>
              </div>
              <div className="mb-6 sub-heading-sm">
                Join North Sheilds FC on JoinIn! Seamlessly manage bookings and
                payments while experiencing our swift checkout and paperless
                solution.
              </div>
              <nav aria-label="Progress">
                <ol role="list" className="overflow-hidden">
                  <li className="pb-8 relative [&:last-child>div]:hidden">
                    <div
                      className="absolute left-3.5 top-8 rounded-full -ml-px mt-0.5 bottom-0.5 w-0.5 bg-neutral-300"
                      aria-hidden="true"
                    />
                    <a
                      href="#"
                      className="relative flex items-start group"
                      aria-current="step"
                    >
                      <span
                        className="flex items-center h-8"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 flex items-center justify-center transition-colors bg-white border-2 rounded-full w-7 h-7 border-interactive group-hover:border-interactive/80">
                          <span
                            className="h-2.5 w-2.5 rounded-full bg-interactive"
                            style={{ opacity: 1, transform: "none" }}
                          />
                        </span>
                      </span>
                      <span className="flex items-center h-8 min-w-0 ml-3">
                        <span className="text-sm font-medium text-interactive">
                          <span className="transition-colors group-hover:underline">
                            Create account
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                  <li className="pb-8 relative [&:last-child>div]:hidden">
                    <div
                      className="absolute left-3.5 top-8 rounded-full -ml-px mt-0.5 bottom-0.5 w-0.5 bg-neutral-300"
                      aria-hidden="true"
                    />
                    <a href="#" className="relative flex items-start group">
                      <span
                        className="flex items-center h-8"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 flex items-center justify-center transition-colors bg-white border-2 rounded-full w-7 h-7 border-neutral-300 group-hover:border-neutral-400" />
                      </span>
                      <span className="flex items-center h-8 min-w-0 ml-3">
                        <span className="text-sm font-medium text-neutral-500">
                          <span className="">Checkout</span>
                        </span>
                      </span>
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </aside>
        <section className="lg:px-5 lg:col-span-4 xl:col-span-5 lg:text-center">
          <div className="lg:max-w-[22rem] lg:m-auto">
            <AnimatePresence mode="wait" initial={false}>
              <div className="space-y-4 lg:space-y-6">
                <FormHeader
                  title="jamestoone@gmail.com"
                  subtitle="Jacob Toone is invited to join the U10 Girls Squad at North Sheilds FC"
                  icon={
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="8"
                        r="3.25"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      ></circle>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12.25 19.25h-5.3c-1.18 0-2.06-1.04-1.46-2.055C6.363 15.723 8.24 14 12.25 14M17 14.75v4.5M19.25 17h-4.5"
                      ></path>
                    </svg>
                  }
                />
                <div className="space-y-4">
                  <div className="relative p-4 space-y-3.5 text-sm text-left bg-white border-l-4 rounded-md shadow border-interactive ring-1 ring-opacity-5 ring-black ">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <img
                        src="https://i.ibb.co/dWTrvXQ/ED3-NSn-XWw-AASf-K1.jpg"
                        alt="U 10 Girls Photo"
                        className="object-contain object-center w-18 h-auto max-h-[3.85rem] rounded-md shadow ring-1 ring-black/5 border-2 border-white"
                      />
                      <div className="grid items-center flex-1 min-w-0">
                        <div>
                          <div className="font-medium">U10 Girls Squad</div>
                          <div className="text-neutral-500">12 months</div>
                          <div className="pt-1.5 mt-auto text-neutral-500/75">
                            £20.00 · per month
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="flex items-center mb-0.5 space-x-1">
                          <span className="text-neutral-500">Player</span>
                          <span className="text-neutral-500">·</span>
                          <span className="font-medium">Jacob Toone</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Form
                    layout="vertical"
                    form={setPasswordForm}
                    name="setPasswordForm"
                    onFinish={onDetailsFinish}
                    onFinishFailed={onDetailsFinishFailed}
                    className="relative p-4 text-sm text-left bg-white rounded-md shadow hide-validation-asterix ring-1 ring-black ring-opacity-5"
                    requiredMark="optional"
                  >
                    <Form.Item
                      className="!mb-2"
                      label="Set password"
                      name="new-password"
                      rules={[
                        { required: true, message: "Please enter a password" },
                      ]}
                    >
                      <Input.Password
                        name="new-password"
                        autoComplete="new-password"
                      />
                    </Form.Item>
                    <Form.Item
                      name="acceptTermsConditions"
                      valuePropName="checked"
                      className="!mb-0"
                      rules={[
                        {
                          required: true,
                          validator: async (_, value) => {
                            if (!value) {
                              return Promise.reject(
                                new Error(
                                  "Please accept terms to create an account"
                                )
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Checkbox
                        onChange={handleTermsChange}
                        checked={acceptTermsConditions}
                      >
                        I agree with the{" "}
                        <Link
                          to="https://ant.design"
                          target="_blank"
                          className="link"
                        >
                          Terms & Conditions
                        </Link>
                      </Checkbox>
                    </Form.Item>
                    <Form.Item
                      className="!mb-0"
                      name="acceptMarketing"
                      valuePropName="checked"
                    >
                      <Checkbox
                        onChange={handleMarketingChange}
                        checked={acceptMarketing}
                      >
                        Receive updates from JoinIn
                      </Checkbox>
                    </Form.Item>
                  </Form>
                </div>
              </div>

              <div className="pt-2 mt-4 max-lg:hidden lg:mt-6">
                <Button
                  className="!bg-emerald-500 hover:!bg-emerald-400"
                  type="primary"
                  block
                  size="large"
                >
                  Create account
                </Button>
              </div>
            </AnimatePresence>
          </div>
        </section>
      </Main>
      <footer className="fixed bottom-0 left-0 right-0 z-40 py-4 rounded-t-md lg:hidden shadow-t bg-white/95 ring-black/10">
        <Wrapper>
          <Button
            className="!bg-emerald-500 hover:!bg-emerald-400"
            type="primary"
            block
            size="large"
          >
            Create account
          </Button>
        </Wrapper>
      </footer>
    </motion.div>
  );
}

export default CreateAccountInvite;
