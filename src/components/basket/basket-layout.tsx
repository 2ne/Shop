import React from "react";
import BasketDrawer from "./basket-drawer";

const BasketLayout: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <BasketDrawer />
    </>
  );
};

export default BasketLayout;
