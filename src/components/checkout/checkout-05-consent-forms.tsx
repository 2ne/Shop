import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form, Modal, Switch } from "antd";
import FormHeader from "../form-header";
import { useBasketContext } from "../basket/basket-context";
import { ConsentForm, Participant, consentFormFields } from "../../types/types";

export interface CheckoutConsentFormsHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutConsentFormsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutConsentForms = forwardRef<
  CheckoutConsentFormsHandles,
  CheckoutConsentFormsProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutConsentFormsProps,
    ref: React.Ref<CheckoutConsentFormsHandles>
  ) => {
    const { basketItems, addConsentForm } = useBasketContext();
    const [consentFormsForm] = Form.useForm();
    const [consentModal, setConsentModal] = useState(false);

    const showConsentModal = () => {
      setConsentModal(true);
    };

    const consentModalCancel = () => {
      setConsentModal(false);
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
          await consentFormsForm.validateFields();
          // If validation is successful, submit the form
          consentFormsForm.submit();
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
      // Loop through each participant in the participants array
      participants.forEach((participant) => {
        // Get the participant's ID
        const participantId = participant.id;

        // Create an object to store the participant's consent information with the correct type
        const consentForm: ConsentForm = {
          termsAndConditions: false,
          accessToMedicalInformation: false,
          photography: false,
        };

        // Loop through each field in the consentFormFields array
        consentFormFields.forEach((field) => {
          // Get the value for the current field from the form values object
          consentForm[field.key as keyof ConsentForm] =
            values[`participant_${participantId}_${field.key}`];
        });

        // Call the addConsentForm function with the participant's ID and the consentForm object
        addConsentForm(participantId, consentForm);
      });

      // Log the basketItems to the console. Show products that are not required
      console.log("Add consent information:", basketItems, values);
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
                d="M19.25 12.25v-5.5a2 2 0 00-2-2H6.75a2 2 0 00-2 2v10.5a2 2 0 002 2h4.5m-2.5-10.5h6.5m-6.5 4h6.5m-.5 5l1.5 1.5c.75-2.25 3-3.5 3-3.5"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={consentFormsForm}
          name="consentFormsForm"
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
              {consentFormFields.map((field) => (
                <Form.Item
                  key={field.key}
                  name={`participant_${participant.id}_${field.key}`}
                  labelAlign="left"
                  valuePropName="checked"
                  className="!mb-2 last:!mb-0 [&_.ant-form-item-explain-error]:!-mt-1"
                  required={field.required}
                  initialValue={field.value}
                  rules={[
                    {
                      validator: (_rule, value) => {
                        if (!field.required || value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(field.label + ` required`)
                        );
                      },
                    },
                  ]}
                >
                  <div className="flex items-center">
                    <div className="flex items-center flex-grow gap-x-1">
                      <span>{field.label}</span>
                      {field.content && (
                        <>
                          <span>·</span>
                          <button
                            type="button"
                            className="link"
                            onClick={showConsentModal}
                          >
                            View
                          </button>
                        </>
                      )}
                      {!field.required && (
                        <span className="text-neutral-500">(optional)</span>
                      )}
                    </div>
                    <Switch
                      onChange={(checked: boolean) => {
                        consentFormsForm.setFieldsValue({
                          [`participant_${participant.id}_${field.key}`]:
                            checked,
                        });
                        consentFormsForm.validateFields([
                          `participant_${participant.id}_${field.key}`,
                        ]);
                      }}
                    />
                  </div>
                </Form.Item>
              ))}
            </div>
          ))}
        </Form>
        <Modal
          title="Terms and Conditions"
          open={consentModal}
          onCancel={consentModalCancel}
          footer={null}
        >
          These terms and conditions apply to all members and guests of
          [Swimming Club Name] ("the Club"). By joining the Club or
          participating in any Club activities, you agree to be bound by these
          terms and conditions.
        </Modal>
      </>
    );
  }
);

export default CheckoutConsentForms;
