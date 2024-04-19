import { Button } from "antd";
import React from "react";

export type FormButtonType =
  | "continue"
  | "pay"
  | "confirm"
  | "createAccount"
  | "verifyAccount";

interface FormButtonProps {
  onClick?: () => void;
  buttonType: FormButtonType;
}

export const FormButton: React.FC<FormButtonProps> = ({
  onClick,
  buttonType = "continue",
}) => {
  let text = "";
  let buttonClass;

  switch (buttonType) {
    case "pay":
      text = "Pay now";
      buttonClass = "!bg-emerald-500 hover:!bg-emerald-400";
      break;
    case "confirm":
      text = "Confirm";
      buttonClass = "!bg-emerald-500 hover:!bg-emerald-400";
      break;
    case "createAccount":
      text = "Create account";
      buttonClass = "!bg-emerald-500 hover:!bg-emerald-400";
      break;
    case "verifyAccount":
      text = "Verify account";
      break;
    default:
      text = "Continue";
  }

  return (
    <Button
      size="large"
      type="primary"
      block
      className={buttonClass}
      onClick={onClick}
    >
      {buttonType === "pay" && (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="mr-1.5 max-sm:w-5 max-sm:h-5 -ml-1.5"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.75 11.75a1 1 0 011-1h10.5a1 1 0 011 1v5.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-5.5zM7.75 10.5v-.157c0-1.562-.094-3.302.996-4.42C9.368 5.288 10.374 4.75 12 4.75c1.626 0 2.632.537 3.254 1.174 1.09 1.117.996 2.857.996 4.419v.157"
          ></path>
        </svg>
      )}
      <span>{text}</span>
    </Button>
  );
};

export default FormButton;
