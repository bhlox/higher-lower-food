import { useInfiniteQuery } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getRandomUndiplicatedMenuItems } from "../actions/menuitems";
import { isIndexQualifiedToFetch } from "./helper";
import { P, match } from "ts-pattern";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useFetchMenuItems = ({ indexes }: { indexes: number[] }) => {
  return useInfiniteQuery({
    initialPageParam: [],
    getNextPageParam: (lastPage, pages) => {
      // console.log(lastPage);
      // console.log(pages);
      return pages;
    },
    queryKey: ["menuitems"],
    queryFn: () => getRandomUndiplicatedMenuItems(),
    enabled: indexes[1] === 1 || isIndexQualifiedToFetch(indexes[1]),
    staleTime: Infinity,
  });
};

export const getScoreVisualAttributes = (score: number) => {
  return match({ score })
    .returnType<{
      boxShadow: string;
      starCount: number;
      starInterval: number;
    }>()
    .with({ score: P.when((sco) => sco >= 1 && sco < 10) }, () => ({
      boxShadow:
        "0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 0.8rem #059669, 0 0 2.8rem #059669, inset 0 0 1.3rem #059669",
      starCount: 1,
      starInterval: 5000,
    }))
    .with({ score: P.when((sco) => sco >= 10 && sco <= 15) }, () => ({
      boxShadow:
        "0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #fef08a, 0 0 0.8rem #fef08a, 0 0 2.8rem #fef08a, inset 0 0 1.3rem #fef08a",
      starCount: 2,
      starInterval: 3500,
    }))
    .with({ score: P.when((sco) => sco >= 15) }, () => ({
      boxShadow:
        "0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #a855f7, 0 0 10rem 2rem #a855f7, 0 0 0.8rem #a855f7, 0 0 2.8rem #a855f7, inset 0 0 1.3rem #a855f7",
      starCount: 3,
      starInterval: 1000,
    }))
    .otherwise(() => ({
      boxShadow: "0 0 .2rem #fff, 0 0 2.8rem #e7e5e4",
      starCount: 0,
      starInterval: 0,
    }));
};
