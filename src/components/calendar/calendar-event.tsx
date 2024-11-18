import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Event } from "../../org";
import { useBasketContext } from "../basket/basket-context";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface CalendarEventProps {
  key: string;
  activeDay: string;
  index: number;
  event: Event;
  singleProduct: boolean;
}

const colourClasses = {
  red: "bg-red-50 shadow shadow-red-900/5 ring-opacity-10 ring-1 ring-red-800",
  orange:
    "bg-orange-50 shadow shadow-orange-900/5 ring-opacity-10 ring-1 ring-orange-800",
  amber:
    "bg-amber-50 shadow shadow-amber-900/5 ring-opacity-10 ring-1 ring-amber-800",
  yellow:
    "bg-yellow-50 shadow shadow-yellow-900/5 ring-opacity-10 ring-1 ring-yellow-800",
  lime: "bg-lime-50 shadow shadow-lime-900/5 ring-opacity-10 ring-1 ring-lime-800",
  green:
    "bg-green-50 shadow shadow-green-900/5 ring-opacity-10 ring-1 ring-green-800",
  emerald:
    "bg-emerald-50 shadow shadow-emerald-900/5 ring-opacity-10 ring-1 ring-emerald-800",
  teal: "bg-teal-50 shadow shadow-teal-900/5 ring-opacity-10 ring-1 ring-teal-800",
  cyan: "bg-cyan-50 shadow shadow-cyan-900/5 ring-opacity-10 ring-1 ring-cyan-800",
  sky: "bg-sky-50 shadow shadow-sky-900/5 ring-opacity-10 ring-1 ring-sky-800",
  blue: "bg-blue-50 shadow shadow-blue-900/5 ring-opacity-10 ring-1 ring-blue-800",
  indigo:
    "bg-indigo-50 shadow shadow-indigo-900/5 ring-opacity-10 ring-1 ring-indigo-800",
  violet:
    "bg-violet-50 shadow shadow-violet-900/5 ring-opacity-10 ring-1 ring-violet-800",
  purple:
    "bg-purple-50 shadow shadow-purple-900/5 ring-opacity-10 ring-1 ring-purple-800",
  fuchsia:
    "bg-fuchsia-50 shadow shadow-fuchsia-900/5 ring-opacity-10 ring-1 ring-fuchsia-800",
  pink: "bg-pink-50 shadow shadow-pink-900/5 ring-opacity-10 ring-1 ring-pink-800",
  rose: "bg-rose-50 shadow shadow-rose-900/5 ring-opacity-10 ring-1 ring-rose-800",
  stone:
    "bg-stone-50 shadow shadow-stone-900/5 ring-opacity-10 ring-1 ring-stone-800",
};

const textColourClasses = {
  red: "text-red-800",
  orange: "text-orange-800",
  amber: "text-amber-800",
  yellow: "text-yellow-800",
  lime: "text-lime-800",
  green: "text-green-800",
  emerald: "text-emerald-800",
  teal: "text-teal-800",
  cyan: "text-cyan-800",
  sky: "text-sky-800",
  blue: "text-blue-800",
  indigo: "text-indigo-800",
  violet: "text-violet-800",
  purple: "text-purple-800",
  fuchsia: "text-fuchsia-800",
  pink: "text-pink-800",
  rose: "text-rose-800",
  stone: "text-stone-800",
};

