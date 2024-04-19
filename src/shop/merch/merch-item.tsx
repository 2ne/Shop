import { ReactElement, useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import Header from "../../components/header";
import Main from "../../components/main";
import { Button } from "antd";
import { useBasketContext } from "../../components/basket/basket-context";
import { InfoCircleFilled } from "@ant-design/icons";
import { BasketItem } from "../../types/types";
import MediaCarousel from "../media-carousel";

type MerchItemProps = {
  item: BasketItem;
  breadcrumbItems: Array<{ label: string; link: string }>;
  media?: Array<{ url: string; type: string }>;
};

const MerchItem = ({
  item,
  breadcrumbItems,
  media,
}: MerchItemProps): ReactElement => {
  const [basketIsClicked, setBasketIsClicked] = useState(false);

  const { openBasket, isOpen, addItem } = useBasketContext();

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
      <Main className="pb-24 space-y-4 sm:space-y-8 lg:mt-2">
        <div className="grid items-start grid-cols-1 max-lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-x-10">
          <div className="contents lg:block lg:col-[2] lg:row-[1]">
            <div className="max-lg:row-[1] sticky top-0 space-y-0.5 py-3 border-b sm:space-y-0 border-neutral-200 bg-white/95 z-20 -mt-3 mb-6 flex">
              <div className="flex-grow">
                <h2
                  className={`heading-lg ${
                    item.outOfStock
                      ? "text-rose-600"
                      : item.limitedStock && !item.outOfStock
                      ? "text-amber-600"
                      : "text-neutral-900"
                  }`}
                >
                  {item.title}
                </h2>
                <h3 className="sub-heading">{item.subTitle}</h3>
              </div>
              <div
                className={`heading-lg ${
                  item.outOfStock
                    ? "text-rose-600"
                    : item.limitedStock && !item.outOfStock
                    ? "text-amber-600"
                    : "text-neutral-900"
                }`}
              >
                {item.price}
              </div>
            </div>
            <div className="max-lg:row-[3] space-y-6 sm:space-y-10">
              {item.description && (
                <section className="space-y-4">
                  <p>{item.description}</p>
                </section>
              )}

              <section className="space-y-4 lg:contents">
                <div className="z-30 max-lg:py-3 max-lg:border-t border-t-black/10 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:sticky lg:top-4 sm:max-lg:py-4 max-lg:bg-white/95 lg:mt-6">
                  <div className="container lg:p-0">
                    <Button
                      disabled={item.outOfStock}
                      size="large"
                      type="primary"
                      block
                      className={`!transition-all !duration-500 ${basketButtonClasses}`}
                      onClick={addToBasketAndOpen}
                    >
                      {basketButtonText}
                    </Button>
                  </div>
                </div>
                {!item.outOfStock && !item.limitedStock && (
                  <div className="flex sm:justify-center">
                    <div className="inline-flex items-center py-1 px-2.5 pr-4 rounded-full bg-emerald-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="flex-shrink-0 w-7 h-7 text-emerald-500"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M7.75 12.75l2.25 2.5 6.25-6.5"
                        ></path>
                      </svg>
                      <p className="ml-1 text-sm text-emerald-600">In stock</p>
                    </div>
                  </div>
                )}
                {item.limitedStock && !item.outOfStock && (
                  <div className="flex sm:justify-center">
                    <div className="inline-flex items-center py-1.5 px-3.5 rounded-full bg-amber-50">
                      <p className="text-sm text-amber-600">Limited stock</p>
                    </div>
                  </div>
                )}
              </section>
              {item.requiresApproval && (
                <section>
                  <p className="text-sm max-lg:border-t max-lg:pt-4 lg:-mt-4 text-neutral-500">
                    <InfoCircleFilled className="mr-2 opacity-75 max-lg:text-xs" />
                    This purchase requires approval by the organisation prior to
                    the purchase proceeding.
                  </p>
                </section>
              )}
            </div>
          </div>
          <div className={`${media ? "relative h-full lg:mb-6" : ""}`}>
            <MediaCarousel
              media={media}
              outOfStock={item.outOfStock}
              limitedStock={item.limitedStock}
            />
          </div>
        </div>
      </Main>
    </>
  );
};

export default MerchItem;
