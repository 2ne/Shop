import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber, Radio, Select, message } from "antd";
import FormHeader from "../form-header";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FinderSwim from "./finder-swim";
import FinderDecoration from "./finder-decoration";
import Skills from "./dev-programme";
import { AnimatePresence, motion } from "framer-motion";

type FinderState = {
  radioValue: string | null;
  currentLevel: number | null;
  currentQuestionIndex: number;
  showLevel: boolean;
  dobInfo: {
    age: number | null;
  };
};

const initialState: FinderState = {
  radioValue: null,
  currentLevel: null,
  currentQuestionIndex: 0,
  showLevel: false,
  dobInfo: {
    age: null,
  },
};

const Finder: React.FC = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState<FinderState>(initialState);
  const [currentAge, setCurrentAge] = useState<number | null>(null);

  useEffect(() => {
    setState((prev) => ({ ...prev, radioValue: null }));
  }, [state.currentQuestionIndex, state.currentLevel]);

  const navigate = useNavigate();

  const navigateToTimetable = (
    level?: number,
    age?: number,
    location?: string
  ) => {
    const finalLevel = level ?? state.currentLevel;
    const finalAge = age ?? currentAge;
    const finalLocation = location ?? form.getFieldValue("location");

    const params = new URLSearchParams();

    if (finalLevel !== null && finalLevel !== undefined) {
      params.set("level", finalLevel.toString());
      message.success(
        ` Your current skill level has been set as Level ${finalLevel}`
      );
    }
    if (finalAge !== null && finalAge !== undefined) {
      params.set("age", finalAge.toString());
    }
    if (finalLocation) {
      params.set("location", finalLocation);
    }

    const paramString = params.toString();
    navigate(`/AdultChildLessons?${paramString}`);
  };

  const resetToLevelOne = () => {
    setState((prev) => ({
      ...prev,
      currentLevel: 1,
      currentQuestionIndex: 0,
    }));
  };

  const resetLevel = () => {
    setState((prev) => ({
      ...prev,
      currentLevel: null,
      currentQuestionIndex: 0,
    }));
  };

  const moveToNextLevelOrQuestion = () => {
    // Add null check here
    if (state.currentLevel === null) return;

    const nextQuestionIndex = state.currentQuestionIndex + 1;
    const nextLevel = state.currentLevel + 1;

    if (nextQuestionIndex < Skills[state.currentLevel - 1].questions.length) {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: nextQuestionIndex,
      }));
    } else if (nextLevel <= Skills.length) {
      setState((prev) => ({
        ...prev,
        currentLevel: nextLevel,
        currentQuestionIndex: 0,
      }));
    } else {
      navigateToTimetable();
    }
  };

  const handleAnswer = (answer: boolean) => {
    if (state.currentLevel === null) {
      setState((prev) => ({
        ...prev,
        currentLevel: 1,
        currentQuestionIndex: 0,
      }));
      return;
    }

    if (answer) {
      moveToNextLevelOrQuestion();
    } else {
      // Add null check here
      if (state.currentLevel === null) return;

      if (state.currentLevel === 1 && state.currentQuestionIndex === 0) {
        navigateToTimetable(1);
      } else if (state.currentLevel > 1) {
        resetToLevelOne();
      } else {
        navigateToTimetable(1);
      }
    }
  };

  const onFinish = (values: any) => {
    const selectedLevel = values.skillLevel
      ? parseInt(values.skillLevel, 10)
      : state.currentLevel;

    handleLevelChange(selectedLevel);

    if (selectedLevel !== null) {
      navigateToTimetable(selectedLevel);
    } else {
      setState((prev) => ({ ...prev, currentLevel: 1 }));
    }
  };

  const { currentLevel, currentQuestionIndex } = state;

  const handleAgeInputChange = (value: number | null) => {
    setCurrentAge(value);
    form.setFieldsValue({ age: value });
  };

  const handleLevelChange = (value: number | null) => {
    setState((prev) => ({ ...prev, currentLevel: value }));
    form.setFieldsValue({ skillLevel: value });
  };

  return (
    <>
      {currentLevel !== null && (
        <div className="lg:hidden">
          <Button
            type="link"
            className="!p-0 !h-auto mb-6"
            onClick={resetLevel}
            icon={
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="relative -ml-2 -mr-2 top-px"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13.25 8.75L9.75 12l3.5 3.25"
                ></path>
              </svg>
            }
          >
            Back to Class Finder
          </Button>
        </div>
      )}
      <div className="items-center mb-8 lg:mb-20 lg:flex lg:justify-between lg:gap-20">
        <div className="shrink-0 w-full lg:max-w-[22.5rem] relative lg:mt-[-7.5vh]">
          <div
            className={
              currentLevel !== null
                ? "rounded-md bg-white/95 shadow ring-1 ring-opacity-5 ring-black p-6 lg:sticky top-8"
                : ""
            }
          >
            <FinderDecoration />
            <div className="relative z-10 space-y-6">
              <FormHeader
                title={
                  currentLevel === null ? "Class Finder" : "Find Your Level"
                }
                subtitle={
                  currentLevel === null
                    ? "Enter the participant's details and we'll help find the perfect class for their level."
                    : ""
                }
              />
              {currentLevel === null ? (
                <section>
                  <Form
                    form={form}
                    name="form"
                    layout="vertical"
                    onFinish={onFinish}
                  >
                    <div className="relative p-4 pb-5 mb-4 bg-white rounded-md shadow ring-1 ring-black ring-opacity-5">
                      <Form.Item
                        name="age"
                        label={
                          <>
                            Participant age{" "}
                            <span className="text-neutral-500">· Required</span>
                          </>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please enter an age",
                          },
                        ]}
                      >
                        <div className="flex items-center">
                          <InputNumber
                            value={currentAge}
                            onChange={handleAgeInputChange}
                            min={0}
                            max={120}
                            placeholder="Enter age in years..."
                            className="w-full"
                            inputMode="numeric"
                          />
                        </div>
                      </Form.Item>
                      <Form.Item
                        name="location"
                        label="Location"
                        rules={[{ required: false }]}
                        className="relative"
                      >
                        <Select
                          placeholder="Select a location..."
                          options={[
                            {
                              value: "Little Thetford",
                              label: "Little Thetford",
                            },
                            { value: "Newmarket", label: "Newmarket" },
                          ]}
                        ></Select>
                      </Form.Item>
                      <Form.Item
                        name="skillLevel"
                        label="Skill level"
                        rules={[{ required: false }]}
                        className="relative"
                        extra="Leave blank to use our interactive level finder"
                      >
                        <Select
                          placeholder="Select a level..."
                          options={Array.from({ length: 7 }, (_, i) => {
                            const level = i + 1;
                            return {
                              value: `${level}`,
                              label: `Level ${level}`,
                            };
                          })}
                        ></Select>
                      </Form.Item>
                    </div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      icon={<SearchOutlined />}
                      className="mt-3"
                    >
                      Find Level
                    </Button>
                  </Form>
                </section>
              ) : (
                <section>
                  <Form
                    layout="vertical"
                    requiredMark={false}
                    className="min-h-[164px] flex items-end w-full"
                  >
                    <Form.Item
                      className="[&_.ant-form-item-label>label]:!text-base w-full flex-grow"
                      label={
                        Skills[currentLevel - 1].questions[currentQuestionIndex]
                      }
                    >
                      <Radio.Group
                        className="w-full select-none"
                        size="large"
                        value={state.radioValue}
                        onChange={(e) => {
                          setState((prev) => ({
                            ...prev,
                            radioValue: e.target.value,
                          }));
                          handleAnswer(e.target.value === "yes");
                        }}
                      >
                        <div className="grid grid-cols-2 gap-4 mt-2 text-center">
                          <Radio.Button
                            value="yes"
                            className="group shadow-sm hover:shadow-md before:!hidden border rounded-md w-full !h-auto flex justify-center pt-4 pb-1.5 text-emerald-600 hover:text-emerald-600 font-medium"
                          >
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-10 h-10 p-1 transition-all rounded-full bg-emerald-100 group-hover:bg-emerald-500 group-hover:text-white"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M7.75 12.75l2.25 2.5 6.25-6.5"
                                ></path>
                              </svg>
                            </div>
                            <div>Yes</div>
                          </Radio.Button>
                          <Radio.Button
                            value="no"
                            className="group shadow-sm hover:shadow-md before:!hidden border rounded-md w-full !h-auto flex justify-center pt-4 pb-1.5 text-rose-600 hover:text-rose-600 font-medium"
                          >
                            <div>
                              <svg
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-10 h-10 p-2 transition-all rounded-full bg-rose-100 group-hover:bg-rose-500 group-hover:text-white"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.75"
                                  d="M17.25 6.75l-10.5 10.5M6.75 6.75l10.5 10.5"
                                ></path>
                              </svg>
                            </div>
                            <div>No</div>
                          </Radio.Button>
                        </div>
                      </Radio.Group>
                    </Form.Item>
                  </Form>
                </section>
              )}
            </div>
          </div>
          {currentLevel !== null && (
            <Button
              type="link"
              className="!p-0 !h-auto mt-6 !hidden lg:!flex"
              onClick={resetLevel}
              icon={
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="relative -ml-2 -mr-2 top-px"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13.25 8.75L9.75 12l3.5 3.25"
                  ></path>
                </svg>
              }
            >
              Back to Class Finder
            </Button>
          )}
        </div>
        {currentLevel === null ? (
          <FinderSwim />
        ) : (
          <>
            <div className="lg:mt-0.5 mt-6 flex-grow">
              <AnimatePresence mode="wait">
                {(() => {
                  const currentMedia =
                    Skills[currentLevel - 1]?.media?.[currentQuestionIndex];
                  const fallbackImage = "./src/assets/finder-12.jpg";
                  const src = currentMedia?.src ?? fallbackImage;
                  const type = currentMedia?.type ?? "image";

                  return type === "video" ? (
                    <motion.video
                      controls={false}
                      autoPlay
                      muted
                      loop
                      playsInline
                      webkit-playsInline
                      key={src}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative w-full overflow-hidden border-2 border-white rounded-lg shadow pointer-events-none group shadow-neutral-900/10 ring-1 ring-neutral-600 ring-opacity-10"
                      src={src}
                    ></motion.video>
                  ) : (
                    <motion.img
                      key={src}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative w-full overflow-hidden border-2 border-white rounded-lg shadow group shadow-neutral-900/10 ring-1 ring-neutral-600 ring-opacity-10"
                      src={src}
                    />
                  );
                })()}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Finder;
