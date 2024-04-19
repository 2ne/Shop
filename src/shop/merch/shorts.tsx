import { ReactElement } from "react";
import MerchItem from "./merch-item";
import { BasketItem } from "../../types/types";

const media = [{ url: "./src/assets/shorts.png", type: "image" }];

const Shorts = (): ReactElement => {
  const item: BasketItem = {
    id: Math.random().toString(36).substring(2, 15),
    image: "./src/assets/shorts.png",
    title: "Essential Swim Shorts",
    subTitle: "Red and blue",
    description:
      "High-quality swim shorts perfect for both casual and professional swimming activities.",
    price: "£30.00",
    limitedStock: true,
    outOfStock: false,
    link: "#",
    requiresApproval: false,
  };

  const breadcrumb = [
    { label: "Shop", link: "/Shop" },
    { label: item.title, link: "/Shorts" },
  ];

  return <MerchItem item={item} breadcrumbItems={breadcrumb} media={media} />;
};

export default Shorts;
