import React, { useState } from "react";
import { Button, Select } from "antd";
import { orgEvents, Event } from "../../org";
import CalendarEvent from "./calendar-event";

type SelectedValue = string | undefined;

const CalendarWeek: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<SelectedValue>(undefined);
  const [selectedValue1, setSelectedValue1] =
    useState<SelectedValue>(undefined);

  const handleReset = () => {
    setSelectedValue(undefined);
    setSelectedValue1(undefined);
  };

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };
  const handleChange1 = (value: string) => {
    setSelectedValue1(value);
  };

  const [activeDay, setActiveDay] = useState<string>(Object.keys(orgEvents)[0]);

  const daysList = Object.keys(orgEvents);

  const previousDay = () => {
    const index = daysList.indexOf(activeDay);
    if (index > 0) {
      setActiveDay(daysList[index - 1]);
    }
  };

  const nextDay = () => {
    const index = daysList.indexOf(activeDay);
    if (index < daysList.length - 1) {
      setActiveDay(daysList[index + 1]);
    }
  };

  return (
    <>
      <div className="mb-0.5 lg:-mt-3 lg:py-3 lg:mb-8 lg:flex lg:items-end lg:border-b lg:border-neutral-200 lg:sticky lg:top-0 lg:z-20 lg:bg-white/95 ring-2 ring-white/95">
        <h2 className="heading-lg">Adult and Child Lessons</h2>
        <div className="max-lg:overflow-x-auto max-lg:z-30 max-lg:bg-white/95 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:ml-auto max-lg:py-2.5 max-lg:border-t max-lg:border-black/10">
          <div className="container flex lg:flex-wrap items-center gap-2 lg:gap-2.5 lg:p-0">
            <Select
              value={selectedValue}
              placeholder="Class"
              onChange={handleChange}
              className="ant-select-token"
              popupClassName="ant-select-mobile"
              options={[
                { value: "smileytheturle", label: "Smiley the Turtle" },
                { value: "bubbletheseahorse", label: "Bubble the Seahorse" },
                { value: "carltheclownfish", label: "Carl the Clownfish" },
                {
                  value: "danyythedolphin",
                  label: "Danny the Dolphin (SEND)",
                },
                { value: "jellythejellyfish", label: "Jelly the Jellyfish" },

                { value: "snappythecrab", label: "Snappy the Crab" },
                {
                  value: "twinklethestarfish",
                  label: "Twinkle The Starfish ",
                },
              ]}
            />
            <Select
              value={selectedValue1}
              placeholder="Location"
              onChange={handleChange1}
              className="ant-select-token"
              popupClassName="ant-select-mobile"
              options={[{ value: "littleThetford", label: "Little Thetford" }]}
            />
            {(selectedValue || selectedValue1) && (
              <Button
                type="link"
                onClick={handleReset}
                className="!bg-white !-ml-2 lg:hidden"
                title="Clear filters"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-20 flex items-center gap-3 py-3.5 mb-2 bg-gradient-to-b from-white/95 lg:hidden">
        <Button
          onClick={previousDay}
          shape="circle"
          className="!rounded-md bg-white"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="mx-auto"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M13.25 8.75L9.75 12L13.25 15.25"
            ></path>
          </svg>
        </Button>
        <div className="flex-grow text-center">
          <Button block={true} className="!bg-white">
            {activeDay}
          </Button>
        </div>
        <Button
          onClick={nextDay}
          shape="circle"
          className="!rounded-md bg-white"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="mx-auto"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
          </svg>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3 p-px lg:hidden">
        {orgEvents[activeDay].map((event: Event, index: number) => (
          <CalendarEvent
            key={`${index}`}
            activeDay={activeDay}
            index={index}
            event={{
              img: event.img,
              hideImage: event.hideImage,
              title: event.title,
              description: event.description,
              link: event.link,
              address: event.address,
              startTime: event.startTime,
              endTime: event.endTime,
              price: event.price,
              colour: event.colour,
            }}
            singleProduct={false}
          />
        ))}
      </div>
      <div className="items-start hidden w-full gap-3 -mt-2 lg:flex">
        {Object.entries(orgEvents).map(([day, events]) => (
          <div key={day} className="max-w-[25%] w-full min-w-0">
            <div className="sticky z-10 hidden pt-2.5 pb-2 text-center mb-1 lg:block top-14 bg-white/95 heading-sm ring-2 ring-white/95">
              {day}
            </div>
            <div className="grid grid-cols-1 gap-3 p-px">
              {events.map((event: Event, index: number) => (
                <CalendarEvent
                  key={`${index}`}
                  activeDay={activeDay}
                  index={index}
                  event={{
                    img: event.img,
                    hideImage: event.hideImage,
                    title: event.title,
                    description: event.description,
                    link: event.link,
                    address: event.address,
                    startTime: event.startTime,
                    endTime: event.endTime,
                    price: event.price,
                    colour: event.colour,
                  }}
                  singleProduct={false}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CalendarWeek;
