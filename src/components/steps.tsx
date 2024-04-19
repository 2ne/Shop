import { motion } from "framer-motion";
import React from "react";

interface Step {
  title: string;
}

interface StepsProps {
  currentStep: number;
  furthestStep: number;
  steps: Step[];
  handleStepClick: (stepIndex: number) => void;
  visibleSteps?: number[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Steps: React.FC<StepsProps> = ({
  currentStep,
  furthestStep,
  steps,
  handleStepClick,
  visibleSteps,
}) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, index) => {
          if (visibleSteps && !visibleSteps.includes(index)) {
            return null;
          }
          const isActive = index === currentStep;
          const isCompleted = index < furthestStep;
          const isClickable = index <= furthestStep;
          const isActiveAndCompleted = isActive && isCompleted;

          return (
            <li
              key={index}
              className={classNames(
                index !== steps.length - 1 ? "pb-8" : "",
                "relative [&:last-child>div]:hidden"
              )}
            >
              {isActiveAndCompleted ? (
                <>
                  {index !== steps.length - 1 ? (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 40,
                      }}
                      className="absolute left-3.5 top-8 rounded-full -ml-px mt-0.5 bottom-0.5 w-0.5 bg-interactive"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    className="relative flex items-start group"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isClickable) {
                        handleStepClick(index);
                      }
                    }}
                  >
                    <span className="flex items-center h-8">
                      <span className="relative z-10 flex items-center justify-center transition-colors bg-white border-2 rounded-full w-7 h-7 border-interactive group-hover:border-interactive/80">
                        <motion.svg
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 40,
                          }}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-interactive w-7 h-7"
                          aria-hidden="true"
                        >
                          <path
                            d="M7.75 12.75L10 15.25L16.25 8.75"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </motion.svg>
                      </span>
                    </span>
                    <span className="flex items-center h-8 min-w-0 ml-3">
                      <span className="text-sm font-medium text-interactive">
                        <span
                          className={
                            isClickable
                              ? "transition-colors group-hover:underline"
                              : ""
                          }
                        >
                          {step.title}
                        </span>
                      </span>
                    </span>
                  </a>
                </>
              ) : isCompleted ? (
                <>
                  {index !== steps.length - 1 ? (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 40,
                      }}
                      className="absolute left-3.5 top-8 rounded-full -ml-px mt-0.5 bottom-0.5 w-0.5 bg-interactive"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    className="relative flex items-start group"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isClickable) {
                        handleStepClick(index);
                      }
                    }}
                  >
                    <span className="flex items-center h-8">
                      <span className="relative z-10 flex items-center justify-center transition-colors border-2 rounded-full w-7 h-7 border-interactive bg-interactive group-hover:bg-interactive/80">
                        <motion.svg
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 40,
                          }}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-white w-7 h-7"
                          aria-hidden="true"
                        >
                          <path
                            d="M7.75 12.75L10 15.25L16.25 8.75"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </motion.svg>
                      </span>
                    </span>
                    <span className="flex items-center h-8 min-w-0 ml-3">
                      <span className="text-sm font-medium">
                        <span
                          className={
                            isClickable
                              ? "transition-colors group-hover:underline"
                              : ""
                          }
                        >
                          {step.title}
                        </span>
                      </span>
                    </span>
                  </a>
                </>
              ) : isActive ? (
                <>
                  {index !== steps.length - 1 ? (
                    <div
                      className="absolute left-3.5 top-8 rounded-full -ml-px mt-0.5 bottom-0.5 w-0.5 bg-neutral-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    className="relative flex items-start group"
                    aria-current="step"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isClickable) {
                        handleStepClick(index);
                      }
                    }}
                  >
                    <span className="flex items-center h-8" aria-hidden="true">
                      <span className="relative z-10 flex items-center justify-center transition-colors bg-white border-2 rounded-full w-7 h-7 border-interactive group-hover:border-interactive/80">
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 40,
                          }}
                          className="h-2.5 w-2.5 rounded-full bg-interactive"
                        />
                      </span>
                    </span>
                    <span className="flex items-center h-8 min-w-0 ml-3">
                      <span className="text-sm font-medium text-interactive">
                        <span
                          className={
                            isClickable
                              ? "transition-colors group-hover:underline"
                              : ""
                          }
                        >
                          {step.title}
                        </span>
                      </span>
                    </span>
                  </a>
                </>
              ) : (
                <>
                  {index !== steps.length - 1 ? (
                    <div
                      className="absolute left-3.5 top-8 rounded-full -ml-px mt-0.5 bottom-0.5 w-0.5 bg-neutral-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    className="relative flex items-start group"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isClickable) {
                        handleStepClick(index);
                      }
                    }}
                  >
                    <span className="flex items-center h-8" aria-hidden="true">
                      <span className="relative z-10 flex items-center justify-center transition-colors bg-white border-2 rounded-full w-7 h-7 border-neutral-300 group-hover:border-neutral-400"></span>
                    </span>
                    <span className="flex items-center h-8 min-w-0 ml-3">
                      <span className="text-sm font-medium text-neutral-500">
                        <span
                          className={
                            isClickable
                              ? "transition-colors group-hover:underline"
                              : ""
                          }
                        >
                          {step.title}
                        </span>
                      </span>
                    </span>
                  </a>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Steps;
