import { ReactElement } from "react";
import MerchItem from "./merch-item";
import { BasketItem } from "../../types/types";

const media = [{ url: "./src/assets/goggles.png", type: "image" }];

const Goggles = (): ReactElement => {
  const item: BasketItem = {
    id: Math.random().toString(36).substring(2, 15),
    image: "./src/assets/goggles.png",
    title: "PROGEAR® Swim Goggles",
    subTitle: "Black",
    description:
      "Progear H2O swimming goggle benefits from slim line silicone eyecups with a larger, more wrapped chassis to fit larger adults and give better peripheral awareness. Supplied with a fully adjustable head strap and three sizes of bridge.",
    price: "£16.00",
    limitedStock: true,
    outOfStock: true,
    link: "#",
    requiresApproval: true,
  };

  const breadcrumb = [
    { label: "Shop", link: "/Shop" },
    { label: item.title, link: "/Goggles" },
  ];

  return <MerchItem item={item} breadcrumbItems={breadcrumb} media={media} />;
};

export default Goggles;
