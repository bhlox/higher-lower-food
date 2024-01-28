"use client";
import { getMenuItems } from "@/lib/actions/menuActions";
import { isEvenNum } from "@/lib/utils/helper";
import { Answer, AnswerChoice, MappedMenuItem } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { INITIAL_INDEXES } from "@/lib/constants";
import Loading from "@/app/game/loading";

// #TODO REFACTOR because it might cause unneccesary re renderings
// #TODO usequery change to use the server action instead. but for you to do that you have to fix the type from cleanedItemData. the price key should be a type of string not string | null

interface IGameContext {
  menuitemsData: MappedMenuItem[];
  getNextQuestion: () => void;
  indexes: number[];
  isFetching: boolean;
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
}

const useFetchMenuItems = ({
  indexes,
  setMenuitemsData,
}: {
  indexes: number[];
  setMenuitemsData: React.Dispatch<React.SetStateAction<MappedMenuItem[]>>;
}) => {
  return useQuery({
    queryKey: ["menuitems", indexes],
    queryFn: async () => {
      const data = await getMenuItems();
      setMenuitemsData((prev) => {
        return [...prev, ...data];
      });
      return data;
    },
    // initialData: () => {
    //   const queriedMenuitems = queryClient.getQueryData(["menuitems", indexes]);
    //   return queriedMenuitems ?? undefined;
    // },
    enabled:
      indexes[1] === 1 ||
      Math.abs(
        (+indexes[1].toString().at(-1)! === 0
          ? 1
          : +indexes[1].toString().at(-1)!) % 9
      ) === 0,
    staleTime: Infinity,
  });
};

export const GameContext = createContext<IGameContext | undefined>(undefined);

export const GameProvider = ({ children }: PropsWithChildren<{}>) => {
  const queryClient = useQueryClient();

  const [spinSlots, setSpinSlots] = useState(false);
  const [indexes, setIndexes] = useState(INITIAL_INDEXES);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [menuitemsData, setMenuitemsData] = useState<MappedMenuItem[]>([]);
  const [selectedAnwer, setSelectedAnswer] = useState<Answer | undefined>();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionPrice, setQuestionPrice] = useState<string | number>(0);

  const [prevIndex, currentIndex] = indexes;

  const { data, error, isFetching } = useFetchMenuItems({
    indexes,
    setMenuitemsData,
  });

  console.log(menuitemsData);

  const firstCardData =
    menuitemsData[isEvenNum(prevIndex) ? prevIndex : currentIndex];
  const secondCardData =
    menuitemsData[isEvenNum(currentIndex) ? prevIndex : currentIndex];

  const whoHoldsNewData =
    firstCardData === menuitemsData[currentIndex] ? "first" : "second";

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
    setScore(0);
    setMenuitemsData([]);
    setIndexes(INITIAL_INDEXES);
    setSelectedAnswer(undefined);
    setIsCorrect(null);
    setSpinSlots(false);
    await queryClient.invalidateQueries({ queryKey: ["menuitems"] });

    setIsGameOver(false);
  };

  const handleResults = () => {
    const questionSets = [firstCardData, secondCardData];
    let unknownPrice!: number;
    let knownPrice!: number;
    questionSets.forEach((question) => {
      const price = Number(question?.price);
      if (question?.id === selectedAnwer?.questionId) {
        unknownPrice = price;
      } else {
        knownPrice = price;
      }
    });

    const results =
      selectedAnwer?.answer === "higher"
        ? unknownPrice >= knownPrice
        : unknownPrice <= knownPrice;

    if (results) {
      setIsCorrect(true);
      const correctSound = new Audio("/assets/correct.wav");
      correctSound.play();
      setTimeout(() => {
        getNextQuestion();
      }, 1500);
    } else {
      setIsCorrect(false);
      const wrongSound = new Audio("/assets/wrong.wav");
      wrongSound.play();
      setTimeout(() => {
        setIsGameOver(true);
      }, 1500);
    }
  };

  return (
    <GameContext.Provider
      value={{
        menuitemsData,
        getNextQuestion,
        isFetching,
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext)!;
