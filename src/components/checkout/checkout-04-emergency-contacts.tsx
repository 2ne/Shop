import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Collapse, Form, Input, Modal } from "antd";
import FormHeader from "../form-header";
import { useBasketContext } from "../basket/basket-context";
import {
  Address,
  emergencyContactFields,
  EmergencyContactField,
  NestedEmergencyContactFields,
} from "../../types/types";

export interface CheckoutEmergencyContactsHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutEmergencyContactsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutEmergencyContacts = forwardRef<
  CheckoutEmergencyContactsHandles,
  CheckoutEmergencyContactsProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutEmergencyContactsProps,
    ref: React.Ref<CheckoutEmergencyContactsHandles>
  ) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [contactAddress, setContactAddress] = useState<{
      [key: number]: Address;
    }>({});
    const [editingContactId, setEditingContactId] = useState<number>(0);
    const { addEmergencyContact } = useBasketContext();
    const [emergencyContactForm] = Form.useForm();
    const [emergencyContactAddressForm] = Form.useForm();
    const emergencyContacts = [{ id: 1 }, { id: 2 }];

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await emergencyContactForm.validateFields();
          // If validation is successful, submit the form
          emergencyContactForm.submit();
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
    const onDetailsFinish = (values: any) => {
      addEmergencyContact();
      console.log("Add medical information:", values);
    };

    const onDetailsFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    function isNestedField(
      field: EmergencyContactField
    ): field is NestedEmergencyContactFields {
      return (field as NestedEmergencyContactFields).fields !== undefined;
    }

    const showModal = (id: number) => {
      setEditingContactId(id);
      setIsModalVisible(true);
    };

    const handleOk = async () => {
      try {
        const values = await emergencyContactAddressForm.validateFields();
        const {
          [`contact_${editingContactId}_address_houseName`]: houseName,
          [`contact_${editingContactId}_address_street`]: street,
          [`contact_${editingContactId}_address_town`]: town,
          [`contact_${editingContactId}_address_county`]: county,
          [`contact_${editingContactId}_address_postcode`]: postcode,
          [`contact_${editingContactId}_address_countryName`]: countryName,
        } = values;

        // Create a new copy of contactAddress object
        const newAddresses = { ...contactAddress };

        // Update the address for the current contact
        newAddresses[editingContactId] = {
          houseName,
          street,
          town,
          county,
          postcode,
          countryName,
        };

        setContactAddress(newAddresses);
        setIsModalVisible(false);
        setEditingContactId(0);
      } catch (errorInfo) {
        console.error("Validation failed:", errorInfo);
      }
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
      <>
        <FormHeader
          title={title}
          subtitle={subtitle}
          requiredText="This product requires 2 emergency contacts"
          icon={
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="7.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></circle>
              <circle
                cx="12"
                cy="12"
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
                d="M7 17l2.5-2.5M17 17l-2.5-2.5M9.5 9.5L7 7M14.5 9.5L17 7"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={emergencyContactForm}
          name="emergencyContactForm"
          onFinish={(values) => onDetailsFinish(values)}
          onFinishFailed={onDetailsFinishFailed}
          className="space-y-6 text-left hide-validation-asterix"
          requiredMark="optional"
        >
          <Collapse
            defaultActiveKey={
              emergencyContacts.length > 0 ? [emergencyContacts[0].id] : []
            }
          >
            {emergencyContacts.map((contact) => {
              const [contactAddressForm] = Form.useForm();
              const [contactName, setContactName] = useState("");
              useEffect(() => {
                const nameFieldValue = emergencyContactForm.getFieldValue(
                  `contact_${contact.id}_name`
                );
                setContactName(
                  nameFieldValue || "Emergency contact " + contact.id
                );
              }, [emergencyContactForm, contact.id]);

              return (
                <Collapse.Panel
                  forceRender={true}
                  header={contactName}
                  key={contact.id}
                  className="[&:has(.ant-form-item-has-error)]:mb-px [&:has(.ant-form-item-has-error)]:ring-1 [&:has(.ant-form-item-has-error)]:ring-error first:rounded-t-[calc(0.375rem+1px)]"
                >
                  {emergencyContactFields.map(
                    (field: EmergencyContactField) => {
                      if (isNestedField(field)) {
                        return (
                          <div key={field.key}>
                            <Form.Item label={field.label}>
                              <Input
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showModal(contact.id);
                                }}
                                readOnly={true}
                                value={
                                  contactAddress[contact.id]
                                    ? `${
                                        contactAddress[contact.id].houseName
                                      }, ${
                                        contactAddress[contact.id].street
                                      }, ${contactAddress[contact.id].town}, ${
                                        contactAddress[contact.id].county
                                      }, ${
                                        contactAddress[contact.id].postcode
                                      }, ${
                                        contactAddress[contact.id].countryName
                                      }`
                                    : ""
                                }
                              />
                            </Form.Item>
                            <Modal
                              width={364}
                              maskClosable={false}
                              title={field.label}
                              open={
                                isModalVisible &&
                                editingContactId === contact.id
                              }
                              onOk={handleOk}
                              onCancel={handleCancel}
                              okText="Add"
                              cancelText="Cancel"
                              centered={true}
                            >
                              {contact.id}
                              <Form
                                layout="vertical"
                                form={contactAddressForm} // Use the form instance specific to the current contact
                                name="emergencyContactAddressForm"
                                className="mb-6 space-y-6 text-left hide-validation-asterix"
                              >
                                {field.fields?.map(
                                  (NestedEmergencyContactFields) => (
                                    <Form.Item
                                      key={NestedEmergencyContactFields.key}
                                      name={`contact_${contact.id}_${field.key}_${NestedEmergencyContactFields.key}`}
                                      label={NestedEmergencyContactFields.label}
                                      className="last:!mb-1.5"
                                      rules={[
                                        {
                                          required:
                                            NestedEmergencyContactFields.required,
                                          message: `Please enter a ${NestedEmergencyContactFields.label.toLowerCase()}.`,
                                        },
                                      ]}
                                      required={
                                        NestedEmergencyContactFields.required
                                      }
                                    >
                                      <Input
                                        type={NestedEmergencyContactFields.type}
                                      />
                                    </Form.Item>
                                  )
                                )}
                              </Form>
                            </Modal>
                          </div>
                        );
                      } else {
                        // Handle the non-nested fields
                        return (
                          <Form.Item
                            key={field.key}
                            name={`contact_${contact.id}_${field.key}`}
                            label={field.label}
                            className="last:!mb-1.5"
                            rules={[
                              {
                                required: field.required,
                                message: `Please enter a ${field.label.toLowerCase()}.`,
                              },
                            ]}
                            required={field.required}
                          >
                            <Input
                              type={field.type}
                              onChange={() => {
                                const nameFieldValue =
                                  emergencyContactForm.getFieldValue(
                                    `contact_${contact.id}_name`
                                  );
                                setContactName(
                                  nameFieldValue ||
                                    "Emergency contact " + contact.id
                                );
                              }}
                            />
                          </Form.Item>
                        );
                      }
                    }
                  )}
                </Collapse.Panel>
              );
            })}
          </Collapse>
        </Form>
      </>
    );
  }
);

export default CheckoutEmergencyContacts;
