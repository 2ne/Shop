import React from "react";

const events = [
  {
    id: 1,
    date: "Tuesday at 10:00 - 11:00 on May 10th",
    name: "Bubble the Seahorse",
    imageUrl: "./src/assets/seahorse.jpg",
    location: "Quarterway House, Ely Rd, Little Thetford",
    status: "Paid",
    participant: "Jacob Toone",
  },
  {
    id: 1,
    date: "Tuesday at 10:00 - 11:00 on May 17th",
    name: "Bubble the Seahorse",
    imageUrl: "./src/assets/seahorse.jpg",
    location: "Quarterway House, Ely Rd, Little Thetford",

    status: "Awaiting payment",
    participant: "Jacob Toone",
  },
];

const AccountCalendar: React.FC = () => {
  return (
    <div>
      <div className="pb-2 text-sm font-medium leading-6 border-b text-neutral-900">
        <div className="pb-px">2 events</div>
      </div>
      <ol className="text-sm leading-6 divide-y">
        {events.map((event) => (
          <li key={event.id} className="relative flex py-4 space-x-4">
            <img
              src={event.imageUrl}
              alt=""
              className="flex-none object-contain object-center rounded-md h-14 w-14"
            />
            <div className="flex-auto -mt-1">
              <div className="font-medium">{event.name}</div>
              <dl className="flex flex-col text-sm leading-6 text-neutral-500">
                <div className="flex items-center space-x-1.5">
                  <dt className="flex">
                    <span className="sr-only">Date</span>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4.75 8.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM8 4.75v3.5M16 4.75v3.5M7.75 10.75h8.5"
                      ></path>
                    </svg>
                  </dt>
                  <dd>
                    <time>{event.date}</time>
                  </dd>
                </div>
                <div className="flex items-center space-x-1.5">
                  <dt>
                    <span className="sr-only">Location</span>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M18.25 11c0 4-6.25 8.25-6.25 8.25S5.75 15 5.75 11c0-3.5 2.936-6.25 6.25-6.25S18.25 7.5 18.25 11z"
                      ></path>
                      <circle
                        cx="12"
                        cy="11"
                        r="2.25"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      ></circle>
                    </svg>
                  </dt>
                  <dd>{event.location}</dd>
                </div>
                <div className="flex items-center space-x-1.5">
                  <dt>
                    <span className="sr-only">Participant</span>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="3.25"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      ></circle>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6.848 19.25h10.305c1.141 0 2.021-.982 1.488-1.992C17.856 15.773 16.068 14 12 14s-5.856 1.773-6.64 3.258c-.534 1.01.346 1.992 1.487 1.992z"
                      ></path>
                    </svg>
                  </dt>
                  <dd>{event.participant}</dd>
                </div>
                {event.status === "Awaiting payment" && (
                  <div className="flex items-center space-x-1.5 text-error">
                    <dt>
                      <span className="sr-only">Status</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-error"
                      >
                        <path
                          fill="currentColor"
                          d="M12 14.25a.75.75 0 000 1.5v-1.5zm.01 1.5a.75.75 0 000-1.5v1.5zm-.01 0h.01v-1.5H12v1.5zM10.403 5.411l.53.53-.53-.53zm-4.992 4.992l-.53-.53.53.53zm0 3.194l.53-.53-.53.53zm4.992 4.992l.53-.53-.53.53zm3.194 0l.53.53-.53-.53zm4.992-8.186l.53-.53-.53.53zm-4.992-4.992l.53-.53-.53.53zm-3.724-.53L4.881 9.873l1.06 1.06 4.993-4.991L9.873 4.88zm-4.992 9.246l4.992 4.992 1.06-1.06-4.991-4.993-1.061 1.061zm9.246 4.992l4.992-4.992-1.06-1.06-4.993 4.991 1.061 1.061zm4.992-9.246l-4.992-4.992-1.06 1.06 4.991 4.993 1.061-1.061zm0 4.254a3.008 3.008 0 000-4.254l-1.06 1.06a1.508 1.508 0 010 2.133l1.06 1.061zm-9.246 4.992a3.008 3.008 0 004.254 0l-1.06-1.06a1.508 1.508 0 01-2.133 0l-1.061 1.06zM4.881 9.873a3.008 3.008 0 000 4.254l1.06-1.06a1.508 1.508 0 010-2.133l-1.06-1.061zm6.053-3.931a1.508 1.508 0 012.132 0l1.061-1.061a3.008 3.008 0 00-4.254 0l1.06 1.06z"
                        ></path>
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 8.75v3.5"
                        ></path>
                      </svg>
                    </dt>
                    <dd>{event.status}</dd>
                  </div>
                )}
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default AccountCalendar;
