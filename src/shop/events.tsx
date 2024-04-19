import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import ShopLayout from "../components/shop-layout";

function Events(): ReactElement {
  const breadcrumbItems = [{ label: "Events", link: "/Events" }];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="pb-56">
        <ShopLayout filters={true} title="Events" />
      </Main>
      <Footer />
    </>
  );
}

export default Events;
