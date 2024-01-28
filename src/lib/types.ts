import { AnimationProps, MotionProps } from "framer-motion";
import { ANSWER_CHOICES } from "./constants";

export type MappedMenuItem = {
  id: number;
  title: string;
  price: string | null;
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
