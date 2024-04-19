import { Alert, Button, Tooltip } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBasketContext } from "./basket-context";
import { useCheckoutContext } from "../checkout/checkout-context";
import { AnimatePresence, motion } from "framer-motion";

export const BasketTotals: React.FC = () => (
  <div className="grid grid-cols-2 [&>*:nth-child(even)]:text-right gap-y-1.5 text-sm">
    <div className="text-neutral-500">Monthly cost</div>
    <div className="text-neutral-500">£48.00</div>
    <div className="font-medium">Total due now</div>
    <div className="font-medium">£48.00</div>
  </div>
);

const Basket: React.FC = () => {
  const [itemError, setItemError] = useState(false);
  const { isCheckout } = useCheckoutContext();
  const { closeBasket, basketItems, removeItem } = useBasketContext();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const goToCheckout = () => {
    closeBasket();
    navigate("/Checkout");
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    setCount(1);
  };

  /* CHECKOUT ERROR  Modal.error({
    title: "Checkout error",
    content:
      "Sorry cannot complete checkout, please review the items in your basket.",
    okText: "Return to basket",
  }); */

  return (
    <>
      {isCheckout && (
        <div className="mb-5 heading hide--inside--drawer">
          Basket
          {basketItems.length > 0 && (
            <span className="text-neutral-500">
              {` · ${basketItems.length} item${
                basketItems.length > 1 ? "s" : ""
              }`}
            </span>
          )}
        </div>
      )}
      <div className="divide-y">
        {basketItems.length === 0 ? (
          <div className="grid gap-4 text-center h-52 sm:h-64 place-items-center text-neutral-500/75">
            <div className="grid gap-2 place-items-center">
              <div>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-12 h-12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M16.5843 17.662L18.25 9.75H5.75L7.41569 17.662C7.61053 18.5875 8.42701 19.25 9.37279 19.25H14.6272C15.573 19.25 16.3895 18.5875 16.5843 17.662Z"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M8.75 9.5V7.75C8.75 6.09315 10.0931 4.75 11.75 4.75H12.25C13.9069 4.75 15.25 6.09315 15.25 7.75V9.5"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M19.25 9.75H4.75"
                  ></path>
                </svg>
              </div>
              <div className="text-base">Your basket is empty</div>
            </div>
          </div>
        ) : (
          basketItems.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 py-5 first-of-type:pt-0 only-of-type:py-0 last-of-type:pb-0"
            >
              <div className="flex gap-3.5 items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`object-contain object-center w-16 h-auto max-h-[4rem] rounded ${
                      itemError ? " grayscale " : ""
                    }`}
                  />
                )}
                <div className="grid items-center flex-1 min-w-0 text-sm">
                  <div>
                    <div
                      className={`font-medium ${
                        itemError ? " text-rose-600 " : ""
                      }`}
                    >
                      {item.title}
                    </div>
                    {item.subTitle && (
                      <div
                        className={`text-neutral-500 ${
                          itemError ? " text-rose-500 " : ""
                        }`}
                      >
                        {item.subTitle}
                      </div>
                    )}
                  </div>
                  {!isCheckout && (
                    <div className="mt-auto mb-0.5 pt-2 flex">
                      <div className="flex items-center p-0.5 mr-2.5 border rounded-full border-neutral-200">
                        <Button
                          onClick={decrement}
                          icon={
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                              className="w-5 h-5 text-neutral-600"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M18.25 12.25H5.75"
                              ></path>
                            </svg>
                          }
                          type="text"
                          className={`hover:!bg-neutral-100 !rounded-full ${
                            isAnimating ? "pointer-events-none" : ""
                          }`}
                          size="small"
                        ></Button>
                        <AnimatePresence initial={false} mode="wait">
                          <motion.div
                            key={count}
                            initial={{ opacity: 0, translateY: 4 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            exit={{ opacity: 0, translateY: -4 }}
                            transition={{ duration: 0.125 }}
                            className="w-8 text-xs font-medium text-center"
                            onAnimationStart={() => setIsAnimating(true)}
                            onAnimationComplete={() => setIsAnimating(false)}
                          >
                            {count}
                          </motion.div>
                        </AnimatePresence>
                        <Button
                          onClick={increment}
                          icon={
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                              className="w-5 h-5 text-neutral-600"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M12 5.75v12.5M18.25 12H5.75"
                              ></path>
                            </svg>
                          }
                          type="text"
                          className={`hover:!bg-neutral-100 !rounded-full ${
                            isAnimating ? "pointer-events-none" : ""
                          }`}
                          size="small"
                        ></Button>
                      </div>
                      <Tooltip title="Remove item" placement="right">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="grid transition-colors rounded-full w-7 h-7 place-items-center hover:bg-neutral-200"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 ml-px"
                          >
                            <path
                              d="M5.75 7.75L6.59115 17.4233C6.68102 18.4568 7.54622 19.25 8.58363 19.25H14.4164C15.4538 19.25 16.319 18.4568 16.4088 17.4233L17.25 7.75H5.75Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M9.75 10.75V16.25"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M13.25 10.75V16.25"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M8.75 7.75V6.75C8.75 5.64543 9.64543 4.75 10.75 4.75H12.25C13.3546 4.75 14.25 5.64543 14.25 6.75V7.75"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.75 7.75H18.25"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </button>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
              {itemError && (
                <Alert message="Class is full" type="error" showIcon />
              )}
              {!itemError && (
                <dl className="grid grid-cols-[4rem,1fr] [&>dt]:truncate gap-y-2.5 gap-x-3.5 text-sm tracking-normal">
                  {item.dates && (
                    <>
                      <dt>Dates</dt>
                      <dd>
                        {item.dates} ·{" "}
                        <button type="button" className="link">
                          View
                        </button>
                      </dd>
                    </>
                  )}
                  {item.billing && (
                    <>
                      <dt>Billing</dt>
                      <dd>{item.billing}</dd>
                    </>
                  )}
                  {item.price && (
                    <>
                      <dt>Price</dt>
                      <dd>
                        <span className="tabular-nums">{item.price}</span>
                        {item.priceQuantity === "session" && (
                          <span className="text-neutral-500">
                            {" "}
                            · per session
                          </span>
                        )}
                      </dd>
                    </>
                  )}
                  {item.cost && (
                    <>
                      <dt>Cost</dt>
                      <dd>
                        <div>
                          <span className="tabular-nums">{item.cost}</span>
                          <span className="text-neutral-500"> · per month</span>
                        </div>
                        <div className="mt-1 text-xs text-neutral-500">
                          Cost depends on 4 or 5 sessions in a month.
                          <br className="lg:contents" /> Example based on 4
                          sessions.
                        </div>
                      </dd>
                    </>
                  )}
                  {item.coach && (
                    <>
                      <dt>Coach</dt>
                      <dd>Michael Phelps</dd>
                    </>
                  )}
                </dl>
              )}
            </div>
          ))
        )}
      </div>
      {!isCheckout && (
        <div className="sticky z-10 px-4 py-4 mt-auto -mx-4 -mb-4 sm:px-5 sm:py-5 sm:-mx-5 -bottom-4 bg-white/95">
          <Button
            size="large"
            block
            onClick={closeBasket}
            className={basketItems.length > 0 ? "!hidden lg:!block" : ""}
          >
            Continue shopping
          </Button>
          {basketItems.length > 0 && (
            <Button
              onClick={goToCheckout}
              size="large"
              type="primary"
              block
              className="lg:mt-4"
            >
              Checkout
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Basket;
