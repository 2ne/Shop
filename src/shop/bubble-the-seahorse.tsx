import { ReactElement, useEffect, useState } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Main from "../components/main";
import { Button, Radio } from "antd";
import { useBasketContext } from "../components/basket/basket-context";
import { BasketItem } from "../types/types";
import { WarningFilled } from "@ant-design/icons";
import MediaCarousel from "./media-carousel";

function BubbleTheSeahorse(): ReactElement {
  const [noSpaces, setNoSpaces] = useState(false);
  const [basketIsClicked, setBasketIsClicked] = useState(false);

  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/AdultChildLessons" },
    { label: "Bubble the Seahorse", link: "/BubbleTheSeahorse" },
  ];

  const media = [
    { url: "./src/assets/seahorse.jpg", type: "image" },
    { url: "./src/assets/finder-3.jpg", type: "image" },
    { url: "./src/assets/enter-pool.mp4", type: "video" },
    { url: "https://www.youtube.com/watch?v=LijdyVaaDnY", type: "youtube" },
  ];

  const { openBasket, isOpen, addItem } = useBasketContext();

  const item: BasketItem = {
    id: Math.random().toString(36).substring(2, 15),
    image: "./src/assets/seahorse.jpg",
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
    coachImage: "./src/assets/Michael_Phelp.jpg",
    requiredProduct: {
      id: Math.random().toString(36).substring(2, 15),
      image: "./src/assets/finder-4.jpg",
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
                  className="flex w-full gap-2 px-px sm:gap-4"
                >
                  <Radio.Button value="a" className="radio-button-xl">
                    <div className="heading">
                      Session<span className="mx-px"> · </span>£16.00
                    </div>
                    <div className="mt-0.5 sub-heading-xs">
                      Every Tuesday
                      <span className="hidden lg:inline">
                        {" "}
                        at 11:30 - 12:00
                      </span>
                    </div>
                  </Radio.Button>
                  <Radio.Button value="b" className="radio-button-xl">
                    <div className="heading">
                      Trial<span className="mx-px"> · </span>£5.00
                    </div>
                    <div className="mt-0.5 sub-heading-xs">
                      Single session
                      <span className="hidden lg:inline"> on a Tuesday</span>
                    </div>
                  </Radio.Button>
                </Radio.Group>
              </div>
            </section>
            <section>
              <div className="mb-2 sm:mb-3 heading">Select a date</div>
              <div>
                <Radio.Group
                  size="large"
                  defaultValue="date-1"
                  className="grid w-full grid-cols-3 gap-2 px-px sm:gap-4 sm:grid-cols-4"
                  onChange={(e) => {
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
                  <Button className="radio-button-lg">
                    More <div className="hidden ml-1 md:inline">dates</div>...
                  </Button>
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
              <div className="justify-center hidden lg:flex">
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
    </>
  );
}

export default BubbleTheSeahorse;
