import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import Finder from "../components/finder/finder";
function ClassFinder(): ReactElement {
  const breadcrumbItems = [{ label: "Class Finder", link: "/Finder" }];
  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="grid lg:!py-10">
        <Finder />
      </Main>
      <Footer />
    </>
  );
}

export default ClassFinder;
