import { Button } from "antd";
import { useEffect, useRef, useState, SetStateAction } from "react";
import Basket, { BasketTotals } from "../components/basket/basket";
import CheckoutSelectParticipants, {
  CheckoutSelectParticipantsHandles,
} from "../components/checkout/checkout-01-select-participants";
import CheckoutAdditionalProducts, {
  CheckoutAdditionalProductsHandles,
} from "../components/checkout/checkout-02-additional-products";
import CheckoutMedicalInfo, {
  CheckoutMedicalInfoHandles,
} from "../components/checkout/checkout-03-medical-information";
import CheckoutEmergencyContacts, {
  CheckoutEmergencyContactsHandles,
} from "../components/checkout/checkout-04-emergency-contacts";
import CheckoutConsentForms, {
  CheckoutConsentFormsHandles,
} from "../components/checkout/checkout-05-consent-forms";
import CheckoutAdditionalForms, {
  CheckoutAdditionalFormsHandles,
} from "../components/checkout/checkout-06-additional-forms";
import CheckoutUploadFiles, {
  CheckoutUploadFilesHandles,
} from "../components/checkout/checkout-07-upload-files";
import CheckoutPayment, {
  CheckoutPaymentHandles,
} from "../components/checkout/checkout-08-payment";
import { FormButton, FormButtonType } from "../components/form-button";
import CheckoutTimer from "../components/checkout/checkout-timer";
import Header from "../components/header";
import Main from "../components/main";
import Wrapper from "../components/wrapper";
import { useBasketContext } from "../components/basket/basket-context";
import Steps from "../components/steps";

export const Checkout: React.FC = () => {
  const selectParticipantsRef = useRef<CheckoutSelectParticipantsHandles>(null);
  const additionalProductsRef = useRef<CheckoutAdditionalProductsHandles>(null);
  const checkoutMedicalInfoRef = useRef<CheckoutMedicalInfoHandles>(null);
  const checkoutEmergencyContactsRef =
    useRef<CheckoutEmergencyContactsHandles>(null);
  const CheckoutConsentFormsRef = useRef<CheckoutConsentFormsHandles>(null);
  const CheckoutAdditionalFormsRef =
    useRef<CheckoutAdditionalFormsHandles>(null);
  const CheckoutUploadFilesRef = useRef<CheckoutUploadFilesHandles>(null);
  const CheckoutPaymentRef = useRef<CheckoutPaymentHandles>(null);

  const stepsData = [
    {
      Component: CheckoutSelectParticipants,
      ref: selectParticipantsRef,
      title: "Who are you buying for",
      subtitle: "Please select who you are purchasing each product for",
      buttonType: "continue",
    },
    {
      Component: CheckoutAdditionalProducts,
      ref: additionalProductsRef,
      title: "Required items",
      subtitle:
        "Please review the required add-ons for the items in your basket",
      buttonType: "continue",
    },
    {
      Component: CheckoutMedicalInfo,
      ref: checkoutMedicalInfoRef,
      title: "Medical information",
      subtitle: "Please review the medical information for all participants",
      buttonType: "continue",
    },
    {
      Component: CheckoutEmergencyContacts,
      ref: checkoutEmergencyContactsRef,
      title: "Emergency contacts",
      subtitle: "Review the emergency contacts and add them if required",
      buttonType: "continue",
    },
    {
      Component: CheckoutConsentForms,
      ref: CheckoutConsentFormsRef,
      title: "Consent forms",
      subtitle: "Review the following consent forms for all participants",
      buttonType: "continue",
    },
    {
      Component: CheckoutAdditionalForms,
      ref: CheckoutAdditionalFormsRef,
      title: "Additional info",
      subtitle: "Review the following forms for all of the participants",
      buttonType: "continue",
    },
    {
      Component: CheckoutUploadFiles,
      ref: CheckoutUploadFilesRef,
      title: "Upload files",
      subtitle:
        "Review the following required files for all of the participants",
      buttonType: "continue",
    },
    {
      Component: CheckoutPayment,
      ref: CheckoutPaymentRef,
      title: "Payment",
      subtitle: "Enter your payment details below to complete your order",
      buttonType: "pay",
    },
  ];

  const [activeSteps, setActiveSteps] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7,
  ]); // Define which steps are required (stepData[index])
  const [currentStep, setCurrentStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(currentStep);
  const { openBasket, closeBasket, isOpen } = useBasketContext();

  const renderStepComponent = (stepIndex: number) => {
    const { Component, ref, title, subtitle } = stepsData[stepIndex];
    return (
      <Component
        key={stepIndex}
        ref={ref}
        title={title}
        subtitle={subtitle}
        onFormValidation={(isValid: boolean) =>
          updateValidationStatus(stepIndex, isValid)
        }
      />
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
    if (currentStep < activeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollToTop;
    }
  };

  const totalSteps = stepsData.length;

  return (
    <>
      <Header />
      <CheckoutTimer timer={99} />
      <Main className="lg:divide-x lg:grid lg:grid-cols-4 max-lg:pb-[11rem]">
        <aside className="lg:pr-5 max-lg:hidden">
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
              <div className="mb-5 heading">
                Checkout{" "}
                <span className="text-neutral-500">
                  · Step {currentStep + 1} of {totalSteps}
                </span>
              </div>
              <Steps
                currentStep={currentStep}
                furthestStep={furthestStep}
                steps={stepsData.map((step) => ({ title: step.title }))}
                handleStepClick={handleStepClick}
              />
            </div>
          </div>
        </aside>
        <section className="lg:px-5 lg:col-span-2 lg:text-center">
          <div className="lg:max-w-[22rem] lg:m-auto">
            {activeSteps.map((stepIndex, index) => (
              <div
                key={index}
                className={
                  currentStep === index ? "space-y-4 lg:space-y-6" : "hidden"
                }
              >
                {/* hiding inactive components but rendering them to preserve state during inital dev JT */}
                {renderStepComponent(stepIndex)}
              </div>
            ))}
            <div className="hidden pt-2 mt-4 lg:block lg:mt-6">
              <FormButton
                onClick={submitCurrentForm}
                buttonType={stepsData[currentStep].buttonType as FormButtonType}
              />
            </div>
          </div>
        </section>
        <aside className="hidden lg:pl-5 lg:block">
          <div className="lg:sticky lg:top-4">
            <Basket />
            <div className="pt-5 mt-5 border-t border-neutral-200">
              <BasketTotals />
            </div>
          </div>
        </aside>
      </Main>
      <footer className="fixed bottom-0 left-0 right-0 z-40 py-4 rounded-t-md lg:hidden shadow-t bg-white/95 ring-black/10">
        <Wrapper>
          <Button
            onClick={isOpen ? closeBasket : openBasket}
            shape="circle"
            className="bg-white !rounded-full absolute -top-4 left-1/2 -translate-x-1/2"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className={`transition-all transform relative mx-auto  ${
                isOpen ? " rotate-180 " : " -top-px "
              }`}
              aria-label="Toggle basket"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.25 14.25L12 10.75l-3.25 3.5"
              ></path>
            </svg>
          </Button>
          <div className="space-y-4">
            <BasketTotals />
            <FormButton
              onClick={submitCurrentForm}
              buttonType={stepsData[currentStep].buttonType as FormButtonType}
            />
          </div>
        </Wrapper>
      </footer>
    </>
  );
};

export default Checkout;
