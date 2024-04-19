import { ReactElement } from "react";
import MerchItem from "./merch-item";
import { BasketItem } from "../../types/types";

const media = [{ url: "./src/assets/bag-4.jpg", type: "image" }];

const Bag4 = (): ReactElement => {
  const item: BasketItem = {
    id: Math.random().toString(36).substring(2, 15),
    image: "./src/assets/bag-4.jpg",
    title: "High Wall Tote",
    subTitle: "Black and orange",
    description:
      "The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.",
    price: "£140.00",
    link: "#",
    outOfStock: true,
  };

  const breadcrumb = [
    { label: "Shop", link: "/Shop" },
    { label: item.title, link: "/Bag4" },
  ];

  return <MerchItem item={item} breadcrumbItems={breadcrumb} media={media} />;
};

export default Bag4;
