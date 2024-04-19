import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Main from "../components/main";
import Calendar from "../components/calendar/calendar";
function Timetable(): ReactElement {
  const breadcrumbItems = [
    { label: "Little Telford Timetable", link: "/Timetable" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="pb-20 lg:pb-0">
        <Calendar singleProduct={false} />
      </Main>
    </>
  );
}

export default Timetable;
