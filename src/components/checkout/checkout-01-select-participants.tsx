import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Button, Form, Radio, Tooltip } from "antd";
import FormHeader from "../form-header";
import AddParticipantModal, {
  AddParticipantValues,
} from "./checkout-01-select-participants-add-modal";
import { useBasketContext } from "../basket/basket-context";
import { calculateAge } from "./checkout-utils";
import { BasketItem, Participant } from "../../types/types";
import { EditOutlined } from "@ant-design/icons";

export interface CheckoutSelectParticipantsHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutSelectParticipantsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutSelectParticipants = forwardRef<
  CheckoutSelectParticipantsHandles,
  CheckoutSelectParticipantsProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutSelectParticipantsProps,
    ref: React.Ref<CheckoutSelectParticipantsHandles>
  ) => {
    const { basketItems, addParticipant } = useBasketContext();
    const basketItemsExcludingRequired = basketItems.filter(
      (item) => !item.isRequiredProduct
    );
    const [selectParticipantForm] = Form.useForm();
    const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
      useState(false);

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await selectParticipantForm.validateFields();
          // If validation is successful, submit the form
          selectParticipantForm.submit();
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

    const [ageCriteria, setAgeCriteria] = useState<{
      min?: number;
      max?: number;
    }>({
      // min: 4,
      max: 4,
    });

    const isAgeWithinRange = (dob: Date): boolean => {
      const participantAge = calculateAge(dob);
      const { min, max } = ageCriteria;

      return (!min || participantAge >= min) && (!max || participantAge <= max);
    };

    const [participants, setParticipants] = useState<Participant[]>(() => {
      const loadParticipants: Participant[] = [
        {
          id: 1,
          firstName: "James",
          lastName: "Toone",
          dob: new Date("1986-04-14"),
        },
        {
          id: 2,
          firstName: "Sam",
          lastName: "Toone",
          dob: new Date("1989-10-19"),
        },
        {
          id: 3,
          firstName: "Jacob",
          lastName: "Toone",
          dob: new Date("2021-12-06"),
        },
      ];
      return loadParticipants.map((participant) => ({
        ...participant,
        meetsAgeCriteria: isAgeWithinRange(participant.dob),
      }));
    });

    useEffect(() => {
      // Update the 'meetsAgeCriteria' property for each participant in the 'participants' array
      // based on the current 'ageCriteria'
      setParticipants(
        participants.map((participant) => ({
          ...participant,
          meetsAgeCriteria: isAgeWithinRange(participant.dob),
        }))
      );
    }, [ageCriteria]);

    const onModalSave = (values: AddParticipantValues) => {
      // Convert input values to a Date object
      const dob = new Date(values.dobYYYY, values.dobMM - 1, values.dobDD);

      // Generate a new participant ID
      const newParticipantId = participants.length + 1;

      // Create a new participant object
      const newParticipant = {
        id: newParticipantId,
        firstName: values.firstName,
        lastName: values.lastName,
        dob,
        meetsAgeCriteria: isAgeWithinRange(dob),
      };

      // Add the new participant to the participants array
      setParticipants([...participants, newParticipant]);

      // If the new participant meets the age criteria, find the product and set the participant
      if (newParticipant.meetsAgeCriteria) {
        // Find the index of the product that has no participant selected
        const emptyProductIndex = basketItems.findIndex(
          (item, index) =>
            !selectParticipantForm.getFieldValue(`participant_${index}`)
        );

        // If there is an empty product, set the new participant as the selected participant for that product
        if (emptyProductIndex !== -1) {
          selectParticipantForm.setFieldsValue({
            [`participant_${emptyProductIndex}`]: newParticipantId,
          });
        }
      }

      // Close the add participant modal
      setIsAddParticipantModalOpen(false);
    };

    const onDetailsFinish = (
      values: { [key: string]: number },
      participants: Participant[],
      items: BasketItem[]
    ) => {
      items.forEach((item, index) => {
        const participantId = values[`participant_${index}`];
        const participant = participants.find((p) => p.id === participantId);

        if (!participant) {
          return;
        }

        addParticipant(item.id, participant);

        console.log("Add participants:", basketItems);
      });
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
                d="M12.25 19.25h-5.3c-1.18 0-2.06-1.04-1.46-2.055C6.363 15.723 8.24 14 12.25 14M17 14.75v4.5M19.25 17h-4.5"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={selectParticipantForm}
          name="selectParticipantForm"
          onFinish={(values) =>
            onDetailsFinish(values, participants, basketItems)
          }
          onFinishFailed={onDetailsFinishFailed}
          className="space-y-6 text-left hide-validation-asterix"
        >
          {/* Loop through basket items but don't show their linked required products */}
          {basketItemsExcludingRequired.map((item, index) => (
            <div
              key={item.id}
              className="text-sm p-4 space-y-4 rounded-md relative bg-white shadow ring-1 ring-black ring-opacity-5 text-left [&:has(.ant-form-item-has-error)]:ring-error"
            >
              <div className="flex items-center gap-3 pb-4 border-b">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-contain object-center w-16 h-auto max-h-[4rem] rounded"
                />
                <div className="grid items-center flex-1 min-w-0 text-sm">
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-neutral-500">{item.subTitle}</div>
                  </div>
                  {Object.keys(ageCriteria).length > 0 && (
                    <div className="pt-1.5 mt-auto text-neutral-500/75">
                      {ageCriteria.min && ageCriteria.max
                        ? `Age limit · between ${ageCriteria.min} and ${ageCriteria.max} years old`
                        : ageCriteria.min
                        ? `Age limit · ${ageCriteria.min} years or older`
                        : ageCriteria.max
                        ? `Age limit · ${ageCriteria.max} years or younger`
                        : ""}
                    </div>
                  )}
                </div>
              </div>
              <Form.Item
                name={`participant_${index}`}
                label="Select a person"
                rules={[{ required: true, message: "Please select a person" }]}
                validateTrigger={false}
              >
                <Radio.Group className="block">
                  {participants.map((participant) => (
                    <Tooltip
                      key={`${item.id}_${participant.id}`}
                      title={`Age: ${calculateAge(participant.dob)}`}
                      placement="left"
                    >
                      <div className="flex items-center group">
                        <Radio
                          value={participant.id}
                          disabled={!participant.meetsAgeCriteria}
                          className="!flex items-center [&>span:last-child]:block"
                        >
                          <div className="flex items-center py-1">
                            <div>
                              {participant.firstName} {participant.lastName}
                              {!participant.meetsAgeCriteria && (
                                <span>
                                  {calculateAge(participant.dob) <
                                  (ageCriteria.min ?? 0)
                                    ? " · Below age limit"
                                    : " · Above age limit"}
                                </span>
                              )}
                            </div>
                          </div>
                        </Radio>
                        <Button
                          shape="circle"
                          size="small"
                          type="text"
                          icon={<EditOutlined />}
                          className="justify-center -ml-2 [@media(pointer:coarse){}]:text-neutral-500 [@media(pointer:coarse){}]:ml-auto opacity-0 group-hover:opacity-100 duration-200 transition-opacity [@media(pointer:coarse){}]:opacity-100"
                        ></Button>
                      </div>
                    </Tooltip>
                  ))}
                </Radio.Group>
              </Form.Item>
              <div>
                <Button
                  type="link"
                  className="!p-0 h-auto"
                  onClick={() => {
                    setIsAddParticipantModalOpen(true);
                  }}
                >
                  Add new person
                </Button>
                <AddParticipantModal
                  openModal={isAddParticipantModalOpen}
                  onModalSave={onModalSave}
                  onModalCancel={() => {
                    setIsAddParticipantModalOpen(false);
                  }}
                />
              </div>
            </div>
          ))}
        </Form>
      </>
    );
  }
);

export default CheckoutSelectParticipants;
