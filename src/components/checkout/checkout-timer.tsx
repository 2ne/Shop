import React, { useEffect, useState } from "react";
import Wrapper from "../wrapper";
import { message, Button } from "antd";

interface CheckoutTimerProps {
  timer: number; // minutes
}

const CheckoutTimer: React.FC<CheckoutTimerProps> = ({ timer }) => {
  const [timeLeft, setTimeLeft] = useState(timer * 60); // Convert timer to seconds
  const [warningShown, setWarningShown] = useState(false); // Add a new state to track whether the warning toast has been shown
  const timerExtensionAmount = 5;

  const extendTimer = () => {
    setTimeLeft((prevTime) => prevTime + timerExtensionAmount * 60); // Add timer extension amount to the timer
    message.success(`Timer extended by ${timerExtensionAmount} minutes`); // Show a success toast with timer extension value
    message.destroy(); // Hide the warning toast

    message.success(`Checkout time extended`); // Show a success toast with timer extension value
    setTimeout(() => {
      message.destroy();
    }, 2500); // Delay the destroy call by 1 second to allow the success message to be shown
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      document.documentElement.classList.add("checkout-timeout");
      message.destroy(); // Destroy all other messages
      message.error({
        content: (
          <>
            Checkout has timed out
            <Button
              type="link"
              danger={true}
              className="!p-0 !h-auto ml-2 -my-0.5"
            >
              Go to Basket
            </Button>
          </>
        ),
        duration: 0,
      });
      return () => {
        document.documentElement.classList.remove("checkout-timeout");
      };
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Add a condition to show the warning toast when only 2 minutes (120 seconds) are left
    if (timeLeft <= 120 && !warningShown) {
      message.warning({
        content: (
          <>
            2 minutes left to checkout
            <Button
              type="link"
              onClick={extendTimer}
              className="!p-0 !h-auto ml-2 -my-0.5"
            >
              Extend timer?
            </Button>
          </>
        ),
        duration: 0,
      });
      setWarningShown(true); // Set the warningShown state to true to prevent showing the warning toast again
    }

    return () => clearInterval(intervalId);
  }, [timeLeft, warningShown]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative z-10 bg-secondary text-secondary_text">
      <Wrapper>
        <div className="flex items-center justify-center h-10 text-sm tracking-normal">
          <div>
            Items will be reserved for {""}
            <span className="tabular-nums">
              {minutes}:{seconds < 10 ? "0" : ""}
              {seconds}
            </span>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default CheckoutTimer;
