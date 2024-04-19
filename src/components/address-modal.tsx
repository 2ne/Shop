import React, { useState } from "react";
import { AutoComplete, Form, Input, Modal } from "antd";
import { countries, Country } from "./countries";
import { SearchOutlined } from "@ant-design/icons";

export interface AddressValues {
  addressLineOne: string;
  town: string;
  county: string;
  postcode: string;
  countryName: string;
}

interface AddressModalProps {
  openModal: boolean;
  onModalSave: (values: AddressValues) => void;
  onModalCancel: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  openModal: isModalOpen,
  onModalSave: onSave,
  onModalCancel: onCancel,
}) => {
  const [addressForm] = Form.useForm();
  const [displayCountry, setDisplayCountry] = useState("");
  const checkCountry = () => {
    const validCountry = countries.some(
      (country: Country) => country.label === displayCountry
    );
    return validCountry;
  };
  return (
    <Modal
      width={380}
      maskClosable={false}
      open={isModalOpen}
      title="Add address"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        addressForm
          .validateFields()
          .then((values) => {
            if (!checkCountry()) {
              addressForm.setFields([
                {
                  name: "countryName",
                  errors: ["Please select a valid country"],
                },
              ]);
              return;
            }
            onSave(values as AddressValues);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={addressForm}
        layout="vertical"
        name="addressForm"
        className="mb-6 hide-validation-asterix"
      >
        <Form.Item
          className="max-lg:mt-6 [&_.ant-select-selector]:!p-0 [&_.ant-select-selection-search]:!inset-0 [&_input]:!px-[11px] [&_input]:!rounded-[5px] [&_.ant-select-selection-placeholder]:!px-[11px]"
          label="Country"
          name="countryName"
          rules={[{ required: true, message: "Please select a country" }]}
        >
          <AutoComplete
            placement="bottomLeft"
            autoComplete="new-password"
            value={displayCountry}
            showSearch
            placeholder="Search for country..."
            suffixIcon={<SearchOutlined />}
            allowClear={true}
            options={countries.map((country: Country) => ({
              value: country.label,
              label: (
                <div className="flex items-center gap-2.5 truncate">
                  <div>{country.map}</div>
                  <div>{country.label}</div>
                </div>
              ),
            }))}
            filterOption={(inputValue, option) =>
              option?.value.toLowerCase().includes(inputValue.toLowerCase()) ||
              false
            }
            onSelect={(value, option) => {
              if (option) {
                setDisplayCountry(option.value as string);
                addressForm.setFieldsValue({
                  countryName: option.value,
                });
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label="Address line 1"
          name="addressLineOne"
          rules={[{ required: true, message: "Please enter address line 1" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address line 2" name="addressLineTwo">
          <Input />
        </Form.Item>
        <Form.Item
          label="Town or city"
          name="town"
          rules={[{ required: true, message: "Please enter a town / city" }]}
        >
          <Input />
        </Form.Item>
        <div className="grid-cols-2 gap-5 sm:grid">
          <Form.Item
            className="lg:!mb-0"
            label="County"
            name="county"
            rules={[{ required: true, message: "Please enter a county" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="!mb-0"
            label="Postcode"
            name="postcode"
            rules={[{ required: true, message: "Please enter a post code" }]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddressModal;
