import React, { useEffect, useState } from "react";
import { Button, DatePicker, message } from "antd";
import { orgEvents, orgClassEvents, Event } from "../../org";
import CalendarEvent from "./calendar-event";
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import CalendarFilters from "./calendar-filters";

export interface CalendarProps {
  singleProduct: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ singleProduct }) => {
  const [date, setDate] = useState(dayjs());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("container-lg");

    return () => {
      document.documentElement.classList.remove("container-lg");
    };
  }, []);

  const handleDateChange = (value: any) => {
    setDate(value);
    setOpen(false);
  };

  const [activeDay, setActiveDay] = useState<string>(
    singleProduct ? Object.keys(orgClassEvents)[0] : Object.keys(orgEvents)[0]
  );

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const previousDay = () => {
    const index = daysOfWeek.indexOf(activeDay);
    if (index > 0) {
      setActiveDay(daysOfWeek[index - 1]);
    }
  };

  const nextDay = () => {
    const index = daysOfWeek.indexOf(activeDay);
    if (index < daysOfWeek.length - 1) {
      setActiveDay(daysOfWeek[index + 1]);
    }
  };

  // fake stuff to make it look like this week and today is active
  let fakeDateNumberCounter = getMondayDate();
  const fakeToday = getCurrentDate();

  function getMondayDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = dayOfWeek - 1; // Monday is the first day of the week

    today.setDate(today.getDate() - difference);
    return today.getDate();
  }

  function getCurrentDate() {
    const today = new Date();
    return today.getDate();
  }

  const monthYearFormat = "MMMM YYYY";

  const NoEventsToday = () => {
    return (
      <div className="pt-1 space-y-1 text-sm text-center cursor-default text-neutral-400">
        <div>
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="w-10 h-10 mx-auto"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M4.75 8.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM8 4.75v3.5M16 4.75v3.5M7.75 10.75h8.5"
            ></path>
          </svg>
        </div>
        <div>No events</div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-0.5 lg:-mt-3 lg:py-3 lg:mb-6 lg:flex lg:items-end lg:border-b lg:border-neutral-200 lg:sticky lg:top-0 lg:z-20 lg:bg-white/95 ring-2 ring-white/95">
        {/* shared title */}
        <div className="flex-grow w-full">
          <h2 className="heading-lg">
            {singleProduct
              ? "Adult and Child Lessons"
              : "Little Telford Timetable"}
          </h2>
        </div>
        {/* desktop datepicker */}
        <div className="relative hidden h-8 mx-auto lg:block">
          <DatePicker
            value={date}
            format={monthYearFormat}
            picker="date"
            allowClear={false}
            open={open}
            onOpenChange={handleOpenChange}
            onChange={handleDateChange}
            className="relative opacity-0 pointer-events-none"
            popupClassName="!left-1/2 !-translate-x-1/2"
          />
          <Button
            className="!bg-white -top-8 relative"
            icon={
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="w-[1.375rem] h-[1.375rem] -ml-0.5 -mr-px"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.25"
                  d="M4.75 8.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM8 4.75v3.5M16 4.75v3.5M7.75 10.75h8.5"
                ></path>
              </svg>
            }
            onClick={() => setOpen(true)}
          >
            {date.format(monthYearFormat)}
          </Button>
        </div>
        {/* desktop date navigation */}
        <div className="items-center justify-end flex-grow hidden w-full gap-2 lg:flex">
          <Button
            className="justify-center"
            icon={<LeftOutlined className="w-3 h-3 text-neutral-600" />}
          ></Button>
          <Button
            className="justify-center"
            icon={<RightOutlined className="w-3 h-3 text-neutral-600" />}
          ></Button>
        </div>
      </div>
      <div className="contents lg:gap-3 lg:grid lg:grid-cols-5 xl:grid-cols-6">
        <CalendarFilters singleProduct={singleProduct} />
        {/* mobile date navigation */}
        <div className="sticky top-0 z-20 flex items-center gap-2 py-3.5 mb-2 bg-gradient-to-b from-white/95 lg:hidden">
          <Button
            onClick={previousDay}
            className="justify-center !bg-white"
            icon={<LeftOutlined className="w-3 h-3 text-neutral-600" />}
          ></Button>
          <div className="flex-grow text-center">
            <Button
              className="!bg-white"
              block
              icon={
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-[1.375rem] h-[1.375rem] -ml-0.5 -mr-px"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4.75 8.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM8 4.75v3.5M16 4.75v3.5M7.75 10.75h8.5"
                  ></path>
                </svg>
              }
            >
              {activeDay} {fakeDateNumberCounter} July
            </Button>
          </div>
          <Button
            onClick={nextDay}
            className="justify-center !bg-white"
            icon={<RightOutlined className="w-3 h-3 text-neutral-600" />}
          ></Button>
        </div>
        {/* mobile events */}
        <div className="grid grid-cols-1 gap-2.5 p-px lg:hidden">
          {(singleProduct
            ? orgClassEvents[activeDay]
            : orgEvents[activeDay] || []
          ).length > 0 ? (
            (singleProduct
              ? orgClassEvents[activeDay]
              : orgEvents[activeDay]
            ).map((event: Event, index: number) => (
              <CalendarEvent
                singleProduct={singleProduct}
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
                  productColour: event.productColour,
                  productGroup: event.productGroup,
                }}
              />
            ))
          ) : (
            <NoEventsToday />
          )}
        </div>
        {/* desktop events */}
        <div className="hidden w-full gap-1.5 xl:gap-2.5 -mt-3 lg:col-span-4 xl:col-span-5 lg:flex">
          {daysOfWeek.map((day) => (
            <div key={day} className="max-w-[25%] w-full min-w-0">
              <div className="sticky z-10 hidden pt-2.5 pb-2 text-center mb-1 lg:block top-14 bg-white/95 heading-sm ring-2 ring-white/95">
                <span
                  className={`inline-flex gap-x-1 rounded px-2 py-1 
            ${
              fakeDateNumberCounter === fakeToday
                ? " bg-primary text-primary_text "
                : " "
            }
          `}
                >
                  <span>{day.substring(0, 3)}</span>
                  <span
                    className={
                      fakeDateNumberCounter === fakeToday
                        ? "text-primary_text"
                        : "text-neutral-500"
                    }
                  >
                    {fakeDateNumberCounter++}
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 p-px">
                {(singleProduct ? orgClassEvents[day] : orgEvents[day] || [])
                  .length > 0 ? (
                  (singleProduct ? orgClassEvents[day] : orgEvents[day]).map(
                    (event: Event, index: number) => (
                      <>
                        <CalendarEvent
                          singleProduct={singleProduct}
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
                            productColour: event.productColour,
                            productGroup: event.productGroup,
                          }}
                        />
                      </>
                    )
                  )
                ) : (
                  <NoEventsToday />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;
