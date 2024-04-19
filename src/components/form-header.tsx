import React, { ReactNode } from "react";
import Balancer from "react-wrap-balancer";

type FormHeaderProps = {
  icon?: ReactNode;
  title: string;
  subtitle: string;
  requiredText?: string;
};

const FormHeader: React.FC<FormHeaderProps> = ({
  icon,
  title,
  subtitle,
  requiredText,
}) => {
  return (
    <header>
      {icon && (
        <div className="justify-center hidden mb-2.5 lg:flex">
          <i className="w-[3.25rem] h-[3.25rem] p-[calc(0.5rem+1px)] rounded-full bg-neutral-100/75 flex items-center justify-center text-neutral-700">
            {icon}
          </i>
        </div>
      )}
      <div className="hidden lg:block">
        <Balancer>
          <div className="mb-2 heading-lg">{title}</div>
          <div className="sub-heading">{subtitle}</div>
        </Balancer>
      </div>
      <div className="lg:hidden">
        <div className="mb-1 heading-lg">{title}</div>
        <div className="sub-heading">{subtitle}</div>
      </div>
      {requiredText && (
        <div className="flex mt-2.5 lg:justify-center">
          <div className="inline-flex items-center px-3 py-2 text-xs font-medium text-left rounded-md lg:px-4 sm:text-sm bg-primary text-primary_text gap-x-2">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="-ml-1.5 h-5 w-5 lg:h-6 lg:w-6 lg:-ml-2 shrink-0"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 13v2"
              ></path>
              <circle cx="12" cy="9" r="1" fill="currentColor"></circle>
              <circle
                cx="12"
                cy="12"
                r="7.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></circle>
            </svg>
            <span>{requiredText}</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default FormHeader;
