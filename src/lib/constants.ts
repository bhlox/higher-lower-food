import { Variants } from "framer-motion";
import { MotionTransitionProps } from "./types";

export const ZERO_TO_NINE_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const SLOT_Y_PADDING = 8;

export const ANSWER_CHOICES = ["higher", "lower"] as const;

export const INITIAL_INDEXES = [0, 1];

export const BOX_MOTION_VARIANTS: Variants = {
  firstEnter: {
    opacity: 1,
    x: "-85%",
    y: "-85%",
    position: "absolute",
    zIndex: 5,
  },
  secondEnter: {
    opacity: 1,
    x: "85%",
    y: "85%",
    position: "absolute",
    zIndex: 5,
  },
  slideTo: {
    opacity: 1,
    position: "relative",
    x: 0,
    y: 0,
    zIndex: 15,
    borderRadius: 0,
  },
  firstExit: {
    opacity: 0,
    x: "100%",
    y: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 5,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
  secondExit: {
    opacity: 0,
    x: "-100%",
    y: "-100%",
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 5,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

export const BOX_MOTION_TRANSITION: MotionTransitionProps = {
  ease: "easeInOut",
  type: "spring",
  mass: 1.25,
};

// #TODO fix below. getting compiler errors when app is starting. probably dynamic import

// export const correctSound = new Audio("/assets/correct.wav");
// export const wrongSound = new Audio("/assets/wrong.wav");
