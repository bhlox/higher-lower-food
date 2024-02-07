import { AnimationProps, MotionProps } from "framer-motion";
import { ANSWER_CHOICES, CARD_SIDES } from "./constants";

export type TODO = any;

export type MappedMenuItem = {
  id: number;
  title: string;
  price: number;
  imageLink: string;
  brand: {
    name: string;
  };
};

export interface SlotProps {
  assignedDigit: number | null;
  textSize: number;
  index: number;
  isFirstIndex: boolean;
  isLastIndex: boolean;
  previousAssignedDigit: number | null;
}

export type Answer = {
  answer: AnswerChoice;
  questionId: number;
};

export type AnswerChoice = (typeof ANSWER_CHOICES)[number];

export type BasicVariantsProps = AnimationProps & MotionProps["style"];

export type MotionTransitionProps = AnimationProps["transition"];

export type AnyCallback = (args: any) => any;

// shouldAnimate only represents if it should animate for mobile view
export type ScatteredBoxProps = {
  image: string;
  brandName: string;
  primaryColor: string;
  secondaryColor: string;
  position: string;
  size: string;
  shouldAnimate: boolean;
  className?: string;
};

export type CardSides = (typeof CARD_SIDES)[number];
