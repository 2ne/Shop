import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AutoComplete, Form, Input } from "antd";
import FormHeader from "../form-header";
import { countries, Country } from "../countries";
import { SearchOutlined } from "@ant-design/icons";

export interface CreateAccountContactDetailsFormsHandles {
  submitForm: () => Promise<boolean>;
}

interface CreateAccountContactDetailsFormsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CreateAccountContactDetailsForms = forwardRef<
  CreateAccountContactDetailsFormsHandles,
  CreateAccountContactDetailsFormsProps
>(
  (
    {
      onFormValidation,
      title,
      subtitle,
    }: CreateAccountContactDetailsFormsProps,
    ref: React.Ref<CreateAccountContactDetailsFormsHandles>
  ) => {
    const [contactDetailsForm] = Form.useForm();
    const [displayCountry, setDisplayCountry] = useState("United Kingdom");

    useEffect(() => {
      contactDetailsForm.setFieldsValue({
        countryName: "United Kingdom",
      });
    }, []);
    const checkCountry = () => {
      const validCountry = countries.some(
        (country: Country) => country.label === displayCountry
      );
      return validCountry;
    };

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        try {
          if (!checkCountry()) {
            contactDetailsForm.setFields([
              {
                name: "countryName",
                errors: ["Please select a valid country"],
              },
            ]);
            return false;
          }
          await contactDetailsForm.validateFields();
          contactDetailsForm.submit();
          onFormValidation(true);
          return true;
        } catch (error) {
          console.log("Validation failed:", error);
          onFormValidation(false);
          return false;
        }
      },
    }));

    // This function is called when the form is submitted
    const onDetailsFinish = () => {
      console.log("TO DO");
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
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M18.25 11c0 4-6.25 8.25-6.25 8.25S5.75 15 5.75 11c0-3.5 2.936-6.25 6.25-6.25S18.25 7.5 18.25 11z"
              ></path>
              <circle
                cx="12"
                cy="11"
                r="2.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></circle>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={contactDetailsForm}
          name="contactDetailsForm"
          onFinish={onDetailsFinish}
          onFinishFailed={onDetailsFinishFailed}
          className="relative p-4 pb-5 text-sm text-left bg-white rounded-md shadow hide-validation-asterix ring-1 ring-black ring-opacity-5"
          requiredMark="optional"
        >
          <Form.Item
            label="Mobile number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter a mobile number",
              },
            ]}
          >
            <Input type="tel" name="phone" />
          </Form.Item>
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
                option?.value
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()) || false
              }
              onSelect={(value, option) => {
                if (option) {
                  setDisplayCountry(option.value as string);
                  contactDetailsForm.setFieldsValue({
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
            rules={[{ required: true, message: "Please enter a town or city" }]}
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
              rules={[{ required: true, message: "Please enter postcode" }]}
            >
              <Input />
            </Form.Item>
          </div>
          {/* Used when the address is in the AddressModal <Button
            block={true}
            className={classNames({
              "border border-solid": true,
              "border-primary-500 text-primary-600 hover:text-primary-500 hover:underline":
                !contactDetailsForm && isValidAddress,
              "!border-rose-500 !text-rose-500 hover:!text-rose-600 hover:underline":
                !contactDetailsForm && !isValidAddress,
              "border-neutral-300 justify-start hover:bg-white hover:border-primary-500":
                contactDetailsForm && isValidAddress,
            })}
          >
            {!contactDetailsForm ? (
              "Add address"
            ) : (
              <div className="-ml-1 truncate">
                <span>{contactDetailsForm.addressLineOne}, </span>
                {contactDetailsForm.town && (
                  <span>{contactDetailsForm.county}, </span>
                )}
                <span>{contactDetailsForm.postcode}</span>
              </div>
            )}
          </Button> */}
        </Form>
      </>
    );
  }
);

export default CreateAccountContactDetailsForms;