const CalendarEvent: React.FC<CalendarEventProps> = ({
  activeDay,
  index,
  event,
  singleProduct,
}) => {
  const [basketIsClicked, setBasketIsClicked] = useState(false);
  const { openBasket, isOpen, addItem } = useBasketContext();

  useEffect(() => {
    if (!isOpen) {
      setBasketIsClicked(false);
    }
  }, [isOpen]);

  const handleBasketClick = () => {
    setBasketIsClicked(true);
    setTimeout(() => {
      setBasketIsClicked(false);
    }, 4000);
  };

  const addToBasketAndOpen = () => {
    const basketItem = {
      id: Math.random().toString(36).substring(2, 15),
      image: event.img,
      title: event.title,
      subTitle: `Every ${activeDay} at ${event.startTime} - ${event.endTime}`,
      dates: `${activeDay} 2024`,
      price: event.price,
      priceQuantity: "session",
      cost: event.price,
      billing: "Monthly on the 1st",
      link: event.link,
      address: event.address,
      description: event.description,
      requiredProduct: {
        id: Math.random().toString(36).substring(2, 15),
        image: "finder-4.jpg",
        dates: "April 2023 - April 2024",
        title: "Swimming Membership",
        subTitle: "12 months",
        cost: "£20.00",
        billing: "Monthly on the 1st",
        link: "#",
      },
    };

    handleBasketClick();
    addItem(basketItem);
    openBasket();
  };

  const colourClass = singleProduct
    ? event.colour
      ? colourClasses[event.colour]
      : ""
    : event.productColour
    ? colourClasses[event.productColour]
    : "";
  const textColourClass = singleProduct
    ? event.colour
      ? textColourClasses[event.colour]
      : ""
    : event.productColour
    ? textColourClasses[event.productColour]
    : "";

  function getTimePeriod(timeString: string) {
    const time = parseInt(timeString.substring(0, 2), 10);
    let timePeriod = "";
    let timeJSX;

    if (time >= 0 && time < 12) {
      timePeriod = "morning";
      timeJSX = (
        <div className="flex items-center lg:justify-center gap-1.5 text-sm text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
          >
            <path
              d="M2.66683 7.99984H1.3335M4.20957 4.20925L3.26676 3.26644M11.7907 4.20925L12.7335 3.26644M14.6668 7.99984H13.3335M4.66683 7.99984C4.66683 6.15889 6.15921 4.6665 8.00016 4.6665C9.84111 4.6665 11.3335 6.15889 11.3335 7.99984M14.6668 10.6665H1.3335M8.00016 0.666504V1.99984"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>Morning</div>
        </div>
      );
    } else if (time >= 12 && time < 18) {
      timePeriod = "afternoon";
      timeJSX = (
        <div className="flex items-center lg:justify-center gap-1.5 text-sm text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
          >
            <path
              d="M7.66667 1.3335V2.66683M7.66667 13.3335V14.6668M2.33333 8.00016H1M3.87608 4.20957L2.93327 3.26676M11.4573 4.20957L12.4001 3.26676M3.87608 11.7935L2.93327 12.7363M11.4573 11.7935L12.4001 12.7363M14.3333 8.00016H13M11 8.00016C11 9.84111 9.50762 11.3335 7.66667 11.3335C5.82572 11.3335 4.33333 9.84111 4.33333 8.00016C4.33333 6.15921 5.82572 4.66683 7.66667 4.66683C9.50762 4.66683 11 6.15921 11 8.00016Z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>Afternoon</div>
        </div>
      );
    } else if (time >= 18 && time < 24) {
      timePeriod = "evening";
      timeJSX = (
        <div className="flex items-center lg:justify-center gap-1.5 text-sm text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M13.1667 9.2423C12.4005 9.58879 11.55 9.78166 10.6545 9.78166C7.28392 9.78166 4.55151 7.04925 4.55151 3.67865C4.55151 2.78313 4.74439 1.93265 5.09087 1.1665C2.97336 2.12412 1.5 4.25508 1.5 6.73016C1.5 10.1008 4.23241 12.8332 7.60302 12.8332C10.0781 12.8332 12.209 11.3598 13.1667 9.2423Z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>Evening</div>
        </div>
      );
    } else if (time === 0) {
      timePeriod = "allDay";
      timeJSX = (
        <div className="flex items-center lg:justify-center gap-1.5 text-sm text-neutral-500">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="w-[19px] h-[19px]"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.75 8.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM8 4.75v3.5M16 4.75v3.5M7.75 10.75h8.5"
            ></path>
          </svg>
          <div>All day</div>
        </div>
      );
    } else {
      return;
    }

    return (
      <div className={`-mb-0.5 mt-1 first:-mt-0 cursor-default ${timePeriod}`}>
        {timeJSX}
      </div>
    );
  }

  return (
    <>
      {getTimePeriod(event.startTime)}
      <div className="relative group">
        <Link
          key={`${activeDay}-event-${index}`}
          to={event.link}
          className={`@container block px-0.5 text-sm card max-lg:grid gap-1 sm:gap-4 max-sm:grid-cols-3 max-lg:grid-cols-3 max-lg:items-center ${colourClass}`}
        >
          {!event.hideImage && singleProduct && (
            <img
              className={`mt-0.5 max-lg:mb-0.5 aspect-[3/2] object-contain object-center mx-auto max-lg:col-span-1 max-lg:rounded-l-[calc(0.375rem-0.125rem)] lg:rounded-t-[calc(0.375rem-0.125rem)] ${
                event.colour ? " mix-blend-multiply " : " "
              }`}
              src={event.img}
            />
          )}
          <div
            className={`py-1 px-2 space-y-0.5 @[130px]:space-y-1 my-1 lg:mt-0 lg:mb-px max-lg:col-span-2 ${textColourClass}`}
          >
            <div className={!singleProduct ? "" : "mb-1.5"}>
              <div className={`heading-sm line-clamp-2 ${textColourClass}`}>
                {event.title}
              </div>
              <div
                className={`truncate text-sm opacity-80 ${
                  singleProduct ? "" : "lg:hidden"
                } ${textColourClass}`}
              >
                {singleProduct ? event.description : event.productGroup}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="w-5 h-5 -ml-1 opacity-70 shrink-0 hidden @[130px]:block"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="7.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                ></circle>
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M12 8V12L14 14"
                ></path>
              </svg>
              <span className="">{event.startTime}</span>
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="w-5 h-5 -mx-1.5 opacity-70 shrink-0"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                ></path>
              </svg>
              <span className="truncate">{event.endTime}</span>
            </div>
            {singleProduct && (
              <>
                <div className="flex items-center gap-1">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 -ml-1 opacity-70 shrink-0 hidden @[130px]:block"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M18.25 11C18.25 15 12 19.25 12 19.25C12 19.25 5.75 15 5.75 11C5.75 7.5 8.68629 4.75 12 4.75C15.3137 4.75 18.25 7.5 18.25 11Z"
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
                  <span className="truncate">{event.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 -ml-1 opacity-70 shrink-0 hidden @[130px]:block"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="7.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></circle>
                    <g transform="scale(0.45) translate(14 14)">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.25"
                        d="M17.25 8.25v-1.5a2 2 0 00-2-2h-3.5c-1.105 0-2 .893-2 1.998V14c0 3-3 5.25-3 5.25h8.5a2 2 0 002-2v-.5M6.75 11.75h6.5"
                      ></path>
                    </g>
                  </svg>
                  <span>{event.price}</span>
                </div>
              </>
            )}
          </div>
        </Link>
        <Button
          size="small"
          icon={<PlusOutlined />}
          className={`absolute top-1 right-1 z-10 shadow-md hover:scale-110 transition-all pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100
          ${basketIsClicked ? "!bg-success border-success text-white" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToBasketAndOpen();
          }}
        />
      </div>
    </>
  );
};

export default CalendarEvent;
