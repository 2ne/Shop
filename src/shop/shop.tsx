import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import ShopLayout from "../components/shop-layout";

function Shop(): ReactElement {
  const breadcrumbItems = [{ label: "Shop", link: "/Shop" }];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="pb-56">
        <ShopLayout filters={false} title="Shop" />
      </Main>
      <Footer />
    </>
  );
}

export default Shop;
