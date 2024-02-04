import { Variants } from "framer-motion";
import { MotionTransitionProps } from "./types";

export const ZERO_TO_NINE_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const SLOT_Y_PADDING = 8 as const;

export const ANSWER_CHOICES = ["higher", "lower"] as const;

export const INITIAL_INDEXES = [0, 1];

export const NUMBER_TO_FETCH = 9 as const;

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

export const REDIS_KEY_SENT_MENUITEM = "sent_menuitem_ids" as const;

export const BOX_MOTION_TRANSITION: MotionTransitionProps = {
  ease: "easeInOut",
  type: "spring",
  mass: 1.25,
};

export const HOME_FOOD_BOXES = [
  {
    position: "-top-6 left-[55%]",
    size: "size-20 sm:size-28 lg:size-32",
  },
  {
    position: "md:top-6 md:left-[15%] left-[2%] sm:left-[7%] top-[3%]",
    size: "size-24 sm:size-36 md:size-48 lg:size-56",
  },
  {
    position: "md:top-[33%] md:-left-4 sm:top-[25%] top-[23%] -left-10",
    size: "size-24 sm:size-32 lg:size-36",
  },
  {
    position: "top-[65%] md:left-[5%] sm:left-0 -left-8",
    size: "size-32 sm:size-36 md:size-48 lg:size-56",
  },
  {
    position: "bottom-4 md:bottom-8 left-[15%] sm:left-[30%] md:left-[40%]",
    size: "size-28 md:size-32 lg:size-36",
  },
  {
    position:
      "xl:-bottom-4 xl:-right-4 lg:bottom-4 lg:right-6 md:bottom-16 md:right-8 bottom-20 sm:right-4 -right-2",
    size: "size-28 sm:size-36 md:size-44 lg:size-52",
  },
  {
    position: "bottom-[30%] xl:right-[20%] lg:right-[5%] sm:-right-4 -right-6",
    size: "size-24 md:size-28 lg:size-32",
  },
  {
    position: "top-[15%] md:right-[10%] sm:right-[5%] -right-4",
    size: "size-24 sm:size-36 md:size-44 lg:size-52",
  },
];

export const DEFAULT_BOX_SHADOW_SCATTERED_BOX = "0 10px 15px -3px black";
