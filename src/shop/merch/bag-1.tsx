import { ReactElement } from "react";
import MerchItem from "./merch-item";
import { BasketItem } from "../../types/types";

const Bag1 = (): ReactElement => {
  const item: BasketItem = {
    id: Math.random().toString(36).substring(2, 15),
    title: "Zip Tote Basket",
    subTitle: "White and black",
    description:
      "The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.",
    price: "£140.00",
    link: "#",
  };

  const breadcrumb = [
    { label: "Shop", link: "/Shop" },
    { label: item.title, link: "/Bag1" },
  ];

  return <MerchItem item={item} breadcrumbItems={breadcrumb} />;
};

export default Bag1;
