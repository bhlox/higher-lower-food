"use client";
import { getMenuItems } from "@/lib/actions/menuActions";
import { Answer, AnswerChoice } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { INITIAL_INDEXES } from "@/lib/constants";

interface IGameContext {
  getNextQuestion: () => void;
  indexes: number[];
  isGameOver: boolean;
  score: number;
  restartGame: () => void;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setSpinSlots: React.Dispatch<React.SetStateAction<boolean>>;
  spinSlots: boolean;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Answer | undefined>>;
  handleResults: () => void;
  isCorrect: boolean | null;
  selectedAnswer: AnswerChoice | undefined;
  setQuestionPrice: React.Dispatch<React.SetStateAction<number | string>>;
  questionPrice: number | string;
  setRevealedPrice: React.Dispatch<React.SetStateAction<string | number>>;
  restartStates: () => void;
}

export const GameContext = createContext<IGameContext | undefined>(undefined);

export const GameProvider = ({ children }: PropsWithChildren<{}>) => {
  const queryClient = useQueryClient();
  const correctSound = useRef<HTMLAudioElement>();
  const wrongSound = useRef<HTMLAudioElement>();

  const [spinSlots, setSpinSlots] = useState(false);
  const [indexes, setIndexes] = useState(INITIAL_INDEXES);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedAnwer, setSelectedAnswer] = useState<Answer | undefined>();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionPrice, setQuestionPrice] = useState<string | number>(0);
  const [revealedPrice, setRevealedPrice] = useState<string | number>(0);

  const restartStates = () => {
    setScore(0);
    setIndexes(INITIAL_INDEXES);
    setSelectedAnswer(undefined);
    setIsCorrect(null);
    setSpinSlots(false);
    setIsGameOver(false);
  };

  const getNextQuestion = async () => {
    setScore((c) => c + 1);
    setSelectedAnswer(undefined);
    setIsCorrect(null);
    setSpinSlots(false);
    setIndexes(([_, last]) => {
      return [last, last + 1];
    });
  };

  const restartGame = async () => {
    queryClient.removeQueries({ queryKey: ["menuitems"] });
    await queryClient.prefetchInfiniteQuery({
      initialPageParam: 0,
      getNextPageParam: (lastPage: any, pages: any) => lastPage,
      queryKey: ["menuitems"],
      queryFn: () => getMenuItems(),
      staleTime: Infinity,
    });

    restartStates();
  };

  const handleResults = () => {
    const results =
      selectedAnwer?.answer === "higher"
        ? +questionPrice >= +revealedPrice
        : +questionPrice <= +revealedPrice;
    if (results) {
      setIsCorrect(true);
      correctSound.current?.play();
      setTimeout(() => {
        getNextQuestion();
      }, 1500);
    } else {
      setIsCorrect(false);
      wrongSound.current?.play();
      setTimeout(() => {
        setIsGameOver(true);
      }, 1500);
    }
  };

  useEffect(() => {
    correctSound.current = new Audio("/assets/correct.wav");
    wrongSound.current = new Audio("/assets/wrong.wav");
  }, []);

  return (
    <GameContext.Provider
      value={{
        getNextQuestion,
        indexes,
        score,
        restartGame,
        setIsGameOver,
        isGameOver,
        setSpinSlots,
        spinSlots,
        handleResults,
        setSelectedAnswer,
        isCorrect,
        selectedAnswer: selectedAnwer?.answer,
        setQuestionPrice,
        questionPrice,
        setRevealedPrice,
        restartStates,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext)!;
