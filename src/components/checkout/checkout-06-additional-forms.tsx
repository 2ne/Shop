import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Modal } from "antd";
import FormHeader from "../form-header";
import { useBasketContext } from "../basket/basket-context";
import { Participant } from "../../types/types";

export interface CheckoutAdditionalFormsHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutAdditionalFormsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutAdditionalForms = forwardRef<
  CheckoutAdditionalFormsHandles,
  CheckoutAdditionalFormsProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutAdditionalFormsProps,
    ref: React.Ref<CheckoutAdditionalFormsHandles>
  ) => {
    const { basketItems } = useBasketContext();
    const [additionalInfoForm] = Form.useForm();
    const [formModal, setFormModal] = useState(false);

    const showFormModal = () => {
      setFormModal(true);
    };

    const formModalCancel = () => {
      setFormModal(false);
    };

    // Create a Set to store unique participant IDs
    const participantIds = new Set<number>();

    // Generate a unique participant list by filtering basket items' participants based on their unique IDs
    const participants = basketItems
      .flatMap((item) => {
        // Get participants from item or use empty array if none
        return item.participants ?? [];
      })
      .filter((participant) => {
        // Keep participant in array if ID is not already in Set, then add ID to Set
        if (!participantIds.has(participant.id)) {
          participantIds.add(participant.id);
          return true;
        }
        // Exclude participant if ID already in Set
        return false;
      });

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await additionalInfoForm.validateFields();
          // If validation is successful, submit the form
          additionalInfoForm.submit();
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
    const onDetailsFinish = (
      values: { [key: string]: any },
      participants: Participant[]
    ) => {
      console.log("TO DO:", basketItems);
    };

    const onDetailsFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    return (
      <>
        <FormHeader
          title={title}
          subtitle={subtitle}
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
                d="M12.25 19.25h-5.3c-1.18 0-2.06-1.04-1.46-2.055C6.363 15.723 8.24 14 12.25 14M14.75 17.75l1.25 1.5 3.25-4.5"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={additionalInfoForm}
          name="additionalInfoForm"
          onFinish={(values) => onDetailsFinish(values, participants)}
          onFinishFailed={onDetailsFinishFailed}
          className="space-y-6 text-left hide-validation-asterix"
          requiredMark="optional"
        >
          {participants.map((participant, index) => (
            <div
              key={`participant_${index}`}
              className="p-4 border rounded-md border-neutral-200 [&:has(.ant-form-item-has-error)]:border-error"
            >
              <div className="pb-4 mb-4 font-medium border-b">
                {participant.firstName} {participant.lastName}
              </div>
              <div className="space-y-5">
                <div>
                  <div className="mb-1 font-medium">
                    British swimming questions
                  </div>
                  <Button
                    type="primary"
                    block
                    className="!bg-success hover:!bg-success/90 gap-0.5"
                    onClick={showFormModal}
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4.75 12A7.25 7.25 0 0112 4.75v0A7.25 7.25 0 0119.25 12v0A7.25 7.25 0 0112 19.25v0A7.25 7.25 0 014.75 12v0z"
                      ></path>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9.75 12.75l.434.924a1 1 0 001.772.073L14.25 9.75"
                      ></path>
                    </svg>
                    <span>View form</span>
                  </Button>
                </div>
                <div>
                  <div className="mb-1 font-medium">
                    Previous coach experience
                  </div>
                  <Button block onClick={showFormModal}>
                    <span>Add information</span>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M10.75 8.75L14.25 12L10.75 15.25"
                      ></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Form>
        <Modal
          title="Terms and Conditions"
          open={formModal}
          onCancel={formModalCancel}
          footer={null}
        >
          SHOW FORM HERE
        </Modal>
      </>
    );
  }
);

export default CheckoutAdditionalForms;
