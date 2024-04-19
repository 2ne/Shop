import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Collapse, Form, Input, Radio, RadioChangeEvent } from "antd";
import FormHeader from "../form-header";
import { useBasketContext } from "../basket/basket-context";
import { MedicalInfo, Participant, medicalInfoFields } from "../../types/types";

export interface CheckoutMedicalInfoHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutMedicalInfoProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutMedicalInfo = forwardRef<
  CheckoutMedicalInfoHandles,
  CheckoutMedicalInfoProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutMedicalInfoProps,
    ref: React.Ref<CheckoutMedicalInfoHandles>
  ) => {
    const { basketItems, addMedicalInfo } = useBasketContext();
    const [medicalInformationForm] = Form.useForm();
    const [medicalFields, setMedicalFields] = useState(false);

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
          await medicalInformationForm.validateFields();
          // If validation is successful, submit the form
          medicalInformationForm.submit();
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

        // Create an object to store the participant's medical information with the correct type
        const medicalInfo: MedicalInfo = {};

        // Loop through each field in the medicalInfoFields array
        medicalInfoFields.forEach((field) => {
          // Get the value for the current field from the form values object
          medicalInfo[field.key as keyof MedicalInfo] =
            values[`participant_${participantId}_${field.key}`];
        });

        // Call the addMedicalInfo function with the participant's ID and the medical info object
        addMedicalInfo(participantId, medicalInfo);
      });

      // Log the basketItems to the console. Show products that are not required
      console.log("Add medical information:", basketItems);
    };

    const onDetailsFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    const onMedicalChange = (e: RadioChangeEvent) => {
      const value = e.target.value;
      if (value === "yes") {
        setMedicalFields(true);
      } else {
        setMedicalFields(false);
        medicalInformationForm.setFieldsValue({ note: "" });
      }
    };

    return (
      <>
        <FormHeader
          title={title}
          subtitle={subtitle}
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 8C9 8.41421 9.33579 8.75 9.75 8.75C10.1642 8.75 10.5 8.41421 10.5 8H9ZM13.5 8C13.5 8.41421 13.8358 8.75 14.25 8.75C14.6642 8.75 15 8.41421 15 8H13.5ZM17.25 19.25L17.25 18.5H17.25V19.25ZM6.75 19.25L6.75 20H6.75V19.25ZM19.25 17.25L20 17.25V17.25H19.25ZM19.25 10L18.5 10V10H19.25ZM17.25 8L17.25 8.75L17.25 8ZM6.75 8L6.75 7.25L6.75 8ZM4.75 10L4 10L4.75 10ZM4.75 17.25L5.5 17.25L4.75 17.25ZM15.25 14.25C15.6642 14.25 16 13.9142 16 13.5C16 13.0858 15.6642 12.75 15.25 12.75V14.25ZM8.75 12.75C8.33579 12.75 8 13.0858 8 13.5C8 13.9142 8.33579 14.25 8.75 14.25V12.75ZM12.75 10.75C12.75 10.3358 12.4142 10 12 10C11.5858 10 11.25 10.3358 11.25 10.75L12.75 10.75ZM11.25 16.25C11.25 16.6642 11.5858 17 12 17C12.4142 17 12.75 16.6642 12.75 16.25H11.25ZM10.75 4.75L10.75 5.5L10.75 4.75ZM9.75 5.75L9 5.75V5.75H9.75ZM13.25 4.75L13.25 4L13.25 4.75ZM14.25 5.75L15 5.75L15 5.75L14.25 5.75ZM13.25 4L10.75 4L10.75 5.5L13.25 5.5L13.25 4ZM9 5.75V8H10.5V5.75H9ZM13.5 5.75V8H15V5.75H13.5ZM17.25 18.5H6.75V20H17.25V18.5ZM20 17.25V10H18.5V17.25H20ZM17.25 7.25L6.75 7.25L6.75 8.75L17.25 8.75L17.25 7.25ZM4 10L4 17.25L5.5 17.25L5.5 10L4 10ZM6.75 7.25C5.23122 7.25 4 8.48122 4 10L5.5 10C5.5 9.30964 6.05964 8.75 6.75 8.75L6.75 7.25ZM20 10C20 8.48122 18.7688 7.25 17.25 7.25L17.25 8.75C17.9404 8.75 18.5 9.30964 18.5 10L20 10ZM6.75 18.5C6.05964 18.5 5.5 17.9404 5.5 17.25L4 17.25C4 18.7688 5.23122 20 6.75 20L6.75 18.5ZM17.25 20C18.7688 20 20 18.7688 20 17.25L18.5 17.25C18.5 17.9404 17.9404 18.5 17.25 18.5L17.25 20ZM15.25 12.75H12V14.25H15.25V12.75ZM12 12.75H8.75V14.25H12V12.75ZM11.25 10.75L11.25 13.5L12.75 13.5L12.75 10.75L11.25 10.75ZM11.25 13.5V16.25H12.75V13.5H11.25ZM10.75 4C9.7835 4 9 4.7835 9 5.75L10.5 5.75C10.5 5.61193 10.6119 5.5 10.75 5.5L10.75 4ZM13.25 5.5C13.3881 5.5 13.5 5.61193 13.5 5.75L15 5.75C15 4.7835 14.2165 4 13.25 4L13.25 5.5Z"
                fill="currentColor"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={medicalInformationForm}
          name="medicalInformationForm"
          onFinish={(values) => onDetailsFinish(values, participants)}
          onFinishFailed={onDetailsFinishFailed}
          className="space-y-6 text-left hide-validation-asterix"
        >
          {participants.map((participant, index) => (
            <div
              key={`participant_${index}`}
              className="p-4 border rounded-md border-neutral-200 [&:has(.ant-form-item-has-error)]:border-error"
            >
              <div className="mb-2 font-medium">
                {participant.firstName} {participant.lastName}
              </div>
              <Form.Item
                name={`participant_${participant.id}`}
                label="Any known disabilities, behavioural conditions, dietary needs, or medications?"
                className="!mb-0.5 [&_.ant-form-item-label]:font-normal"
                rules={[
                  {
                    required: true,
                    message: "Please select an option",
                  },
                ]}
              >
                <Radio.Group
                  className="flex text-center [&>*]:flex-1 mt-1"
                  onChange={(e) => onMedicalChange(e)}
                >
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="yes">Yes</Radio.Button>
                </Radio.Group>
              </Form.Item>
              {medicalFields && (
                <Collapse className="mt-4 pt-0.5">
                  <Collapse.Panel header="Medical information" key="1">
                    {medicalInfoFields
                      .filter((field) => field.group === "medicalInformation")
                      .map((field) => (
                        <Form.Item
                          key={field.key}
                          name={`participant_${participant.id}_${field.key}`}
                          label={field.label}
                          className="!mb-4 last:!mb-1.5"
                        >
                          <Input />
                        </Form.Item>
                      ))}
                  </Collapse.Panel>
                  <Collapse.Panel
                    header="Allergies & dietary requirements"
                    key="2"
                  >
                    {medicalInfoFields
                      .filter((field) => field.group === "allergiesAndDietary")
                      .map((field) => (
                        <Form.Item
                          key={field.key}
                          name={`participant_${participant.id}_${field.key}`}
                          label={field.label}
                          className="!mb-4 last:!mb-1.5"
                        >
                          <Input />
                        </Form.Item>
                      ))}
                  </Collapse.Panel>
                  <Collapse.Panel header="Doctor's details" key="3">
                    {medicalInfoFields
                      .filter((field) => field.group === "doctorsDetails")
                      .map((field) => (
                        <Form.Item
                          key={field.key}
                          name={`participant_${participant.id}_${field.key}`}
                          label={field.label}
                          className="!mb-4 last:!mb-1.5"
                        >
                          <Input />
                        </Form.Item>
                      ))}
                  </Collapse.Panel>
                </Collapse>
              )}
            </div>
          ))}
        </Form>
      </>
    );
  }
);

export default CheckoutMedicalInfo;
