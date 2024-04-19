import { useEffect, useRef, useState, SetStateAction } from "react";
import Breadcrumb from "../breadcrumb";
import CreateAccountOwnerForms, {
  CreateAccountOwnerFormsHandles,
} from "./create-account-01-account-owner";
import CreateAccountContactDetailsForms, {
  CreateAccountContactDetailsFormsHandles,
} from "./create-account-02-contact-details";
import CreateAccountPasswordForms, {
  CreateAccountPasswordFormsHandles,
} from "./create-account-03-set-password";
import EmailVerificationForms, {
  EmailVerificationFormsHandles,
} from "./create-account-04-email-verification";
import { FormButton, FormButtonType } from "../form-button";
import Header from "../header";
import Main from "../main";
import Steps from "../steps";
import Wrapper from "../wrapper";
import { AnimatePresence, motion } from "framer-motion";

export const CreateAccountForm: React.FC = () => {
  const accountOwnerRef = useRef<CreateAccountOwnerFormsHandles>(null);
  const contactDetailsRef =
    useRef<CreateAccountContactDetailsFormsHandles>(null);
  const setPasswordRef = useRef<CreateAccountPasswordFormsHandles>(null);
  const emailVerificationRef = useRef<EmailVerificationFormsHandles>(null);
  const breadcrumbItems = [
    { label: "Create a JoinIn account", link: "/CreateAccount" },
  ];

  const stepsData = [
    {
      Component: CreateAccountOwnerForms,
      ref: accountOwnerRef,
      title: "Account owner",
      subtitle:
        "This information will be used to identify you within JoinIn and an organisation",
      buttonType: "continue",
    },
    {
      Component: CreateAccountContactDetailsForms,
      ref: contactDetailsRef,
      title: "Contact details",
      subtitle:
        "Speeds up checkout and allows communication from an organisation",
      buttonType: "continue",
    },
    {
      Component: CreateAccountPasswordForms,
      ref: setPasswordRef,
      title: "Set a password",
      subtitle: "Secure your account and protect your personal information.",
      buttonType: "createAccount",
    },
    {
      Component: EmailVerificationForms,
      ref: emailVerificationRef,
      title: "Email verification",
      subtitle:
        "Account created succesfully. Please check your email. We sent a verification link to jtoone@loveadmin.com",
      buttonType: "verifyAccount",
    },
  ];

  const [activeSteps, setActiveSteps] = useState<number[]>([0, 1, 2]);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([0, 1, 2]);
  const [currentStep, setCurrentStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(currentStep);
  const [hideSteps, setHideSteps] = useState(false);

  const renderStepComponent = (stepIndex: number) => {
    const { Component, ref, title, subtitle } = stepsData[stepIndex];
    return (
      <>
        <Component
          key={stepIndex}
          ref={ref}
          title={title}
          subtitle={subtitle}
          onFormValidation={(isValid: boolean) =>
            updateValidationStatus(stepIndex, isValid)
          }
        />
        <div className="pt-2 mt-4 max-lg:hidden lg:mt-6">
          <FormButton
            onClick={submitCurrentForm}
            buttonType={stepsData[currentStep].buttonType as FormButtonType}
          />
        </div>
      </>
    );
  };

  // This useEffect hook updates the furthestStep state when the currentStep changes
  // Checks if the current step is greater than the furthest step reached so far, if so it updates the furthestStep state to the currentStep value
  useEffect(() => {
    if (currentStep > furthestStep) {
      setFurthestStep(currentStep);
    }
  }, [currentStep]);

  // Create a state to store the validation status of each step
  // The initial state is an array of boolean values with the same length as 'activeSteps'
  // Each step's initial validation status is set to 'false'
  const [validationStatus, setValidationStatus] = useState<boolean[]>(
    Array(activeSteps.length).fill(false)
  );

  const updateValidationStatus = (stepIndex: number, isValid: boolean) => {
    // Update the 'validationStatus' state based on the step index and validation status
    setValidationStatus((prevStatus) => {
      // Create a new array from the previous validation status array
      const newStatus = [...prevStatus];
      // Update the validation status of the specific step with the new validation status
      newStatus[stepIndex] = isValid;
      // Return the updated validation status array
      return newStatus;
    });
  };

  // This function submits the form for the current step
  const submitCurrentForm = async () => {
    let result = false;

    // Retrieve the ref for the current step
    const currentStepRef = stepsData[currentStep].ref;

    // Check if the ref and its current property exist
    if (currentStepRef && currentStepRef.current) {
      // Call the submitForm function for the current step and store the result
      result = await currentStepRef.current.submitForm();
    }

    // If the form submission was successful, move to the next step
    if (result) {
      handleNext();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const handleStepClick = (stepIndex: SetStateAction<number>) => {
    setCurrentStep(stepIndex);
    scrollToTop;
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToTop;
    }
  };

  const handleNext = () => {
    if (currentStep < visibleSteps.length) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
      if (currentStep === 2) {
        setActiveSteps([3]); // Set only the 4th step as active
        setVisibleSteps([3]); // Show only the 4th step
        setCurrentStep(0); // Reset the current step to match the index in the new activeSteps array
        setHideSteps(true);
      }
    }
  };

  const totalSteps = stepsData.length;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.5,
      }}
    >
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="grid pb-24 lg:divide-x lg:grid-cols-6 xl:grid-cols-7 xl:pb-12">
        <aside className="lg:pr-5 max-lg:hidden md:col-span-2 lg:col-span-2">
          <div className="lg:sticky lg:top-4">
            <div className="flex items-center justify-between -mt-1.5 lg:hidden h-6 mb-2">
              {currentStep > 0 && (
                <button
                  type="button"
                  className="flex items-center -ml-2 text-sm"
                  onClick={handlePrev}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.25"
                      d="M13.25 8.75L9.75 12l3.5 3.25"
                    ></path>
                  </svg>
                  <div className="-ml-0.5">Back</div>
                </button>
              )}
              <div className="!text-sm lg:hidden sub-heading">
                Step {currentStep + 1} of {activeSteps.length}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="mb-3 heading">
                Create a JoinIn account
                <span className="text-neutral-500">
                  <span className="mx-1.5">·</span>
                  <span>
                    Step {currentStep + 1} of {visibleSteps.length}
                  </span>
                </span>
              </div>
              <div className="mb-6 sub-heading-sm">
                Join CG Swim School on JoinIn! Seamlessly manage bookings and
                payments while experiencing our swift checkout and paperless
                solution.
              </div>

              <Steps
                currentStep={currentStep}
                furthestStep={furthestStep}
                steps={stepsData.map((step) => ({ title: step.title }))}
                handleStepClick={handleStepClick}
                visibleSteps={visibleSteps}
              />
            </div>
          </div>
        </aside>
        <section className="lg:px-5 lg:col-span-4 xl:col-span-5 lg:text-center">
          <div className="lg:max-w-[22rem] lg:m-auto">
            <AnimatePresence mode="wait" initial={false}>
              {activeSteps.map(
                (stepIndex, index) =>
                  currentStep === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, translateY: 20 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      exit={{ opacity: 0, translateY: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4 lg:space-y-6"
                    >
                      {renderStepComponent(stepIndex)}
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </section>
      </Main>
      <footer className="fixed bottom-0 left-0 right-0 z-40 py-4 rounded-t-md lg:hidden shadow-t bg-white/95 ring-black/10">
        <Wrapper>
          <FormButton
            onClick={submitCurrentForm}
            buttonType={stepsData[currentStep].buttonType as FormButtonType}
          />
        </Wrapper>
      </footer>
    </motion.div>
  );
};

export default CreateAccountForm;
