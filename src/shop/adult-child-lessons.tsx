import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Main from "../components/main";
import CalendarWeek from "../components/calendar/calendar-week";
import Calendar from "../components/calendar/calendar";
function AdultChildLessons(): ReactElement {
  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/AdultChildLessons" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="pb-20 lg:pb-0">
        {/* <CalendarWeek /> */}
        <Calendar singleProduct={true} />
      </Main>
    </>
  );
}

export default AdultChildLessons;
