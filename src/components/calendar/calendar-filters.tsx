import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Checkbox, Collapse, Drawer, Slider, Tree } from "antd";
import { CloseOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { treeData } from "./calendar-data";
const { Panel } = Collapse;

function useViewportHeightPercentage(percentage: number) {
  const [height, setHeight] = useState(window.innerHeight * (percentage / 100));

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight * (percentage / 100));
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [percentage]);

  return height;
}

type SelectedValue = string | undefined;

export interface CalendarFiltersProps {
  singleProduct: boolean;
}

const CalendarFilters: React.FC<CalendarFiltersProps> = ({ singleProduct }) => {
  const [isClassDrawerOpen, setIsClassDrawerOpen] = useState(false);
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const [isAgeDrawerOpen, setIsAgeDrawerOpen] = useState(false);
  const [isLocationDrawerOpen, setIsLocationDrawerOpen] = useState(false);
  const [isCoachDrawerOpen, setIsCoachDrawerOpen] = useState(false);
  const [isTimeDrawerOpen, setIsTimeDrawerOpen] = useState(false);
  const [currentAge, setCurrentAge] = useState<[number, number]>([0, 18]);
  const [currentLocation, setCurrentLocation] = useState<CheckboxValueType[]>(
    []
  );
  const [availability, setAvailability] = useState<CheckboxValueType[]>([]);
  const [currentLevel, setCurrentLevel] = useState<CheckboxValueType[]>([]);
  const [selectedClassValue, setSelectedClassValue] =
    useState<SelectedValue>(undefined);
  const [selectedTimeOfDayValue, setSelectedTimeOfDayValue] =
    useState<SelectedValue>(undefined);
  const [selectedLocationValue, setSelectedLocationValue] =
    useState<SelectedValue>(undefined);

  const safeHeight = useViewportHeightPercentage(75);
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);

    // Handle 'age' parameter
    const ageValue = "0"; // Replace this with params.get("age");
    const updatedAge = ageValue ? parseInt(ageValue, 0) : null;

    if (updatedAge !== null) {
      setCurrentAge([updatedAge, currentAge[1]]);
    } else {
      setCurrentAge([0, 18]);
    }

    // Handle 'location' parameter
    const locationValue = params.get("location");
    const updatedLocations = locationValue ? locationValue.split(",") : [];
    setCurrentLocation(updatedLocations);

    // Handle 'level' parameter
    const levelValue = params.get("level");
    const updatedLevels = levelValue ? levelValue.split(",") : [];
    setCurrentLevel(updatedLevels);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams();

    // Update 'age' in URL
    if (currentAge !== null) {
      params.set("age", currentAge.toString());
    } else {
      params.delete("age");
    }

    // Update 'location' in URL
    if (currentLocation.length > 0) {
      params.set("location", "");
    } else {
      params.delete("location");
    }

    // Update 'level' in URL
    if (currentLevel.length > 0) {
      params.set("level", currentLevel.join(","));
    } else {
      params.delete("level");
    }

    // Update the URL without causing a page refresh
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  }, [currentAge, currentLocation, currentLevel]);

  const handleLocationChange = (
    checkedValues: React.SetStateAction<CheckboxValueType[]>
  ) => {
    setCurrentLocation(checkedValues);
  };

  const handleAvailabilityChange = (
    checkedValues: React.SetStateAction<CheckboxValueType[]>
  ) => {
    setAvailability(checkedValues);
  };

  const handleLevelChange = (
    checkedValues: React.SetStateAction<CheckboxValueType[]>
  ) => {
    setCurrentLevel(checkedValues);
  };

  const addClassToHTML = () => {
    document.documentElement.classList.add("max-lg:overflow-hidden");
  };

  const removeClassFromHTML = () => {
    document.documentElement.classList.remove("max-lg:overflow-hidden");
  };

  const resetClass = () => {
    setSelectedClassValue(undefined);
  };

  const resetLocation = () => {
    setSelectedLocationValue(undefined);
  };

  const resetTimeOfDay = () => {
    setSelectedTimeOfDayValue(undefined);
  };

  const resetAge = () => {
    setCurrentAge([0, 18]);
  };

  const clearAll = () => {
    resetClass();
    resetLocation();
    resetTimeOfDay();
    resetAge();
  };

  const handleClassChange = (value: string) => {
    setSelectedClassValue(value);
  };

  const handleTimeOfDayChange = (value: string) => {
    setSelectedTimeOfDayValue(value);
  };

  const toggleClassDrawer = () => {
    setIsClassDrawerOpen(!isClassDrawerOpen);
  };

  const toggleProductDrawer = () => {
    setIsProductDrawerOpen(!isProductDrawerOpen);
  };

  const toggleAgeDrawer = () => {
    setIsAgeDrawerOpen(!isAgeDrawerOpen);
  };

  const toggleLocationDrawer = () => {
    setIsLocationDrawerOpen(!isLocationDrawerOpen);
  };

  const toggleTimeDrawer = () => {
    setIsTimeDrawerOpen(!isTimeDrawerOpen);
  };

  const toggleCoachDrawer = () => {
    setIsCoachDrawerOpen(!isCoachDrawerOpen);
  };

  return (
    <>
      {/* mobile filters */}
      <div className="max-lg:overflow-x-auto scrollbar-thin-x overscroll-contain lg:hidden max-lg:z-30 max-lg:bg-white/95 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:ml-auto max-lg:py-2.5 max-lg:border-t max-lg:border-black/10">
        <div className="container flex lg:flex-wrap items-center gap-2 lg:gap-2.5 lg:p-0 [&_.ant-btn:last-child]:after:w-3 after:h-3 after:bg-transparent after:block after:absolute after:inset-y-0 after:-right-3">
          {singleProduct ? (
            <>
              <Button
                onClick={clearAll}
                className="shrink-0 !p-0 w-8 h-8 flex justify-center text-center relative !rounded-full !border-interactive !text-interactive !bg-interactive after:absolute after:inset-0 after:bg-white/[0.925] after:rounded-full"
              >
                <CloseOutlined className="relative z-10 text-xs -top-px" />
              </Button>
              <Button onClick={toggleClassDrawer} className="!rounded-full">
                <div>Class</div>
                <DownOutlined className="ml-1.5 text-xs relative -top-px -mr-0.5" />
              </Button>
              <Drawer
                rootClassName="ant-drawer-bottom-custom"
                placement="bottom"
                title="Class"
                open={isClassDrawerOpen}
                onClose={() => setIsClassDrawerOpen(false)}
                afterOpenChange={(open) => {
                  if (open) {
                    addClassToHTML();
                  } else {
                    removeClassFromHTML();
                  }
                }}
              >
                <>
                  <Checkbox.Group className="mb-2 space-y-2.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                    <Checkbox
                      value="Smiley the Turtle"
                      className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                    >
                      <div className="bg-emerald-50 text-emerald-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                        Smiley the Turtle
                      </div>
                    </Checkbox>
                    <Checkbox
                      value="Bubble the Seahorse"
                      className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                    >
                      <div className="bg-indigo-50 text-indigo-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                        Bubble the Seahorse
                      </div>
                    </Checkbox>
                    <Checkbox
                      value="Carl the Clownfish"
                      className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                    >
                      <div className="bg-orange-50 text-orange-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                        Carl the Clownfish
                      </div>
                    </Checkbox>
                    <Checkbox
                      value="Danny the Dolphin"
                      className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                    >
                      <div className="bg-sky-50 text-sky-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                        Danny the Dolphin
                      </div>
                    </Checkbox>
                    <Checkbox
                      value="Jelly the Jellyfish"
                      className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                    >
                      <div className="bg-violet-50 text-violet-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                        Jelly the Jellyfish
                      </div>
                    </Checkbox>
                    <Checkbox
                      value="Snappy the Crab"
                      className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                    >
                      <div className="bg-red-50 text-red-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                        Snappy the Crab
                      </div>
                    </Checkbox>
                    <Checkbox
                      value="Twinkle the Starfish"
                      className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                    >
                      <div className="bg-pink-50 text-pink-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                        Twinkle the Starfish
                      </div>
                    </Checkbox>
                  </Checkbox.Group>
                  <div className="sticky z-10 px-4 py-4 mt-auto -mx-4 -mb-4 sm:px-5 sm:py-5 sm:-mx-5 -bottom-4 bg-white/95">
                    <Button
                      size="large"
                      type="primary"
                      block
                      onClick={toggleClassDrawer}
                    >
                      Select
                    </Button>
                  </div>
                </>
              </Drawer>
            </>
          ) : (
            <>
              <Button onClick={toggleProductDrawer} className="!rounded-full">
                <div>Product</div>
                <DownOutlined className="ml-1.5 text-xs relative -top-px -mr-0.5" />
              </Button>
              <Drawer
                rootClassName="ant-drawer-bottom-custom"
                placement="bottom"
                title="Product"
                open={isProductDrawerOpen}
                onClose={() => setIsProductDrawerOpen(false)}
                afterOpenChange={(open) => {
                  if (open) {
                    addClassToHTML();
                  } else {
                    removeClassFromHTML();
                  }
                }}
              >
                <>
                  <Tree
                    treeData={treeData}
                    checkable={true}
                    selectable={false}
                    className="-ml-2.5 [&_.ant-tree-treenode]:!gap-x-1 [&_.ant-tree-checkbox]:mt-[3px] [&_.ant-tree-checkbox-inner]:!h-[1.175rem] [&_.ant-tree-checkbox-inner]:!w-[1.175rem] [&_.ant-tree-checkbox-inner:after]:!left-[4.25px] [&_.ant-tree-checkbox-indeterminate_.ant-tree-checkbox-inner:after]:!left-2 [&_.ant-tree-treenode]:!pb-2.5 [&_.ant-tree-switcher-icon]:!text-xs [&_.ant-tree-switcher-icon]:relative [&_.ant-tree-switcher-icon]:-top-0.5 [&_.ant-tree-switcher]:after:absolute [&_.ant-tree-switcher]:after:-inset-2"
                  />
                  <div className="sticky z-10 px-4 py-4 mt-auto -mx-4 -mb-4 sm:px-5 sm:py-5 sm:-mx-5 -bottom-4 bg-white/95">
                    <Button
                      size="large"
                      type="primary"
                      block
                      onClick={toggleProductDrawer}
                    >
                      Select
                    </Button>
                  </div>
                </>
              </Drawer>
            </>
          )}
          <>
            <Button
              onClick={toggleAgeDrawer}
              className="relative !rounded-full !border-interactive !text-interactive !bg-interactive after:absolute after:inset-0 after:bg-white/[0.925] after:rounded-full"
            >
              <div className="relative z-10">
                {currentAge !== null && (
                  <span>
                    {currentAge[0] === currentAge[1]
                      ? `${currentAge[0]} years old`
                      : `${currentAge[0]} to ${currentAge[1]} years`}
                  </span>
                )}
              </div>
              <DownOutlined className="ml-1.5 text-xs relative z-10 -top-px -mr-0.5" />
            </Button>
            <Drawer
              rootClassName="ant-drawer-bottom-custom ant-drawer-bottom-age"
              placement="bottom"
              title={
                <div>
                  Age{" "}
                  {currentAge !== null && (
                    <span className="text-neutral-500">
                      ·{" "}
                      {currentAge[0] === currentAge[1]
                        ? `${currentAge[0]} years old`
                        : `${currentAge[0]} to ${currentAge[1]} years`}
                    </span>
                  )}
                  <span className="text-neutral-500"> · </span>
                  <Button type="link" className="!p-0">
                    Clear
                  </Button>
                </div>
              }
              open={isAgeDrawerOpen}
              onClose={() => setIsAgeDrawerOpen(false)}
              afterOpenChange={(open) => {
                if (open) {
                  addClassToHTML();
                } else {
                  removeClassFromHTML();
                }
              }}
            >
              <div className="px-0.5 mt-7">
                <Slider
                  marks={{ 0: "0", 18: "18+" }}
                  min={0}
                  max={18}
                  defaultValue={currentAge}
                  onChange={(value) => setCurrentAge(value as [number, number])}
                  className="[&_.ant-slider-mark]:-top-9"
                  range={true}
                />
              </div>
              <div className="sticky z-10 px-4 py-4 mt-auto -mx-4 -mb-4 sm:px-5 sm:py-5 sm:-mx-5 -bottom-4 bg-white/95">
                <Button
                  size="large"
                  type="primary"
                  block
                  onClick={toggleAgeDrawer}
                >
                  Select
                </Button>
              </div>
            </Drawer>
          </>
          <>
            <Button onClick={toggleLocationDrawer} className="!rounded-full">
              <div>Location</div>
              <DownOutlined className="ml-1.5 text-xs relative -top-px -mr-0.5" />
            </Button>
            <Drawer
              rootClassName="ant-drawer-bottom-custom"
              placement="bottom"
              title="Location"
              open={isLocationDrawerOpen}
              onClose={() => setIsLocationDrawerOpen(false)}
              afterOpenChange={(open) => {
                if (open) {
                  addClassToHTML();
                } else {
                  removeClassFromHTML();
                }
              }}
            >
              <>
                <Checkbox.Group className="mb-2 space-y-2.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                  <Checkbox
                    value="Little Thetford"
                    className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                  >
                    <div className="px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      Little Thetford
                    </div>
                  </Checkbox>
                  <Checkbox
                    value="Newmarket"
                    className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                  >
                    <div className="px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      Newmarket
                    </div>
                  </Checkbox>
                </Checkbox.Group>
                <div className="sticky z-10 px-4 py-4 mt-auto -mx-4 -mb-4 sm:px-5 sm:py-5 sm:-mx-5 -bottom-4 bg-white/95">
                  <Button
                    size="large"
                    type="primary"
                    block
                    onClick={toggleLocationDrawer}
                  >
                    Select
                  </Button>
                </div>
              </>
            </Drawer>
          </>
          <>
            <Button onClick={toggleTimeDrawer} className="!rounded-full">
              <div>Time of day</div>
              <DownOutlined className="ml-1.5 text-xs relative -top-px -mr-0.5" />
            </Button>
            <Drawer
              rootClassName="ant-drawer-bottom-custom ant-drawer-bottom-time"
              placement="bottom"
              title="Time of day"
              open={isTimeDrawerOpen}
              onClose={() => setIsTimeDrawerOpen(false)}
              afterOpenChange={(open) => {
                if (open) {
                  addClassToHTML();
                } else {
                  removeClassFromHTML();
                }
              }}
            >
              <>
                <Checkbox.Group className="mb-2 space-y-2.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                  <Checkbox
                    value="Morning"
                    className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                  >
                    <div className="px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      <span>Morning</span>
                      <span className="text-neutral-500"> · 00:00 - 12:00</span>
                    </div>
                  </Checkbox>
                  <Checkbox
                    value="Afternoon"
                    className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                  >
                    <div className="px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      <span>Afternoon</span>
                      <span className="text-neutral-500"> · 12:00 - 18:00</span>
                    </div>
                  </Checkbox>
                  <Checkbox
                    value="Evening"
                    className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                  >
                    <div className="px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      <span>Evening</span>
                      <span className="text-neutral-500"> · 18:00 - 00:00</span>
                    </div>
                  </Checkbox>
                </Checkbox.Group>
                <div className="sticky z-10 px-4 py-4 mt-auto -mx-4 -mb-4 sm:px-5 sm:py-5 sm:-mx-5 -bottom-4 bg-white/95">
                  <Button
                    size="large"
                    type="primary"
                    block
                    onClick={toggleTimeDrawer}
                  >
                    Select
                  </Button>
                </div>
              </>
            </Drawer>
          </>
          <>
            <Button
              onClick={toggleCoachDrawer}
              className="!rounded-full after:w-3 after:h-3 after:bg-transparent after:block after:absolute after:inset-y-0 after:-right-3"
            >
              <div>Coach</div>
              <DownOutlined className="ml-1.5 text-xs relative -top-px -mr-0.5" />
            </Button>
            <Drawer
              rootClassName="ant-drawer-bottom-custom"
              placement="bottom"
              title="Coach"
              open={isCoachDrawerOpen}
              onClose={() => setIsCoachDrawerOpen(false)}
              afterOpenChange={(open) => {
                if (open) {
                  addClassToHTML();
                } else {
                  removeClassFromHTML();
                }
              }}
            >
              <>
                <Checkbox.Group className="mb-2 space-y-2.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                  <Checkbox
                    value="Michael Phelps"
                    className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                  >
                    <div className="px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      Michael Phelps
                    </div>
                  </Checkbox>
                  <Checkbox
                    value="Adam Peaty"
                    className="[&_.ant-checkbox-inner]:h-[1.175rem] [&_.ant-checkbox-inner]:w-[1.175rem]  [&_.ant-checkbox-inner:after]:left-[4.25px]"
                  >
                    <div className="px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      Adam Peaty
                    </div>
                  </Checkbox>
                </Checkbox.Group>
                <div className="sticky z-10 px-4 py-4 mt-auto -mx-4 -mb-4 sm:px-5 sm:py-5 sm:-mx-5 -bottom-4 bg-white/95">
                  <Button
                    size="large"
                    type="primary"
                    block
                    onClick={toggleCoachDrawer}
                  >
                    Select
                  </Button>
                </div>
              </>
            </Drawer>
          </>
        </div>
      </div>
      {/* desktop filters */}
      <div className="hidden lg:block -mt-1.5">
        <div className="sticky z-10 [scrollbar-gutter:stable;] pr-3 pl-0.5 -ml-0.5 overflow-y-auto overflow-x-clip top-16 scrollbar-thin-y max-h-[calc(100vh-4.5rem)] max-h-[calc(100dvh-4.5rem)]">
          <Collapse
            defaultActiveKey={["1", "2", "3", "4"]}
            ghost
            bordered={false}
            className="select-none ant-collapse-calendar"
            expandIconPosition="end"
            expandIcon={({ isActive }) => (
              <RightOutlined
                className={`transition-color ${
                  isActive ? "!text-neutral-700" : "!text-neutral-400"
                }`}
                rotate={isActive ? 90 : 0}
              />
            )}
          >
            {singleProduct ? (
              <Panel header="Class" key="1">
                <Checkbox.Group className="space-y-1.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                  <Checkbox value="Smiley the Turtle">
                    <div className="bg-emerald-50 text-emerald-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      Smiley the Turtle
                    </div>
                  </Checkbox>
                  <Checkbox value="Bubble the Seahorse">
                    <div className="bg-indigo-50 text-indigo-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      Bubble the Seahorse
                    </div>
                  </Checkbox>
                  <Checkbox value="Carl the Clownfish">
                    <div className="bg-orange-50 text-orange-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      Carl the Clownfish
                    </div>
                  </Checkbox>
                  <Checkbox value="Danny the Dolphin">
                    <div className="bg-sky-50 text-sky-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      Danny the Dolphin
                    </div>
                  </Checkbox>
                  <Checkbox value="Jelly the Jellyfish">
                    <div className="bg-violet-50 text-violet-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      Jelly the Jellyfish
                    </div>
                  </Checkbox>
                  <Checkbox value="Snappy the Crab">
                    <div className="bg-red-50 text-red-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      Snappy the Crab
                    </div>
                  </Checkbox>
                  <Checkbox value="Twinkle the Starfish">
                    <div className="bg-pink-50 text-pink-800 px-1.5 rounded line-clamp-2 ml-1 leading-[22px]">
                      Twinkle the Starfish
                    </div>
                  </Checkbox>
                </Checkbox.Group>
              </Panel>
            ) : (
              <Panel header="Classes" key="1">
                <Tree
                  checkable={true}
                  selectable={false}
                  treeData={treeData}
                  className="ant-tree-shop"
                />
              </Panel>
            )}
            <Panel
              header={
                <>
                  Age{" "}
                  {currentAge !== null && (
                    <span className="text-neutral-600">
                      ·{" "}
                      {currentAge[0] === currentAge[1]
                        ? `${currentAge[0]} years old`
                        : `${currentAge[0]} to ${currentAge[1]} years old`}
                    </span>
                  )}
                </>
              }
              key="2"
            >
              <div className="-mt-2">
                <Slider
                  marks={{ 0: "0", 18: "18+" }}
                  min={0}
                  max={18}
                  defaultValue={currentAge}
                  onChange={(value) => setCurrentAge(value as [number, number])}
                  range={true}
                />
              </div>
            </Panel>
            <Panel header="Location" key="3">
              <Checkbox.Group
                value={currentLocation}
                onChange={handleLocationChange}
                className="space-y-1.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0"
              >
                <Checkbox value="Little Thetford">
                  <div className="truncate">Little Thetford</div>
                </Checkbox>
                <Checkbox value="Newmarket">
                  <div className="truncate">Newmarket</div>
                </Checkbox>
              </Checkbox.Group>
            </Panel>
            <Panel header="Availability" key="4">
              <Checkbox.Group
                value={availability}
                onChange={handleAvailabilityChange}
                className="space-y-1.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0"
              >
                <Checkbox value="">
                  <div className="truncate">Not fully booked</div>
                </Checkbox>
              </Checkbox.Group>
            </Panel>
            <Panel header="Level" key="5">
              <Checkbox.Group
                value={currentLevel}
                onChange={handleLevelChange}
                className="grid items-center grid-cols-4 gap-y-2"
              >
                {[
                  ...Array.from({ length: 8 }, (_, i) => ({
                    value: `${i + 1}`,
                    label: `${i + 1}`,
                  })),
                ].map(({ value, label }) => (
                  <Checkbox key={value} value={value}>
                    <div className="relative -ml-px text-xs -top-px">
                      <span>{label}</span>
                    </div>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Panel>
            <Panel header="Time of day" key="6">
              <Checkbox.Group className="space-y-1.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                <Checkbox value="Morning">
                  <div className="truncate">
                    <span>Morning</span>
                    <span className="text-neutral-500"> · 00:00 - 12:00</span>
                  </div>
                </Checkbox>
                <Checkbox value="Afternoon">
                  <div className="truncate">
                    <span>Afternoon</span>
                    <span className="text-neutral-500"> · 12:00 - 18:00</span>
                  </div>
                </Checkbox>
                <Checkbox value="Evening">
                  <div className="truncate">
                    <span>Evening</span>
                    <span className="text-neutral-500"> · 18:00 - 00:00</span>
                  </div>
                </Checkbox>
              </Checkbox.Group>
            </Panel>
            <Panel header="Coach" key="7">
              <Checkbox.Group className="space-y-1.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                <Checkbox value="MichaelPhelps">
                  <div className="truncate">
                    <span>Michael Phelps</span>
                  </div>
                </Checkbox>
                <Checkbox value="AdamPeaty">
                  <div className="truncate">
                    <span>Adam Peaty</span>
                  </div>
                </Checkbox>
              </Checkbox.Group>
            </Panel>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default CalendarFilters;
