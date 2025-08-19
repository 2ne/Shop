import { ReactElement, useEffect, useState } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Main from "../components/main";
import { Button, Radio, Drawer } from "antd";
import { useBasketContext } from "../components/basket/basket-context";
import { BasketItem } from "../types/types";
import { WarningFilled, CalendarOutlined } from "@ant-design/icons";
import MediaCarousel from "./media-carousel";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

function BubbleTheSeahorse(): ReactElement {
  const [noSpaces, setNoSpaces] = useState(false);
  const [basketIsClicked, setBasketIsClicked] = useState(false);
  const [selectedPurchaseOption, setSelectedPurchaseOption] = useState("a");
  const [selectedDate, setSelectedDate] = useState("date-1");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const drawerPlacement = isMobile ? "bottom" : "right";

  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/AdultChildLessons" },
    { label: "Bubble the Seahorse", link: "/BubbleTheSeahorse" },
  ];

  const media = [
    { url: "seahorse.jpg", type: "image" },
    { url: "finder-3.jpg", type: "image" },
    { url: "enter-pool.mp4", type: "video" },
    { url: "https://www.youtube.com/watch?v=LijdyVaaDnY", type: "youtube" },
  ];

  const { openBasket, isOpen, addItem } = useBasketContext();

  const item: BasketItem = {
    id: Math.random().toString(36).substring(2, 15),
    image: "seahorse.jpg",
    title: "Bubble the Seahorse",
    subTitle: "Every Tuesday at 11:30 - 12:00",
    dates: "4th April - 25th April",
    price: "£16.00",
    priceQuantity: "session",
    cost: "£64.00",
    billing: "Monthly on the 1st",
    link: "#",
    coach: "Michael Phelps",
    coachDescription: `Michael Fred Phelps II (born June 30, 1985) is an American former competitive swimmer. He is the most successful and most decorated Olympian of all time with a total of 28 medals. Phelps also holds the all-time records for Olympic gold medals (23), Olympic gold medals in individual events (13), and Olympic medals in individual events (16). At the 2004 Summer Olympics in Athens, Phelps tied the record of eight medals of any colour at a single Games, held by gymnast Alexander Dityatin, by winning six gold and two bronze medals.
  
    Four years later, when he won eight gold medals at the 2008 Beijing Games, he broke fellow American swimmer Mark Spitz's 1972 record of seven first-place finishes at any single Olympic Games. At the 2012 Summer Olympics in London, Phelps won four gold and two silver medals, and at the 2016 Summer Olympics in Rio de Janeiro, he won five gold medals and one silver. This made him the most successful athlete of the Games for the fourth Olympics in a row.`,
    coachImage: "Michael_Phelp.jpg",
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

  const handleBasketClick = () => {
    setBasketIsClicked(true);

    setTimeout(() => {
      setBasketIsClicked(false);
    }, 4000);
  };

  useEffect(() => {
    if (!isOpen) {
      setBasketIsClicked(false);
    }
  }, [isOpen]);

  const addToBasketAndOpen = () => {
    handleBasketClick();
    addItem(item);
    openBasket();
  };

  const basketButtonClasses =
    basketIsClicked && "pointer-events-none !bg-emerald-600";

  const basketButtonText = basketIsClicked ? "Added" : "Add to basket";

  // All dates mapping
  const allDates: Record<string, string> = {
    "date-1": "4th April",
    "date-2": "11th April",
    "date-3": "18th April",
    "date-4": "25th April",
    "date-5": "2nd May",
    "date-6": "9th May",
    "date-7": "16th May",
    "date-8": "23rd May",
    "date-9": "30th May",
    "date-10": "4th June",
    "date-11": "11th June",
    "date-12": "18th Jun",
    "date-13": "25th Jun",
    "date-14": "2nd Jul",
    "date-15": "9th Jul",
    "date-16": "16th Jul",
    "date-17": "23rd Jul",
    "date-18": "30th Jul",
    "date-19": "6th Aug",
    "date-20": "13th Aug",
    "date-21": "20th Aug",
    "date-22": "27th Aug",
    "date-23": "3rd Sep",
    "date-24": "10th Sep",
    "date-25": "17th Sep",
    "date-26": "24th Sep",
    "date-27": "1st Oct",
    "date-28": "8th Oct",
    "date-29": "15th Oct",
    "date-30": "22nd Oct",
    "date-31": "29th Oct",
  };

  // Helper function to check if date is from main grid
  const isMainGridDate = (dateValue: string): boolean => {
    return [
      "date-1",
      "date-2",
      "date-3",
      "date-4",
      "date-5",
      "date-6",
      "date-7",
      "date-8",
      "date-9",
      "date-10",
      "date-11",
    ].includes(dateValue);
  };

  // Additional dates for the drawer
  const additionalDates = [
    { value: "date-12", label: "18th Jun" },
    { value: "date-13", label: "25th Jun" },
    { value: "date-14", label: "2nd Jul" },
    { value: "date-15", label: "9th Jul" },
    { value: "date-16", label: "16th Jul" },
    { value: "date-17", label: "23rd Jul" },
    { value: "date-18", label: "30th Jul" },
    { value: "date-19", label: "6th Aug" },
    { value: "date-20", label: "13th Aug" },
    { value: "date-21", label: "20th Aug" },
    { value: "date-22", label: "27th Aug" },
    { value: "date-23", label: "3rd Sep" },
    { value: "date-24", label: "10th Sep" },
    { value: "date-25", label: "17th Sep" },
    { value: "date-26", label: "24th Sep" },
    { value: "date-27", label: "1st Oct" },
    { value: "date-28", label: "8th Oct" },
    { value: "date-29", label: "15th Oct" },
    { value: "date-30", label: "22nd Oct" },
    { value: "date-31", label: "29th Oct" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="pb-24 space-y-4 sm:space-y-8">
        <div className="sticky top-0 space-y-0.5 py-3 border-b sm:space-y-0 border-neutral-200 bg-white/95 z-20 -mt-3">
          <h2 className="heading-lg">Bubble the Seahorse</h2>
          <h3 className="sub-heading">Every Tuesday at 11:30 - 12:00</h3>
        </div>
        <div className="space-y-4 sm:space-y-0 sm:grid sm:gap-10 lg:grid-cols-2">
          <MediaCarousel media={media} />
          <div className="space-y-6 sm:space-y-10">
            <section className="sm:-mt-1.5">
              <div className="mb-2 sm:mb-3 heading">Purchase options</div>
              <div>
                <Radio.Group
                  defaultValue="a"
                  size="large"
                  className="flex gap-2 px-px w-full sm:gap-4"
                  onChange={(e) => setSelectedPurchaseOption(e.target.value)}
                >
                  <Radio.Button
                    value="a"
                    className="radio-button-xl min-h-[64px] sm:min-h-[88px]"
                  >
                    <div className="heading">
                      Session<span className="mx-px"> · </span>£16.00
                    </div>
                    <AnimatePresence mode="wait">
                      {selectedPurchaseOption === "a" && (
                        <motion.div
                          key="option-a"
                          initial={{ opacity: 0, y: 10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: 10, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-0.5 sub-heading-xs overflow-hidden"
                        >
                          Every Tuesday
                          <span className="hidden lg:inline">
                            {" "}
                            at 11:30 - 12:00
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Radio.Button>
                  <Radio.Button
                    value="b"
                    className="radio-button-xl min-h-[64px] sm:min-h-[88px]"
                  >
                    <div className="heading">
                      Trial<span className="mx-px"> · </span>£5.00
                    </div>
                    <AnimatePresence mode="wait">
                      {selectedPurchaseOption === "b" && (
                        <motion.div
                          key="option-b"
                          initial={{ opacity: 0, y: 10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: 10, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-0.5 sub-heading-xs overflow-hidden"
                        >
                          Single session
                          <span className="hidden lg:inline">
                            {" "}
                            on a Tuesday
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Radio.Button>
                </Radio.Group>
              </div>
            </section>
            <section>
              <div className="mb-2 sm:mb-3 heading">Select a date</div>
              <div>
                <Radio.Group
                  size="large"
                  value={selectedDate}
                  className="grid grid-cols-3 gap-2 px-px w-full sm:gap-4 sm:grid-cols-4"
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    if (
                      e.target.value === "date-5" ||
                      e.target.value === "date-6"
                    ) {
                      setNoSpaces(true);
                    } else {
                      setNoSpaces(false);
                    }
                  }}
                >
                  <Radio.Button value="date-1" className="radio-button-lg">
                    4th April
                  </Radio.Button>
                  <Radio.Button value="date-2" className="radio-button-lg">
                    11th April
                  </Radio.Button>
                  <Radio.Button value="date-3" className="radio-button-lg">
                    18th April
                  </Radio.Button>
                  <Radio.Button value="date-4" className="radio-button-lg">
                    25th April
                  </Radio.Button>
                  <Radio.Button
                    value="date-5"
                    className="radio-button-lg border-error/25 !bg-rose-50 !text-error [&.ant-radio-button-wrapper-checked]:!border-error hover:!border-error [&.ant-radio-button-wrapper-checked]:!ring-error"
                  >
                    2nd May
                  </Radio.Button>
                  <Radio.Button
                    value="date-6"
                    className="radio-button-lg border-error/25 !bg-rose-50 !text-error [&.ant-radio-button-wrapper-checked]:!border-error hover:!border-error [&.ant-radio-button-wrapper-checked]:!ring-error"
                  >
                    9th May
                  </Radio.Button>
                  <Radio.Button value="date-7" className="radio-button-lg">
                    16th May
                  </Radio.Button>
                  <Radio.Button value="date-8" className="radio-button-lg">
                    23rd May
                  </Radio.Button>
                  <Radio.Button value="date-9" className="radio-button-lg">
                    30th May
                  </Radio.Button>
                  <Radio.Button value="date-10" className="radio-button-lg">
                    4th June
                  </Radio.Button>
                  <Radio.Button value="date-11" className="radio-button-lg">
                    11th June
                  </Radio.Button>
                  {selectedDate &&
                  allDates[selectedDate] &&
                  !isMainGridDate(selectedDate) ? (
                    <Radio.Button
                      value={selectedDate}
                      className="radio-button-lg"
                      onClick={() => setDrawerVisible(true)}
                    >
                      <div className="flex gap-1.5 justify-center items-center">
                        <CalendarOutlined />
                        {allDates[selectedDate]}
                      </div>
                    </Radio.Button>
                  ) : (
                    <Button
                      className="radio-button-lg"
                      onClick={() => setDrawerVisible(true)}
                    >
                      More <div className="hidden ml-1 md:inline">dates</div>...
                    </Button>
                  )}
                </Radio.Group>
              </div>
            </section>
            <section className="space-y-4 lg:contents">
              <div className="z-30 max-lg:py-3 max-lg:border-t border-t-black/10 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:sticky lg:top-4 sm:max-lg:py-4 max-lg:bg-white/95 lg:mt-10">
                <div className="container lg:p-0">
                  {noSpaces && (
                    <div className="cursor-not-allowed flex gap-3 px-4 py-2 justify-center lg:py-2.5 text-white rounded-md bg-rose-500 ">
                      <WarningFilled />
                      <span>No spaces availbile</span>
                    </div>
                  )}
                  {!noSpaces && (
                    <Button
                      size="large"
                      type="primary"
                      block
                      className={`!transition-all !duration-500 ${basketButtonClasses}`}
                      onClick={addToBasketAndOpen}
                    >
                      {basketButtonText}
                    </Button>
                  )}
                </div>
              </div>
              <div className="hidden justify-center lg:flex">
                <div className="px-4 py-1.5 text-sm text-neutral-800 rounded-full bg-neutral-100">
                  Estimated monthly total{" "}
                  <span className="heading-sm">£64.00</span>
                </div>
              </div>
            </section>
            <section className="space-y-4">
              <div className="pb-2 border-b sm:mb-3 border-neutral-200 heading">
                Details
              </div>
              <dl className="grid grid-cols-4 sm:grid-cols-5 [&>dt]:col-span-1 [&>dt]:truncate [&>dd]:col-span-3 sm:[&>dd]:col-span-4 gap-y-3 sm:gap-y-4 gap-x-2">
                <dt>Required</dt>
                <dd>
                  To buy this item, you'll need a Swimming Membership. If you
                  don't have one already, it will be added to your basket at
                  checkout.
                </dd>
                <dt>Age</dt>
                <dd>
                  Suitable for babies aged 12-18 months with a parent/guardian
                </dd>
                <dt>Time</dt>
                <dd>Every Tuesday at 11:30 - 12:00</dd>
                <dt>Schedule</dt>
                <dd>
                  4th April - August 5th 2023 -{" "}
                  <button type="button" className="link">
                    View
                  </button>
                </dd>
                <dt>Address</dt>
                <dd>Quarterway House, Ely Rd, Little Thetford</dd>
                <dt>Billing</dt>
                <dd>
                  You will be billed every month on the 1st. This is an
                  auto-renewing product.
                </dd>
                {/* <dd>Premium of £2 per instalment.</dd> */}
                <dt>Pro rata</dt>
                <dd>
                  Final cost at checkout may vary depending on the time or
                  sessions left in the period.
                </dd>
                <dt>Service fee</dt>
                <dd>
                  A service fee will be applied at checkout.{" "}
                  <button type="button" className="link">
                    View
                  </button>
                </dd>
                <dt>Approval</dt>
                <dd>
                  This purchase requires approval by the organisation prior to
                  the purchase proceeding.
                </dd>
                <dt>Discounts</dt>
                <dd>
                  3 discounts are available.{" "}
                  <button type="button" className="link">
                    View
                  </button>
                </dd>
              </dl>
            </section>
            <section className="space-y-4">
              <div className="pb-2 border-b sm:mb-3 border-neutral-200 heading">
                Description
              </div>
              <p>
                This class is targeted at 12-18 month old children. We focus on
                encouraging and supporting using short bursts of energy to play,
                splash, kick, rotate, balance, crawl, float, and start to
                interpret swimming cues through songs and phrases.
              </p>
            </section>
            <section className="space-y-4">
              <div className="pb-2 mb-3 border-b border-neutral-200 heading">
                Coach Profile ·{" "}
                <span className="sub-heading">{item.coach}</span>
              </div>
              <img
                className="sm:float-left aspect-[3/2] object-cover sm:max-w-[30%] rounded-md sm:mr-5 sm:mb-5 relative sm:-top-1"
                src={item.coachImage}
                alt={item.coach}
              />
              <p className="whitespace-pre-line">{item.coachDescription}</p>
            </section>
          </div>
        </div>
      </Main>

      {/* Date Selection Drawer */}
      <Drawer
        title="Select a date"
        placement={drawerPlacement}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        rootClassName="ant-drawer-bottom-custom"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-2">
            {additionalDates.map((date) => (
              <Radio.Button
                key={date.value}
                value={date.value}
                className="radio-button-lg"
                onClick={() => {
                  setSelectedDate(date.value);
                  setDrawerVisible(false);
                }}
              >
                {date.label}
              </Radio.Button>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default BubbleTheSeahorse;
