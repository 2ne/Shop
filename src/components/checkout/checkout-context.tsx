import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CheckoutContext = createContext<{
  isCheckout: boolean;
  setIsCheckout: (value: boolean) => void;
}>({
  isCheckout: false,
  setIsCheckout: () => {
    console.warn("CheckoutContext has not been properly initialized.");
  },
});

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};

export const CheckoutProvider: React.FC = ({ children }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/Checkout") {
      setIsCheckout(true);
    } else {
      setIsCheckout(false);
    }
  }, [location]);

  return (
    <CheckoutContext.Provider value={{ isCheckout, setIsCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};
