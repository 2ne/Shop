import React, { useState } from "react";
import { Form, Input, Modal } from "antd";
import DateOfBirthInput from "../dob-input";

export interface AddParticipantValues {
  firstName: string;
  lastName: string;
  dobDD: number;
  dobMM: number;
  dobYYYY: number;
}

interface AddParticipantModalProps {
  openModal: boolean;
  onModalSave: (values: AddParticipantValues) => void;
  onModalCancel: () => void;
}

const AddParticipantModal: React.FC<AddParticipantModalProps> = ({
  openModal: isModalOpen,
  onModalSave: onSave,
  onModalCancel: onCancel,
}) => {
  const [AddParticipantForm] = Form.useForm();
  const [age, setAge] = useState(0);
  const [isDayInvalid, setIsDayInvalid] = useState(false);
  const [isMonthInvalid, setIsMonthInvalid] = useState(false);
  const [isYearInvalid, setIsYearInvalid] = useState(false);
  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth();
  const today = new Date().getDate();
  const [isAfterSubmit, setIsAfterSubmit] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<{
    day: string;
    month: string;
    year: string;
  }>({
    day: "",
    month: "",
    year: "",
  });

  const dateOfBirthValidator = (value: any) => {
    if (isAfterSubmit) {
      // Check if all date fields are empty
      if (
        dateOfBirth.day === "" &&
        dateOfBirth.month === "" &&
        dateOfBirth.year === ""
      ) {
        setIsDayInvalid(true);
        setIsMonthInvalid(true);
        setIsYearInvalid(true);
        return Promise.reject("Please enter a date of birth");
      }

      // Day validation
      if (parseInt(dateOfBirth.day) >= 1 && parseInt(dateOfBirth.day) <= 31) {
        setIsDayInvalid(false);
      } else {
        setIsDayInvalid(true);
        return Promise.reject("Day must be between 01 and 31.");
      }

      // Month validation
      if (
        parseInt(dateOfBirth.month) >= 1 &&
        parseInt(dateOfBirth.month) <= 12
      ) {
        setIsMonthInvalid(false);
      } else {
        setIsMonthInvalid(true);
        return Promise.reject("Month must be between 01 and 12.");
      }

      // Year validation
      if (
        parseInt(dateOfBirth.year) >= 1900 &&
        parseInt(dateOfBirth.year) <= thisYear
      ) {
        setIsYearInvalid(false);
      } else {
        setIsYearInvalid(true);
        return Promise.reject(
          "Year must be between 1900 and the current year."
        );
      }

      if (parseInt(dateOfBirth.year) === thisYear) {
        if (parseInt(dateOfBirth.month) - 1 > thisMonth) {
          // Subtract 1 to make it 0-indexed
          setIsMonthInvalid(true);
          return Promise.reject("Enter a valid month. (This is a future date)");
        }
        if (
          parseInt(dateOfBirth.month) - 1 === thisMonth && // Subtract 1 to make it 0-indexed
          parseInt(dateOfBirth.day) > today
        ) {
          setIsDayInvalid(true);
          return Promise.reject("Enter a valid day. (This is a future date)");
        }
      }
    }
    return Promise.resolve();
  };

  const handleFormSubmit = () => {
    setIsAfterSubmit(true);
    AddParticipantForm.validateFields()
      .then((values) => {
        onSave(values as AddParticipantValues);
        AddParticipantForm.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      width={364}
      maskClosable={false}
      open={isModalOpen}
      title="Add person"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleFormSubmit}
    >
      <Form
        form={AddParticipantForm}
        name="AddParticipantForm"
        layout="vertical"
        className="hide-validation-asterix"
        requiredMark="optional"
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: "Please enter a first name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: "Please enter a last name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          initialValue={dateOfBirth}
          label={
            <div className="flex">
              <div>Date of birth</div>
              {age !== null && (
                <div className="text-neutral-500">
                  <span>
                    <span className="mx-1">·</span>
                    {age} year
                  </span>
                  <span>{age > 1 ? "s" : ""}</span>
                  <span> old</span>
                </div>
              )}
            </div>
          }
          required={true}
          rules={[{ validator: dateOfBirthValidator }]}
          validateStatus="success"
          extra="Example · 30/04/1970"
        >
          <DateOfBirthInput
            setAge={setAge}
            dateOfBirth={dateOfBirth}
            onChange={setDateOfBirth}
            isDayInvalid={isDayInvalid}
            isMonthInvalid={isMonthInvalid}
            isYearInvalid={isYearInvalid}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddParticipantModal;
