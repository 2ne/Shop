import React, { forwardRef, useImperativeHandle, useState } from "react";
import FormHeader from "../form-header";
import { useBasketContext } from "../basket/basket-context";
import { Participant } from "../../types/types";
import { Button, Select } from "antd";
const { Option } = Select;

export interface CheckoutAdditionalProductsHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutAdditionalProductsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutAdditionalProducts = forwardRef<
  CheckoutAdditionalProductsHandles,
  CheckoutAdditionalProductsProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutAdditionalProductsProps,
    ref: React.Ref<CheckoutAdditionalProductsHandles>
  ) => {
    const [addItemToBasket, setAddItemToBasket] = useState<boolean | null>(
      null
    );
    const { basketItems, addRequiredProducts } = useBasketContext();

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        // Only set the form as valid if an item has been added to the basket
        if (addItemToBasket) {
          onFormValidation(true);
          console.log("Add required products:", basketItems);

          // Return true to indicate that the form submission was successful
          return true;
        } else {
          onFormValidation(false);
          setAddItemToBasket(false);
          return false;
        }
      },
    }));

    const handleAddItem = () => {
      setAddItemToBasket(true);
      // Add the linked required products from items already in the basket
      addRequiredProducts();
    };

    const basketButtonClasses =
      addItemToBasket &&
      "pointer-events-none !bg-emerald-600 !text-white !border-emerald-600";

    const basketButtonText = addItemToBasket ? "Added" : "Add to basket";

    const [selectedProductLabel, setSelectedProductLabel] = useState(null);

    const titles = ["Annual Title", "Monthly Title"];
    const values = ["annual", "monthly"];

    const options = Array.from({ length: 100 }, (_, index) => {
      const isAnnual = index % 2 === 0;
      const title = isAnnual ? titles[0] : titles[1];
      const value = isAnnual ? values[0] : values[1];

      return {
        value: value,
        label: title,
        content: (
          <div className="flex gap-4 py-1 text-sm item">
            <img
              src="../src/assets/seahorse.jpg"
              className="object-contain object-center w-12 h-12 my-auto rounded mix-blend-multiply"
            />
            <div className="flex-grow min-w-0">
              <div className="truncate">{title}</div>
              <div className="truncate text-neutral-500">Subtitle</div>
              <div className="truncate text-neutral-500">Age</div>
            </div>
            <div className="text-right">Price</div>
          </div>
        ),
      };
    });

    const handleSelectProductChange = (value: any, option: any) => {
      setSelectedProductLabel(option.label);
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
                d="M12 5.75V18.25"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M18.25 12L5.75 12"
              ></path>
            </svg>
          }
        />
        {/* Look through basket items and show the required product for each */}
        {basketItems.map((item) => {
          const requiredProduct = item.requiredProduct;
          const itemParticipants = item.participants || [];
          if (!requiredProduct) {
            return null;
          }
          return (
            <>
              <div
                key={requiredProduct.id}
                className={`text-sm p-4 space-y-4 rounded-md relative bg-white shadow ring-1 ring-opacity-5 text-left ${
                  addItemToBasket === false ? " ring-error " : " ring-black "
                }`}
              >
                <div className="flex items-center gap-3 pb-4 border-b">
                  <img
                    src={requiredProduct.image}
                    alt={requiredProduct.title}
                    className="object-contain object-center w-16 h-auto max-h-[4rem] rounded"
                  />
                  <div className="grid items-center flex-1 min-w-0">
                    <div>
                      <div className="font-medium">{requiredProduct.title}</div>
                      <div className="text-neutral-500">12 months</div>
                      <div className="pt-1.5 mt-auto text-neutral-500/75">
                        {requiredProduct.cost} · per month
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    {itemParticipants.map((participant: Participant) => {
                      return (
                        <>
                          <div
                            key={`${requiredProduct.id}_${participant.id}`}
                            className="flex items-center mb-1 space-x-1"
                          >
                            <span className="text-neutral-500">
                              Participant
                            </span>
                            <span className="text-neutral-500">·</span>
                            <span className="font-medium">
                              {participant.firstName} {participant.lastName}
                            </span>
                          </div>
                          <div>
                            <Select
                              showSearch
                              className="w-full"
                              placeholder="Select membership..."
                              placement="bottomLeft"
                              optionFilterProp="children"
                              onChange={handleSelectProductChange}
                              value={selectedProductLabel || undefined}
                              filterOption={(input, option) =>
                                option.label
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {options.map((option) => (
                                <Option
                                  key={option.value}
                                  value={option.value}
                                  label={option.label}
                                >
                                  {option.content}
                                </Option>
                              ))}
                            </Select>
                            <div className="mt-4">
                              <Button
                                danger={addItemToBasket === false}
                                block
                                className={`!transition-all !duration-500 ${basketButtonClasses}`}
                                onClick={handleAddItem}
                              >
                                {addItemToBasket && (
                                  <svg
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="mr-0.5 -ml-1"
                                  >
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
                                )}
                                <span>{basketButtonText}</span>
                              </Button>
                            </div>
                            {addItemToBasket === false && (
                              <div className="mt-2 text-error">
                                Please add the product
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  }
);

export default CheckoutAdditionalProducts;
