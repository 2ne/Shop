import { ReactElement, useEffect, useState, useRef } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Main from "../components/main";
import { Button, Carousel, Radio, Segmented, Switch } from "antd";
import { useBasketContext } from "../components/basket/basket-context";
import { BasketItem } from "../types/types";
import { CarouselRef } from "antd/es/carousel";
import {
  PlayCircleFilled,
  WarningFilled,
  WarningOutlined,
} from "@ant-design/icons";

function SwmmingMembership(): ReactElement {
  const [showMessage, setShowMessage] = useState(false);
  const [basketIsClicked, setBasketIsClicked] = useState(false);

  const breadcrumbItems = [
    { label: "Memberships", link: "/Memberships" },
    { label: "Swimming Membership", link: "/SwimmingMembership" },
  ];

  const images = ["./src/assets/finder-4.jpg"];

  const extractYouTubeID = (url: string) => {
    const parsedUrl = new URL(url);
    const videoID = parsedUrl.searchParams.get("v");
    return videoID;
  };

  const { openBasket, isOpen, addItem } = useBasketContext();

  const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("en-GB", { month: "long" });
    return `${day} ${month}`;
  };

  const item = {
    id: Math.random().toString(36).substring(2, 15),
    image: "./src/assets/finder-4.jpg",
    title: "Swimming Membership",
    subTitle: "12 months",
    price: "£120.00",
    cost: "£120.00",
    billing: `Annually on the ${getFormattedDate()}`,
    link: "#",
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

  const carouselRef = useRef<CarouselRef | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    carouselRef.current?.goTo(index);
    setCurrentSlide(index); // add this line
  };

  const onChange = (currentSlide: number) => {
    setCurrentSlide(currentSlide);
  };

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="pb-24 space-y-4 sm:space-y-8">
        <div className="sticky top-0 space-y-0.5 py-3 border-b sm:space-y-0 border-neutral-200 bg-white/95 z-20 -mt-3">
          <h2 className="heading-lg">Swimming Membership</h2>
          <h3 className="sub-heading">12 months</h3>
        </div>
        <div className="space-y-4 sm:space-y-0 sm:grid sm:gap-10 lg:grid-cols-2">
          <div className="self-start overflow-hidden rounded-t-md lg:sticky lg:top-28">
            <div>
              <Carousel
                ref={carouselRef}
                afterChange={onChange}
                dots={false}
                className="overflow-hidden rounded-md"
              >
                {images.map((url, index) => {
                  if (url.includes("youtube")) {
                    const videoID = extractYouTubeID(url);
                    return (
                      <div key={index}>
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${videoID}`}
                          title="YouTube video player"
                          className="aspect-[3/2] object-cover object-center w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index}>
                        <img
                          className="aspect-[3/2] object-cover object-center w-full h-full"
                          src={url}
                          alt={`Product illustration ${index}`}
                        />
                      </div>
                    );
                  }
                })}
              </Carousel>
              {images.length > 1 && (
                <div className="grid grid-cols-6 gap-2 mt-3 mb-3 lg:mt-4 sm:mb-0 lg:gap-3">
                  {images.map((url, index) => {
                    const videoID = url.includes("youtube")
                      ? extractYouTubeID(url)
                      : null;
                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className="relative inline-flex aspect-[3/2] object-cover object-center w-full h-full rounded transition-opacity"
                      >
                        {videoID ? (
                          <div
                            className={`bg-neutral-100 select-none inline-flex aspect-[3/2] object-cover object-center w-full h-full transition-opacity rounded absolute inset-0 items-center justify-center ${
                              currentSlide === index
                                ? " "
                                : " opacity-50 hover:opacity-75 "
                            }`}
                          >
                            <img
                              src={`https://img.youtube.com/vi/${videoID}/0.jpg`}
                              alt={`Thumbnail ${index}`}
                              className="select-none inline-flex aspect-[3/2] object-cover object-center w-full h-full transition-opacity rounded"
                            />
                            <PlayCircleFilled className="absolute inset-0 text-2xl text-white rounded bg-black/20 place-content-center" />
                          </div>
                        ) : (
                          <img
                            src={url}
                            alt={`Thumbnail ${index}`}
                            className={`select-none inline-flex aspect-[3/2] object-cover object-center w-full h-full transition-opacity rounded ${
                              currentSlide === index
                                ? ""
                                : "opacity-50 hover:opacity-75"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6 sm:space-y-10">
            <section>
              <div className="mb-2 sm:mb-3 heading">
                <span>Payment options</span>{" "}
                <span className="mx-px text-neutral-500">
                  · Montly payment fee applies
                </span>
              </div>
              <Radio.Group
                defaultValue="a"
                size="large"
                className="flex w-full gap-2 px-px sm:gap-4"
              >
                <Radio.Button value="a" className="radio-button-xl">
                  <div className="heading">
                    Single payment<span className="mx-px"> · </span>£120.00
                  </div>
                  <div className="mt-0.5 sub-heading-xs">
                    Pay the full amount today
                  </div>
                </Radio.Button>
                <Radio.Button value="b" className="radio-button-xl">
                  <div className="heading">
                    Monthly payments<span className="mx-px"> · </span>£13.00
                  </div>
                  <div className="mt-0.5 sub-heading-xs">
                    £133.00 over 12 months{" "}
                  </div>
                </Radio.Button>
              </Radio.Group>
            </section>
            <section className="space-y-4 lg:contents">
              <div className="z-30 max-lg:py-3 max-lg:border-t border-t-black/10 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:sticky lg:top-4 sm:max-lg:py-4 max-lg:bg-white/95 lg:mt-10">
                <div className="container lg:p-0">
                  {showMessage && (
                    <div className="cursor-not-allowed flex gap-3 px-4 py-2 justify-center lg:py-2.5 text-white rounded-md bg-rose-500 ">
                      <WarningFilled />
                      <span>No spaces availbile</span>
                    </div>
                  )}
                  {!showMessage && (
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
            </section>
            <section className="space-y-4">
              <div className="pb-2 border-b sm:mb-3 border-neutral-200 heading">
                Details
              </div>
              <dl className="grid grid-cols-4 sm:grid-cols-5 [&>dt]:col-span-1 [&>dt]:truncate [&>dd]:col-span-3 sm:[&>dd]:col-span-4 gap-y-3 sm:gap-y-4 gap-x-2">
                <dt>Address</dt>
                <dd>Quarterway House, Ely Rd, Little Thetford</dd>
                <dt>Billing</dt>
                <dd>Your subscription will renew every 12 months.</dd>
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
              </dl>
            </section>
            <section className="space-y-4">
              <div className="pb-2 border-b sm:mb-3 border-neutral-200 heading">
                Description
              </div>
              <p>
                Swimming is a great way to stay physically active, whatever your
                age or ability. Whether you're lane swimming to maintain and
                develop your fitness, splashing around with the family or
                learning to swim so that you can join in the fun, we have
                something for you!
              </p>
              <p>
                Enjoy a range of swimming and pool activities for you and your
                whole family where you can have fun and be active together.
              </p>
              <p>
                Learn to swim with our swimming lesson programme, book a swim
                session from our timetable or find out about our pool.
              </p>
            </section>
          </div>
        </div>
      </Main>
    </>
  );
}

export default SwmmingMembership;
