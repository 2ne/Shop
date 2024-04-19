import { ReactElement } from "react";
import MerchItem from "./merch-item";
import { BasketItem } from "../../types/types";

const media = [{ url: "./src/assets/towel.jpg", type: "image" }];

const Towel = (): ReactElement => {
  const item: BasketItem = {
    id: Math.random().toString(36).substring(2, 15),
    image: "./src/assets/towel.jpg",
    title: "Spider-Man Hooded Towel",
    subTitle: "Black",
    description:
      "Spider-Man Hooded Towel 100% Cotton Dress Up Avengers Poncho Kids Bath Beach Towel Swimming Wrap Boys Changing Robe",
    price: "£35.00",
    link: "#",
  };

  const breadcrumb = [
    { label: "Shop", link: "/Shop" },
    { label: item.title, link: "/Towel" },
  ];

  return <MerchItem item={item} breadcrumbItems={breadcrumb} media={media} />;
};

export default Towel;
