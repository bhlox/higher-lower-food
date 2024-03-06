"use server";
import { ScatteredBoxList } from "@/components/home/scattered-box";
import { getRandomMenuImages } from "@/lib/actions/menuitems";
import { HOME_FOOD_BOXES } from "@/lib/constants";
import HomeBoard from "@/components/home/board";
import { adjustColor, generateRandomHexColor } from "@/lib/utils/helper";
import { ScatteredBoxProps } from "@/lib/types";

export default async function Home() {
  const randomImages = await getRandomMenuImages();
  const mappedHOME_FOOD_BOXES: ScatteredBoxProps[] = HOME_FOOD_BOXES.map(
    (food, i) => {
      const primaryColor = generateRandomHexColor();
      return {
        ...food,
        image: randomImages[i].imageLink,
        brandName: randomImages[i].brand.name,
        primaryColor,
        secondaryColor: adjustColor(primaryColor, -150),
        shouldAnimate: false,
      };
    }
  );
  return (
    <section className="flex h-[100dvh] flex-col items-center justify-center p-4 relative overflow-hidden">
      <HomeBoard />
      <ScatteredBoxList list={mappedHOME_FOOD_BOXES} />
    </section>
  );
}
