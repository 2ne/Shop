import React from "react";

const AccountOrganisations: React.FC = () => {
  return (
    <div>
      <div className="pb-2 mb-4 text-sm font-medium leading-6 border-b text-neutral-900">
        <div className="pb-px">Switch organisations</div>
      </div>
      <p className="text-sm">
        You are a member of 2 JoinIn organisations. Click on the name of an
        organisation below to switch to their shop.
      </p>
      <ul className="mt-6 space-y-3">
        <li className="relative flex items-center justify-between px-4 py-3 font-medium transition-colors bg-white border-2 rounded-md shadow-sm cursor-pointer border-interactive text-interactive">
          <span>CG Swim School</span>
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="-mr-1 w-7 h-7"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75V4.75C16.0041 4.75 19.25 7.99594 19.25 12V12C19.25 16.0041 16.0041 19.25 12 19.25V19.25C7.99594 19.25 4.75 16.0041 4.75 12V12Z"
            ></path>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
            ></path>
          </svg>
        </li>
        <li className="relative items-center justify-between flex px-4 py-3.5 font-medium shadow-sm transition-colors bg-white border rounded-md cursor-pointer border-neutral-200 hover:border-neutral-300">
          <span>Organisation 2</span>
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="-mr-1 opacity-0 w-7 h-7"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75V4.75C16.0041 4.75 19.25 7.99594 19.25 12V12C19.25 16.0041 16.0041 19.25 12 19.25V19.25C7.99594 19.25 4.75 16.0041 4.75 12V12Z"
            ></path>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
            ></path>
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default AccountOrganisations;
