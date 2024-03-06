"use client";
import { getRandomUndiplicatedMenuItems } from "@/lib/actions/menuitems";
import { Answer, AnswerChoice } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import React, {
  ElementRef,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { INITIAL_INDEXES } from "@/lib/constants";
import { updateScores } from "@/lib/actions/users";

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
  handleRoundResults: () => void;
  isCorrect: boolean | null;
  selectedAnswer: AnswerChoice | undefined;
  setQuestionPrice: React.Dispatch<React.SetStateAction<number>>;
  questionPrice: number;
  setRevealedPrice: React.Dispatch<React.SetStateAction<number>>;
  restartStates: ({ includeQuery }: { includeQuery: boolean }) => void;
  highScoreRef: React.MutableRefObject<number>;
}

export const GameContext = createContext<IGameContext | undefined>(undefined);

export const GameProvider = ({ children }: PropsWithChildren<{}>) => {
  const queryClient = useQueryClient();
  const correctSound = useRef<ElementRef<"audio">>();
  const wrongSound = useRef<ElementRef<"audio">>();
  const highScoreRef = useRef<number>(0);

  const [spinSlots, setSpinSlots] = useState(false);
  const [indexes, setIndexes] = useState(INITIAL_INDEXES);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedAnwer, setSelectedAnswer] = useState<Answer | undefined>();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionPrice, setQuestionPrice] = useState<number>(0);
  const [revealedPrice, setRevealedPrice] = useState<number>(0);

  const restartStates = ({ includeQuery }: { includeQuery: boolean }) => {
    setScore(0);
    setIndexes(INITIAL_INDEXES);
    setSelectedAnswer(undefined);
    setIsCorrect(null);
    setSpinSlots(false);
    setIsGameOver(false);

    if (includeQuery) {
      queryClient.removeQueries({ queryKey: ["menuitems"] });
    }
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
      queryFn: () => getRandomUndiplicatedMenuItems(),
      staleTime: Infinity,
    });
    restartStates({ includeQuery: false });
  };

  // #BUG when `results` is not false, there is a chance to do it twice because of how it is invoked in the `slot.tsx` file

  const getHighScore = async () => {
    const data = await updateScores(score);
    if (data?.highScore) {
      highScoreRef.current = data.highScore;
    }
  };

  const handleRoundResults = () => {
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
      setTimeout(async () => {
        await getHighScore();
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
        handleRoundResults,
        setSelectedAnswer,
        isCorrect,
        selectedAnswer: selectedAnwer?.answer,
        setQuestionPrice,
        questionPrice,
        setRevealedPrice,
        restartStates,
        highScoreRef,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext)!;
