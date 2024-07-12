import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./shop/home";
import AdultChildLessons from "./shop/adult-child-lessons";
import BubbleTheSeahorse from "./shop/bubble-the-seahorse";
import { BasketProvider } from "./components/basket/basket-context";
import BasketLayout from "./components/basket/basket-layout";
import Checkout from "./shop/checkout";
import { CheckoutProvider } from "./components/checkout/checkout-context";
import ClassFinder from "./shop/class-finder";
import CreateAccount from "./shop/create-account";
import Timetable from "./shop/timetable";
import Shop from "./shop/shop";
import Events from "./shop/events";
import Memberships from "./shop/memberships";
import Goggles from "./shop/merch/goggles";
import SwmmingMembership from "./shop/swimming-membership";
import Contact from "./shop/contact";
import Shorts from "./shop/merch/shorts";
import Swimcap from "./shop/merch/swimcap";
import Towel from "./shop/merch/towel";
import Bag1 from "./shop/merch/bag-1";
import Bag2 from "./shop/merch/bag-2";
import Bag3 from "./shop/merch/bag-3";
import Bag4 from "./shop/merch/bag-4";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <CheckoutProvider>
        <BasketProvider>
          <BasketLayout>
            <Routes>
              <Route path="/Home" element={<Home />} />
              <Route
                path="/AdultChildLessons"
                element={<AdultChildLessons />}
              />
              <Route
                path="/BubbleTheSeahorse"
                element={<BubbleTheSeahorse />}
              />
              <Route
                path="/SwimmingMembership"
                element={<SwmmingMembership />}
              />
              <Route path="/Goggles" element={<Goggles />} />
              <Route path="/Shorts" element={<Shorts />} />
              <Route path="/Swimcap" element={<Swimcap />} />
              <Route path="/Towel" element={<Towel />} />
              <Route path="/Bag1" element={<Bag1 />} />
              <Route path="/Bag2" element={<Bag2 />} />
              <Route path="/Bag3" element={<Bag3 />} />
              <Route path="/Bag4" element={<Bag4 />} />
              <Route path="/Finder" element={<ClassFinder />} />
              <Route path="/Shop" element={<Shop />} />
              <Route path="/Events" element={<Events />} />
              <Route path="/Memberships" element={<Memberships />} />
              <Route path="/Timetable" element={<Timetable />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/CreateAccount" element={<CreateAccount />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </BasketLayout>
        </BasketProvider>
      </CheckoutProvider>
    </BrowserRouter>
  );
}

export default App;
