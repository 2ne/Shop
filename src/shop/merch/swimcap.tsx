import { ReactElement } from "react";
import MerchItem from "./merch-item";
import { BasketItem } from "../../types/types";

const media = [{ url: "./src/assets/hat.jpg", type: "image" }];

const Swimcap = (): ReactElement => {
  const item: BasketItem = {
    id: Math.random().toString(36).substring(2, 15),
    image: "./src/assets/hat.jpg",
    title: "Speedo Silicone Solid Swim Cap",
    subTitle: "Black",
    description:
      "High-quality swim shorts perfect for both casual and professional swimming activities.",
    price: "£15.00",
    link: "#",
  };

  const breadcrumb = [
    { label: "Shop", link: "/Shop" },
    { label: item.title, link: "/Swimcap" },
  ];

  return <MerchItem item={item} breadcrumbItems={breadcrumb} media={media} />;
};

export default Swimcap;
