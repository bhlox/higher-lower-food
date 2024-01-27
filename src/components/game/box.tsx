import { MappedMenuItem, MotionTransitionProps } from "@/lib/types";
import { motion } from "framer-motion";
import ImageCard from "./image-card";
import Details from "./details";
import { BOX_MOTION_TRANSITION, BOX_MOTION_VARIANTS } from "@/lib/constants";

// #TODO test if this approach of css transitions is better. https://codesandbox.io/p/sandbox/basic-transition-cisbc?file=%2Fsrc%2FApp.tsx

export default function Box({
  data,
  whoHoldsNewData,
  order,
}: {
  data: MappedMenuItem;
  order: "first" | "second";
  whoHoldsNewData: "first" | "second";
}) {
  const holdsNewData = whoHoldsNewData === order;

  return (
    <motion.div
      variants={BOX_MOTION_VARIANTS}
      initial={`${order}Enter`}
      animate="slideTo"
      exit={`${order}Exit`}
      transition={BOX_MOTION_TRANSITION}
      className={`text-white h-[50dvh] w-screen lg:h-screen lg:w-[50dvw] flex flex-col justify-center
        items-center overflow-hidden ${!holdsNewData ? "bg-slate-800 " : ""}`}
    >
      <ImageCard
        key={data.imageLink}
        brandName={data.brand.name}
        imgSrc={data.imageLink}
        foodName={data.title}
      />
      <Details
        key={`details:${data.id}`}
        title={data.title}
        price={data.price}
        holdsNewData={holdsNewData}
        questionId={data.id}
      />
    </motion.div>
  );
}
