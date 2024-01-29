import { useInfiniteQuery } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getRandomUndiplicatedMenuItems } from "../actions/menuitems";
import { isIndexQualifiedToFetch } from "./helper";

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
