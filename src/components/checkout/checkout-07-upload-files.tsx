import React, { forwardRef, useImperativeHandle } from "react";
import { Form, Modal, Upload, UploadProps, message } from "antd";
import FormHeader from "../form-header";
import { useBasketContext } from "../basket/basket-context";
import { Participant } from "../../types/types";

const { Dragger } = Upload;

export interface CheckoutUploadFilesHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutUploadFilesProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutUploadFiles = forwardRef<
  CheckoutUploadFilesHandles,
  CheckoutUploadFilesProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutUploadFilesProps,
    ref: React.Ref<CheckoutUploadFilesHandles>
  ) => {
    const { basketItems } = useBasketContext();
    const [uploadFilesForm] = Form.useForm();

    const props: UploadProps = {
      name: "file",
      multiple: true,
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
      },
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
          await uploadFilesForm.validateFields();
          // If validation is successful, submit the form
          uploadFilesForm.submit();
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
                d="M6.25 14.25S4.75 14 4.75 12a3.25 3.25 0 013.007-3.241 4.25 4.25 0 018.486 0A3.25 3.25 0 0119.25 12c0 2-1.5 2.25-1.5 2.25"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M14.25 15.25L12 12.75l-2.25 2.5M12 19.25v-5.5"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={uploadFilesForm}
          name="uploadFilesForm"
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
                <div className="">
                  <div className="mb-1 font-medium">
                    Swimming membership card (front)
                  </div>
                  <div>
                    <Dragger {...props} className="group" listType="picture">
                      <div className="px-3 py-2 group">
                        <div className="flex justify-center mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-8 h-8 text-neutral-500"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M6.25 14.25S4.75 14 4.75 12a3.25 3.25 0 013.007-3.241 4.25 4.25 0 018.486 0A3.25 3.25 0 0119.25 12c0 2-1.5 2.25-1.5 2.25"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M14.25 15.25L12 12.75l-2.25 2.5M12 19.25v-5.5"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-sm text-neutral-500">
                          <span className="font-medium text-interactive group-hover:underline">
                            Click to upload
                          </span>{" "}
                          or drag and drop a file
                        </p>
                      </div>
                    </Dragger>
                  </div>
                </div>
                <div className="">
                  <div className="mb-1 font-medium">
                    Swimming membership card (back)
                  </div>
                  <div>
                    <Dragger {...props} className="group" listType="picture">
                      <div className="px-3 py-2">
                        <div className="flex justify-center mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-8 h-8 text-neutral-500"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M6.25 14.25S4.75 14 4.75 12a3.25 3.25 0 013.007-3.241 4.25 4.25 0 018.486 0A3.25 3.25 0 0119.25 12c0 2-1.5 2.25-1.5 2.25"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M14.25 15.25L12 12.75l-2.25 2.5M12 19.25v-5.5"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-sm text-neutral-500">
                          <span className="font-medium text-interactive group-hover:underline">
                            Click to upload
                          </span>{" "}
                          or drag and drop a file
                        </p>
                      </div>
                    </Dragger>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Form>
      </>
    );
  }
);

export default CheckoutUploadFiles;
