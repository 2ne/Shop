import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input, InputRef, Slider, Switch } from "antd";
import { motion } from "framer-motion";
import FormHeader from "../form-header";
import { useBasketContext } from "../basket/basket-context";

export interface CheckoutDonationHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutDonationProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutDonation = forwardRef<
  CheckoutDonationHandles,
  CheckoutDonationProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutDonationProps,
    ref: React.Ref<CheckoutDonationHandles>
  ) => {
    const { basketItems, setDonationAmount } = useBasketContext();
    const [designVariant, setDesignVariant] = useState<
      "1" | "2" | "3" | "4" | "5"
    >("1");
    const [percentage, setPercentage] = useState(15); // Default to 15%
    const [lastPercentage, setLastPercentage] = useState(15); // Store last percentage value
    const [donationType, setDonationType] = useState<"percentage" | "fixed">(
      "percentage"
    );
    const [fixedAmount, setFixedAmount] = useState<string>("");
    const [dynamicMax, setDynamicMax] = useState<number>(25); // Dynamic max percentage
    const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
    const [selectedSmartPreset, setSelectedSmartPreset] = useState<
      number | null
    >(null);
    const [showFixedAmountInput, setShowFixedAmountInput] = useState(false);
    const [showDonationSummary, setShowDonationSummary] = useState(true); // Switch state - enabled by default
    const [isMobile, setIsMobile] = useState(false); // Track if screen is less than 1024px
    const fixedAmountInputRef = useRef<InputRef>(null);

    // Check screen size on mount and resize
    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 1024);
      };

      checkScreenSize(); // Check on mount
      window.addEventListener("resize", checkScreenSize);

      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Helper function to parse price string to number
    const parsePrice = (priceString?: string): number => {
      if (!priceString) return 0;
      // Remove £ and any whitespace, then parse to float
      const cleaned = priceString.replace(/£/g, "").replace(/\s/g, "");
      return parseFloat(cleaned) || 0;
    };

    // Calculate basket total from actual basket items
    const calculateBasketTotal = (): number => {
      return basketItems.reduce((total, item) => {
        // Use cost if available (monthly cost), otherwise use price
        const itemPrice = parsePrice(item.cost || item.price);
        return total + itemPrice;
      }, 0);
    };

    const basketTotal = calculateBasketTotal();

    // Calculate donation amount based on donation type and design variant
    let donationAmount = 0;
    if (designVariant === "1") {
      // Variant 1: Slider + fixed with round up switch
      if (donationType === "fixed") {
        donationAmount = parseFloat(fixedAmount) || 0;
      } else {
        const calculatedAmount = (basketTotal * percentage) / 100;
        // Round up to nearest pound if switch is enabled
        donationAmount = showDonationSummary
          ? Math.ceil(calculatedAmount)
          : calculatedAmount;
      }
    } else if (designVariant === "2") {
      // Variant 2: Slider + fixed without round up switch
      if (donationType === "fixed") {
        donationAmount = parseFloat(fixedAmount) || 0;
      } else {
        donationAmount = (basketTotal * percentage) / 100;
      }
    } else if (designVariant === "3") {
      // Variant 3: Preset buttons
      if (selectedPreset !== null) {
        donationAmount = selectedPreset;
      } else if (fixedAmount) {
        donationAmount = parseFloat(fixedAmount) || 0;
      }
    } else if (designVariant === "4") {
      // Variant 4: Smart presets (percentage-based)
      if (selectedSmartPreset !== null) {
        donationAmount = (basketTotal * selectedSmartPreset) / 100;
      } else if (fixedAmount) {
        donationAmount = parseFloat(fixedAmount) || 0;
      }
    } else if (designVariant === "5") {
      // Variant 5: Experimental visual card selection
      donationAmount = parseFloat(fixedAmount) || 0;
    }

    // Reset defaults when switching design variants
    useEffect(() => {
      if (designVariant === "1") {
        // Variant 1: Reset to 15% percentage
        setPercentage(15);
        setLastPercentage(15);
        setFixedAmount("");
        setSelectedPreset(null);
        setSelectedSmartPreset(null);
        setDonationType("percentage");
        setShowFixedAmountInput(false);
        setDynamicMax(25); // Reset to default max
      } else if (designVariant === "2") {
        // Variant 2: Reset to 15% percentage (same as variant 1 but without round up switch)
        setPercentage(15);
        setLastPercentage(15);
        setFixedAmount("");
        setSelectedPreset(null);
        setSelectedSmartPreset(null);
        setDonationType("percentage");
        setShowFixedAmountInput(false);
        setDynamicMax(25); // Reset to default max
      } else if (designVariant === "3") {
        // Variant 3: Reset preset buttons - default to £10
        setSelectedPreset(10);
        setFixedAmount("");
        setPercentage(0);
        setSelectedSmartPreset(null);
      } else if (designVariant === "4") {
        // Variant 4: Reset smart presets - default to 10%
        setSelectedSmartPreset(10);
        setFixedAmount("");
        setPercentage(0);
        setSelectedPreset(null);
      } else if (designVariant === "5") {
        // Variant 5: Reset experimental visual cards - default to £10
        setFixedAmount("10");
        setPercentage(0);
        setSelectedPreset(null);
        setSelectedSmartPreset(null);
      }
    }, [designVariant]);

    // Update donation in context whenever it changes
    useEffect(() => {
      setDonationAmount(donationAmount);
      // Form is always valid since donation is optional
      onFormValidation(true);
    }, [donationAmount, setDonationAmount, onFormValidation]);

    // Focus input when it becomes visible
    useEffect(() => {
      if (showFixedAmountInput && fixedAmountInputRef.current) {
        // Small delay to ensure the input is rendered
        setTimeout(() => {
          fixedAmountInputRef.current?.focus();
        }, 0);
      }
    }, [showFixedAmountInput]);

    // Ensure lastPercentage doesn't exceed dynamicMax, doesn't go below 5%, and updates when dynamicMax changes
    useEffect(() => {
      if (donationType === "fixed") {
        if (lastPercentage > dynamicMax) {
          setLastPercentage(dynamicMax);
        } else if (lastPercentage < 5) {
          setLastPercentage(5);
        } else if (fixedAmount) {
          // Recalculate lastPercentage when dynamicMax changes to ensure slider updates
          const numericValue = parseFloat(fixedAmount);
          if (
            !isNaN(numericValue) &&
            isFinite(numericValue) &&
            basketTotal > 0
          ) {
            const calculatedPercentage = (numericValue / basketTotal) * 100;
            const MAX_PERCENTAGE = 200;
            const cappedPercentage = Math.min(
              Math.max(calculatedPercentage, 0),
              MAX_PERCENTAGE
            );
            setLastPercentage(
              Math.max(Math.min(cappedPercentage, dynamicMax), 5)
            );
          }
        }
      }
    }, [dynamicMax, donationType, fixedAmount, basketTotal, lastPercentage]);

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        // Donation step is always valid since it's optional
        setDonationAmount(donationAmount);
        onFormValidation(true);
        return true;
      },
    }));

    const handlePercentageChange = (value: number) => {
      setPercentage(value);
      setLastPercentage(value);
      setDonationType("percentage");
      setFixedAmount("");
      setDynamicMax(25); // Reset to default max when using percentage slider
    };

    const handleFixedAmountChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.value;
      // Allow only numbers and decimal point
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setFixedAmount(value);
        setSelectedPreset(null); // Clear preset when typing custom amount
        setSelectedSmartPreset(null); // Clear smart preset when typing custom amount
        if (value !== "") {
          setDonationType("fixed");
          // Calculate what percentage this fixed amount represents
          const numericValue = parseFloat(value);
          if (
            !isNaN(numericValue) &&
            isFinite(numericValue) &&
            basketTotal > 0 &&
            numericValue >= 0
          ) {
            const calculatedPercentage = (numericValue / basketTotal) * 100;
            // Cap percentage at a reasonable maximum (e.g., 200%) to prevent crashes
            const MAX_PERCENTAGE = 200;
            const cappedPercentage = Math.min(
              Math.max(calculatedPercentage, 0), // Ensure non-negative
              MAX_PERCENTAGE
            );

            // If percentage exceeds 25%, expand the max and round up to nearest 5%
            if (cappedPercentage > 25) {
              const roundedUpMax = Math.min(
                Math.ceil(cappedPercentage / 5) * 5,
                MAX_PERCENTAGE
              );
              setDynamicMax(roundedUpMax);
              // Ensure lastPercentage is set to the capped value, not exceeding dynamicMax
              setLastPercentage(Math.min(cappedPercentage, roundedUpMax));
            } else {
              // Clamp to max 25% and round to nearest step (5, 10, 15, 20, 25)
              // Minimum is 5%, so clamp lastPercentage to at least 5%
              setDynamicMax(25);
              const roundedPercentage = Math.round(cappedPercentage / 5) * 5;
              setLastPercentage(Math.max(Math.min(roundedPercentage, 25), 5));
            }
          } else if (numericValue === 0) {
            // Handle zero case - set to minimum 5%
            setDynamicMax(25);
            setLastPercentage(5);
          } else {
            // Handle invalid or negative values - set to minimum 5%
            setDynamicMax(25);
            setLastPercentage(5);
          }
        }
      }
    };

    const handleFixedAmountBlur = () => {
      // Only switch back to slider on blur if the input is empty (for variants 1 and 2)
      if (
        (designVariant === "1" || designVariant === "2") &&
        fixedAmount === ""
      ) {
        setDonationType("percentage");
        setDynamicMax(25); // Reset to default max
        setShowFixedAmountInput(false); // Hide the custom amount input and show slider
      }
    };

    const handlePresetClick = (amount: number) => {
      setSelectedPreset(amount);
      setFixedAmount("");
      setPercentage(0);
      setSelectedSmartPreset(null);
    };

    const handleSmartPresetClick = (percent: number) => {
      setSelectedSmartPreset(percent);
      setFixedAmount("");
      setPercentage(0);
      setSelectedPreset(null);
    };

    const presetAmounts = [5, 10, 20, 50, 100];
    const smartPresetPercentages = [5, 10, 15, 20];

    return (
      <>
        {/* Design Variant Toggle - Fixed at top center */}
        <div className="fixed top-0 left-1/2 z-50 px-4 py-2 text-white bg-black rounded-b-lg shadow-lg -translate-x-1/2">
          <div className="flex gap-2 items-center text-xs">
            <span className="text-neutral-400">Design:</span>
            <button
              onClick={() => setDesignVariant("1")}
              className={`px-2 py-1 rounded ${
                designVariant === "1"
                  ? "bg-white text-black"
                  : "hover:bg-neutral-800"
              }`}
            >
              1
            </button>
            <button
              onClick={() => setDesignVariant("2")}
              className={`px-2 py-1 rounded ${
                designVariant === "2"
                  ? "bg-white text-black"
                  : "hover:bg-neutral-800"
              }`}
            >
              2
            </button>
            <button
              onClick={() => setDesignVariant("3")}
              className={`px-2 py-1 rounded ${
                designVariant === "3"
                  ? "bg-white text-black"
                  : "hover:bg-neutral-800"
              }`}
            >
              3
            </button>
            <button
              onClick={() => setDesignVariant("4")}
              className={`px-2 py-1 rounded ${
                designVariant === "4"
                  ? "bg-white text-black"
                  : "hover:bg-neutral-800"
              }`}
            >
              4
            </button>
            <button
              onClick={() => setDesignVariant("5")}
              className={`px-2 py-1 rounded ${
                designVariant === "5"
                  ? "bg-white text-black"
                  : "hover:bg-neutral-800"
              }`}
            >
              5
            </button>
          </div>
        </div>

        <FormHeader
          title={title}
          subtitle={subtitle}
          iconClassName="bg-rose-50/75"
          icon={
            <motion.svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="text-rose-500"
              animate={{
                scale: [1, 1.175, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                clipRule="evenodd"
              ></path>
            </motion.svg>
          }
        />
        <div className="space-y-6 text-left">
          <div className="p-5 space-y-5 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow">
            <div className="flex gap-3.5 text-sm bg-rose-50/75 relative text-rose-600/90 px-[17px] py-[12px] rounded-[6px] m-[-16px] mb-[-2px]">
              <motion.svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="relative top-px -ml-1 text-rose-500 shrink-0 size-5"
                animate={
                  isMobile
                    ? {
                        scale: [1, 1.175, 1],
                        opacity: [1, 0.8, 1],
                      }
                    : {}
                }
                transition={
                  isMobile
                    ? {
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : {}
                }
              >
                <path
                  fillRule="evenodd"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                  clipRule="evenodd"
                ></path>
              </motion.svg>
              <p className="text-sm">
                Would you like to help with the cost of running the club so more
                funds go back into the players and community.
              </p>
            </div>

            <div className="space-y-5">
              {/* Variant 1: JustGiving-style Slider */}
              {designVariant === "1" && (
                <div>
                  {/* Slider Section - Hide when custom amount input is visible */}
                  {!showFixedAmountInput && (
                    <div className="relative pt-10">
                      {/* Custom Tooltip above slider */}
                      {donationType === "percentage" && percentage >= 5 && (
                        <div
                          className="absolute top-0 px-3 py-1.5 bg-white rounded shadow-md shadow-neutral-950/5 ring-1 ring-neutral-950/10 text-sm font-medium text-neutral-700 tabular-nums whitespace-nowrap z-10"
                          style={(() => {
                            const positionPercent =
                              dynamicMax > 5
                                ? Math.min(
                                    Math.max(
                                      ((percentage - 5) / (dynamicMax - 5)) *
                                        100,
                                      0
                                    ),
                                    100
                                  )
                                : 0;

                            const isAtMin = percentage === 5;
                            const isAtMax = percentage === dynamicMax;

                            if (isAtMin) {
                              // Position to the right when at minimum
                              return {
                                left: `${positionPercent}%`,
                                transform: `translate(0, 0)`,
                              };
                            } else if (isAtMax) {
                              // Position to the left when at maximum
                              return {
                                right: `${100 - positionPercent}%`,
                                transform: `translate(0, 0)`,
                              };
                            } else {
                              // Center otherwise
                              return {
                                left: `${positionPercent}%`,
                                transform: `translate(-50%, 0)`,
                              };
                            }
                          })()}
                        >
                          {`${percentage}% (£${(
                            (basketTotal * percentage) /
                            100
                          ).toFixed(2)})`}
                          {/* Arrow pointing down to slider handle - border layer */}
                          <div
                            className="absolute top-full mt-px w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-transparent border-t-neutral-950/10"
                            style={{
                              left:
                                percentage === 5
                                  ? "0"
                                  : percentage === dynamicMax
                                  ? "auto"
                                  : "50%",
                              right: percentage === dynamicMax ? "0" : "auto",
                              transform:
                                percentage === 5 || percentage === dynamicMax
                                  ? "translateX(0)"
                                  : "translateX(-50%)",
                            }}
                          ></div>
                          {/* Arrow pointing down to slider handle - white fill */}
                          <div
                            className="absolute top-full mt-0 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white"
                            style={{
                              left:
                                percentage === 5
                                  ? "0"
                                  : percentage === dynamicMax
                                  ? "auto"
                                  : "50%",
                              right: percentage === dynamicMax ? "0" : "auto",
                              transform:
                                percentage === 5 || percentage === dynamicMax
                                  ? "translateX(0)"
                                  : "translateX(-50%)",
                            }}
                          ></div>
                        </div>
                      )}

                      <Slider
                        min={5}
                        max={dynamicMax}
                        step={dynamicMax <= 25 ? 5 : dynamicMax / 100}
                        value={percentage}
                        onChange={handlePercentageChange}
                        marks={(() => {
                          // Fixed marks at 5%, 10%, 15%, 20%, 25% when max is 25
                          if (dynamicMax === 25) {
                            return {
                              5: "5%",
                              10: "10%",
                              15: "15%",
                              20: "20%",
                              25: "25%",
                            };
                          }
                          // For dynamic max > 25, show 5 marks: min, max, and 3 equally spaced between them
                          const min = 5;
                          const max = dynamicMax;
                          const marks: Record<number, string> = {
                            [min]: `${min}%`,
                          };
                          // Calculate 3 equally spaced marks between min and max
                          for (let i = 1; i <= 3; i++) {
                            const value = Math.round(
                              (min + (max - min) * i) / 4
                            );
                            marks[value] = `${value}%`;
                          }
                          marks[max] = `${max}%`;
                          return marks;
                        })()}
                        className="[&_.ant-slider-mark-text]:hidden [&_.ant-slider-step_span:first-child]:hidden [&_.ant-slider-step_span:last-child]:hidden [&_.ant-slider-rail]:h-2 [&_.ant-slider-track]:h-2 [&_.ant-slider-track]:rounded-full [&_.ant-slider-rail]:rounded-full [&_.ant-slider-handle::after]:!size-4 [&_.ant-slider-handle]:!size-4 [&_.ant-slider-handle::after]:!ring-[3px] [&_.ant-slider-step]:top-1.5 [&_.ant-slider-dot-active]:border-interactive [&_.ant-slider-track]:bg-interactive/75 [&_.ant-slider-track]:hover:bg-interactive/90 [&_.ant-slider-dot]:!size-2 [&_.ant-slider-dot]:border-[1px] [&_.ant-slider-dot]:mt-px mx-0"
                        tooltip={{
                          open: false,
                        }}
                      />
                    </div>
                  )}

                  {/* Fixed Amount Option */}
                  <div className="space-y-3">
                    {!showFixedAmountInput ? (
                      <div className="flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => {
                            setShowFixedAmountInput(true);
                            setFixedAmount("2.50");
                            // Calculate percentage for £2.50
                            if (basketTotal > 0) {
                              const calculatedPercentage =
                                (2.5 / basketTotal) * 100;
                              const MAX_PERCENTAGE = 200;
                              const cappedPercentage = Math.min(
                                Math.max(calculatedPercentage, 0),
                                MAX_PERCENTAGE
                              );
                              if (cappedPercentage > 25) {
                                const roundedUpMax = Math.min(
                                  Math.ceil(cappedPercentage / 5) * 5,
                                  MAX_PERCENTAGE
                                );
                                setDynamicMax(roundedUpMax);
                                setLastPercentage(
                                  Math.min(cappedPercentage, roundedUpMax)
                                );
                              } else {
                                setDynamicMax(25);
                                const roundedPercentage =
                                  Math.round(cappedPercentage / 5) * 5;
                                setLastPercentage(
                                  Math.max(Math.min(roundedPercentage, 25), 5)
                                );
                              }
                              setDonationType("fixed");
                            }
                          }}
                          className="text-sm font-medium transition-colors text-interactive hover:text-interactive/80 hover:underline"
                        >
                          Enter custom amount
                        </button>
                        <div className="flex flex-row-reverse gap-2 items-center">
                          <Switch
                            checked={showDonationSummary}
                            onChange={setShowDonationSummary}
                            size="small"
                          />
                          <span
                            className="text-sm text-neutral-600"
                            onClick={() =>
                              setShowDonationSummary(!showDonationSummary)
                            }
                          >
                            Round up
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Input
                          ref={fixedAmountInputRef}
                          prefix="£"
                          placeholder="0.00"
                          value={fixedAmount}
                          onChange={handleFixedAmountChange}
                          onBlur={handleFixedAmountBlur}
                          className="w-full"
                          type="text"
                          inputMode="decimal"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Variant 2: JustGiving-style Slider without round up switch */}
              {designVariant === "2" && (
                <div>
                  {/* Slider Section - Hide when custom amount input is visible */}
                  {!showFixedAmountInput && (
                    <div className="relative pt-10">
                      {/* Custom Tooltip above slider */}
                      {donationType === "percentage" && percentage >= 5 && (
                        <div
                          className="absolute top-0 px-3 py-1.5 bg-white rounded shadow-md shadow-neutral-950/5 ring-1 ring-neutral-950/10 text-sm font-medium text-neutral-700 tabular-nums whitespace-nowrap z-10"
                          style={(() => {
                            const positionPercent =
                              dynamicMax > 5
                                ? Math.min(
                                    Math.max(
                                      ((percentage - 5) / (dynamicMax - 5)) *
                                        100,
                                      0
                                    ),
                                    100
                                  )
                                : 0;

                            const isAtMin = percentage === 5;
                            const isAtMax = percentage === dynamicMax;

                            if (isAtMin) {
                              // Position to the right when at minimum
                              return {
                                left: `${positionPercent}%`,
                                transform: `translate(0, 0)`,
                              };
                            } else if (isAtMax) {
                              // Position to the left when at maximum
                              return {
                                right: `${100 - positionPercent}%`,
                                transform: `translate(0, 0)`,
                              };
                            } else {
                              // Center otherwise
                              return {
                                left: `${positionPercent}%`,
                                transform: `translate(-50%, 0)`,
                              };
                            }
                          })()}
                        >
                          {`${percentage}% (£${(
                            (basketTotal * percentage) /
                            100
                          ).toFixed(2)})`}
                          {/* Arrow pointing down to slider handle - border layer */}
                          <div
                            className="absolute top-full mt-px w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-transparent border-t-neutral-950/10"
                            style={{
                              left:
                                percentage === 5
                                  ? "0"
                                  : percentage === dynamicMax
                                  ? "auto"
                                  : "50%",
                              right: percentage === dynamicMax ? "0" : "auto",
                              transform:
                                percentage === 5 || percentage === dynamicMax
                                  ? "translateX(0)"
                                  : "translateX(-50%)",
                            }}
                          ></div>
                          {/* Arrow pointing down to slider handle - white fill */}
                          <div
                            className="absolute top-full mt-0 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white"
                            style={{
                              left:
                                percentage === 5
                                  ? "0"
                                  : percentage === dynamicMax
                                  ? "auto"
                                  : "50%",
                              right: percentage === dynamicMax ? "0" : "auto",
                              transform:
                                percentage === 5 || percentage === dynamicMax
                                  ? "translateX(0)"
                                  : "translateX(-50%)",
                            }}
                          ></div>
                        </div>
                      )}

                      <Slider
                        min={5}
                        max={dynamicMax}
                        step={dynamicMax <= 25 ? 5 : dynamicMax / 100}
                        value={percentage}
                        onChange={handlePercentageChange}
                        marks={(() => {
                          // Fixed marks at 5%, 10%, 15%, 20%, 25% when max is 25
                          if (dynamicMax === 25) {
                            return {
                              5: "5%",
                              10: "10%",
                              15: "15%",
                              20: "20%",
                              25: "25%",
                            };
                          }
                          // For dynamic max > 25, show 5 marks: min, max, and 3 equally spaced between them
                          const min = 5;
                          const max = dynamicMax;
                          const marks: Record<number, string> = {
                            [min]: `${min}%`,
                          };
                          // Calculate 3 equally spaced marks between min and max
                          for (let i = 1; i <= 3; i++) {
                            const value = Math.round(
                              (min + (max - min) * i) / 4
                            );
                            marks[value] = `${value}%`;
                          }
                          marks[max] = `${max}%`;
                          return marks;
                        })()}
                        className="[&_.ant-slider-mark-text]:hidden [&_.ant-slider-step_span:first-child]:hidden [&_.ant-slider-step_span:last-child]:hidden [&_.ant-slider-rail]:h-2 [&_.ant-slider-track]:h-2 [&_.ant-slider-track]:rounded-full [&_.ant-slider-rail]:rounded-full [&_.ant-slider-handle::after]:!size-4 [&_.ant-slider-handle]:!size-4 [&_.ant-slider-handle::after]:!ring-[3px] [&_.ant-slider-step]:top-1.5 [&_.ant-slider-dot-active]:border-interactive [&_.ant-slider-track]:bg-interactive/75 [&_.ant-slider-track]:hover:bg-interactive/90 [&_.ant-slider-dot]:!size-2 [&_.ant-slider-dot]:border-[1px] [&_.ant-slider-dot]:mt-px mx-0"
                        tooltip={{
                          open: false,
                        }}
                      />
                    </div>
                  )}

                  {/* Fixed Amount Option */}
                  <div className="space-y-3">
                    {!showFixedAmountInput ? (
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setShowFixedAmountInput(true);
                            setFixedAmount("2.50");
                            // Calculate percentage for £2.50
                            if (basketTotal > 0) {
                              const calculatedPercentage =
                                (2.5 / basketTotal) * 100;
                              const MAX_PERCENTAGE = 200;
                              const cappedPercentage = Math.min(
                                Math.max(calculatedPercentage, 0),
                                MAX_PERCENTAGE
                              );
                              if (cappedPercentage > 25) {
                                const roundedUpMax = Math.min(
                                  Math.ceil(cappedPercentage / 5) * 5,
                                  MAX_PERCENTAGE
                                );
                                setDynamicMax(roundedUpMax);
                                setLastPercentage(
                                  Math.min(cappedPercentage, roundedUpMax)
                                );
                              } else {
                                setDynamicMax(25);
                                const roundedPercentage =
                                  Math.round(cappedPercentage / 5) * 5;
                                setLastPercentage(
                                  Math.max(Math.min(roundedPercentage, 25), 5)
                                );
                              }
                              setDonationType("fixed");
                            }
                          }}
                          className="text-sm font-medium transition-colors text-interactive hover:text-interactive/80 hover:underline"
                        >
                          Enter custom amount
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Input
                          ref={fixedAmountInputRef}
                          prefix="£"
                          placeholder="0.00"
                          value={fixedAmount}
                          onChange={handleFixedAmountChange}
                          onBlur={handleFixedAmountBlur}
                          className="w-full"
                          type="text"
                          inputMode="decimal"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Variant 3: Preset Buttons (Fixed Amounts) */}
              {designVariant === "3" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handlePresetClick(amount)}
                        className={`py-1.5 rounded-full border-2  ${
                          selectedPreset === amount
                            ? "border-interactive bg-interactive/5 text-interactive font-medium"
                            : "border-neutral-200 hover:border-interactive/50 hover:bg-[#e4f7fb]/50 text-neutral-700"
                        }`}
                      >
                        £{amount}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Input
                      prefix="£"
                      placeholder="Other amount"
                      value={fixedAmount}
                      onChange={handleFixedAmountChange}
                      className="w-full"
                      type="text"
                      inputMode="decimal"
                      onClick={() => setSelectedPreset(null)}
                    />
                  </div>
                </div>
              )}

              {/* Variant 4: Smart Presets (Percentage-based buttons) */}
              {designVariant === "4" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {smartPresetPercentages.map((percent) => {
                      const amount = (basketTotal * percent) / 100;
                      return (
                        <button
                          key={percent}
                          onClick={() => handleSmartPresetClick(percent)}
                          className={`px-3 py-1.5 rounded-md border-2 transition-all text-left ${
                            selectedSmartPreset === percent
                              ? "border-[#005da2] bg-[#e4f7fb] text-[#005da2] font-medium"
                              : "border-neutral-200 hover:border-[#005da2]/50 hover:bg-[#e4f7fb]/50 text-body"
                          }`}
                        >
                          <div className="text-base font-medium">
                            £{amount.toFixed(2)}
                          </div>
                          <div className="text-sm text-neutral-500 mt-0.5">
                            {percent}%
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="pt-2">
                    <Input
                      prefix="£"
                      placeholder="Other amount"
                      value={fixedAmount}
                      onChange={handleFixedAmountChange}
                      className="w-full"
                      type="text"
                      inputMode="decimal"
                      onClick={() => setSelectedSmartPreset(null)}
                    />
                  </div>
                </div>
              )}

              {/* Variant 5: Experimental Interactive Donation Experience */}
              {designVariant === "5" && (
                <div className="space-y-6">
                  {/* Interactive Amount Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[5, 10, 25, 50, 100, 200].map((amount, index) => {
                      const isSelected = parseFloat(fixedAmount) === amount;
                      return (
                        <motion.button
                          key={amount}
                          onClick={() => {
                            setFixedAmount(amount.toString());
                            setSelectedPreset(null);
                            setSelectedSmartPreset(null);
                          }}
                          className={`relative p-5 rounded-xl border-2 overflow-hidden group ${
                            isSelected
                              ? "border-[#005da2] bg-gradient-to-br from-[#e4f7fb] to-[#005da2]/10 shadow-lg shadow-[#005da2]/20"
                              : "border-neutral-200 hover:border-[#005da2]/50 bg-white hover:shadow-md"
                          }`}
                          initial={{ opacity: 0, y: 30, rotateX: -15 }}
                          animate={{ opacity: 1, y: 0, rotateX: 0 }}
                          transition={{
                            delay: index * 0.08,
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                          whileHover={{
                            scale: 1.08,
                            y: -4,

                            transition: { duration: 0.15 },
                          }}
                          whileTap={{
                            scale: 0.92,
                            transition: { duration: 0.1 },
                          }}
                        >
                          {/* Enhanced checkmark icon with bounce */}
                          {isSelected && (
                            <motion.div
                              className="absolute top-1.5 right-1.5 z-10"
                              initial={{ scale: 0, rotate: -180, opacity: 0 }}
                              animate={{
                                scale: [0, 1.2, 1],
                                rotate: 0,
                                opacity: 1,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 600,
                                damping: 12,
                                delay: 0.1,
                              }}
                            >
                              <motion.div
                                className="w-6 h-6 rounded-full bg-[#005da2] flex items-center justify-center shadow-lg"
                                animate={{
                                  boxShadow: [
                                    "0 0 0 0 rgba(0, 93, 162, 0.7)",
                                    "0 0 0 8px rgba(0, 93, 162, 0)",
                                  ],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeOut",
                                }}
                              >
                                <motion.svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="relative left-px text-white"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 0.5,
                                    delay: 0.2,
                                    ease: "easeOut",
                                  }}
                                >
                                  <path
                                    d="M8 12l2 2 4-4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </motion.svg>
                              </motion.div>
                            </motion.div>
                          )}

                          <div className="relative text-center">
                            <div
                              className={`text-2xl relative top-0.5 font-bold ${
                                isSelected
                                  ? "text-[#005da2]"
                                  : "text-neutral-900"
                              }`}
                            >
                              £{amount}
                            </div>
                            {amount >= 50 && (
                              <div
                                className={`mt-1.5 text-xs font-medium ${
                                  isSelected
                                    ? "text-[#005da2]"
                                    : "text-neutral-500"
                                }`}
                              >
                                <div>
                                  {amount === 50 && "Heart Warming"}
                                  {amount === 100 && "Truly Amazing"}
                                  {amount === 200 && "Absolutely Incredible"}
                                </div>
                                <motion.div
                                  className="mt-1 text-base"
                                  animate={
                                    isSelected
                                      ? {
                                          scale: [1, 1.2, 1],
                                          rotate: [0, 5, -5, 0],
                                        }
                                      : {}
                                  }
                                  transition={{
                                    duration: 1.5,
                                    repeat: isSelected ? Infinity : 0,
                                    repeatDelay: 1,
                                    ease: "easeInOut",
                                  }}
                                >
                                  {amount === 50 && "❤️"}
                                  {amount === 100 && "🚀"}
                                  {amount === 200 && "💎"}
                                </motion.div>
                              </div>
                            )}
                            {amount < 50 && <div className="mt-1.5 h-1" />}
                          </div>

                          {/* Enhanced hover glow effect */}
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#005da2]/10 to-transparent pointer-events-none"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.15 }}
                          />
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input with Visual Feedback */}
                  <div className="relative">
                    <Input
                      prefix="£"
                      placeholder="Or enter any amount"
                      value={fixedAmount}
                      onChange={handleFixedAmountChange}
                      className="w-full"
                      type="text"
                      inputMode="decimal"
                      size="large"
                    />
                    {fixedAmount && parseFloat(fixedAmount) > 0 && (
                      <motion.div
                        className="mt-2 text-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={fixedAmount}
                      >
                        <span className="text-sm text-neutral-600">
                          {parseFloat(fixedAmount) === 5 &&
                            "💙 Every little bit helps - thank you!"}
                          {parseFloat(fixedAmount) === 10 &&
                            "✨ Thank you for your support!"}
                          {parseFloat(fixedAmount) === 25 &&
                            "🌟 Your generosity makes a real difference!"}
                          {parseFloat(fixedAmount) === 50 &&
                            "🎉 Thank you for your generous contribution!"}
                          {parseFloat(fixedAmount) === 100 &&
                            "🚀 Your amazing support helps us grow!"}
                          {parseFloat(fixedAmount) === 200 &&
                            "💎 Incredible generosity - thank you so much!"}
                          {![5, 10, 25, 50, 100, 200].includes(
                            parseFloat(fixedAmount)
                          ) &&
                            (parseFloat(fixedAmount) >= 50
                              ? "🌟 Thank you for your generous support!"
                              : parseFloat(fixedAmount) >= 25
                              ? "💙 Every contribution makes a difference"
                              : "✨ Thank you for supporting us")}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Summary - Only visible for design variants 1 and 2 when fixed amount is used (percentage shows inline) */}
            {donationAmount > 0 &&
              (designVariant === "1" || designVariant === "2") &&
              donationType === "fixed" &&
              (designVariant === "2" || showDonationSummary) && (
                <div className="pt-3 border-t border-neutral-200">
                  <div className="flex justify-between items-center text-sm">
                    <label className="text-sm font-medium text-neutral-900">
                      Donation
                    </label>
                    <span className="text-neutral-900">
                      +£{donationAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
          </div>
        </div>
      </>
    );
  }
);

export default CheckoutDonation;
