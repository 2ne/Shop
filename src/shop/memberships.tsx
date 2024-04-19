import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import ShopLayout from "../components/shop-layout";

function Memberships(): ReactElement {
  const breadcrumbItems = [{ label: "Memberships", link: "/Memberships" }];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="pb-56">
        <ShopLayout filters={true} title="Memberships" />
      </Main>
      <Footer />
    </>
  );
}

export default Memberships;
