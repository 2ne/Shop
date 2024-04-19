import classNames from "classnames";
import { Variants, motion } from "framer-motion";
import { FC } from "react";

export const defaultTransition = {
  duration: 0.2,
  ease: [0.645, 0.045, 0.355, 1],
};

export const heightInOut = (): Variants => ({
  initial: {
    height: 0,
    opacity: 0,
    transition: defaultTransition,
  },
  animate: {
    height: "auto",
    opacity: 1,
    transition: defaultTransition,
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: defaultTransition,
  },
});

export const widthInOut = (): Variants => ({
  initial: {
    width: 0,
    opacity: 0,
    transition: defaultTransition,
  },
  animate: {
    width: "auto",
    opacity: 1,
    transition: defaultTransition,
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: defaultTransition,
  },
});

export const fadeInOut = (): Variants => ({
  initial: {
    opacity: 0,
    transition: defaultTransition,
  },
  animate: {
    opacity: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    transition: defaultTransition,
  },
});

const animations = {
  heightInOut: heightInOut(),
  widthInOut: widthInOut(),
  fadeInOut: fadeInOut(),
};

interface MotionProps {
  animation: keyof typeof animations;
  className?: string;
  overflowHidden?: boolean;
}

export const Motion: FC<MotionProps> = ({
  animation,
  className,
  children,
  overflowHidden = true,
}) => {
  const classes = classNames(className, {
    "overflow-hidden": overflowHidden,
  });

  return (
    <motion.div
      variants={animations[animation]}
      initial="initial"
      animate="animate"
      exit="exit"
      className={classes}
    >
      {children}
    </motion.div>
  );
};
