"use server";
import { db } from "@/db";
import { redisClient } from "../config/redis";
import { notInArray, sql } from "drizzle-orm";
import { menuItems } from "@/db/schema";
import { cookies } from "next/headers";
import { REDIS_KEY_SENT_MENUITEM } from "../constants";
import { arrayHasValue } from "../utils/helper";
import { MappedMenuItem } from "../types";

// #TODO change name
const serverGetCookie = (name: string) =>
  cookies().get(name)?.value.split("-").pop();

export async function getSentMenuItemIds(uuid: string) {
  try {
    // await redisClient.connect();
    const members = await redisClient.smembers(
      `${REDIS_KEY_SENT_MENUITEM}:${uuid}`
    );
    const numberIds = members.map(Number);
    if (arrayHasValue(numberIds)) {
      return numberIds;
    } else {
      console.log("no numberIds found");
    }
  } catch (error) {
    console.error("redis error happened. error msg to follow");
    console.error(error);
    return undefined;
  } finally {
    // redisClient.disconnect();
  }
}

export async function getRandomMenuItems() {
  return await db.query.menuItems.findMany({
    orderBy: sql`RANDOM()`,
    columns: { brandId: false, categoryId: false },
    limit: 10,
    with: {
      brand: { columns: { name: true } },
      sizes: {
        columns: { type: true, price: true },
        limit: 1,
        orderBy: sql`RANDOM()`,
      },
    },
  });
}

export async function getRandomMenuImages() {
  return await db.query.menuItems.findMany({
    orderBy: sql`RANDOM()`,
    columns: { imageLink: true },
    limit: 8,
    with: { brand: { columns: { name: true } } },
  });
}

export async function addMenuItemIds({
  menuItemIds,
  uuid,
}: {
  menuItemIds: string[];
  uuid: string;
}) {
  try {
    // await redisClient.connect();
    if (arrayHasValue(menuItemIds)) {
      await redisClient.sadd(`${REDIS_KEY_SENT_MENUITEM}:${uuid}`, menuItemIds);
    }
  } catch (error) {
    console.error("redis error happened. error msg to follow");
    console.error(error);
  } finally {
    redisClient.expire(`${REDIS_KEY_SENT_MENUITEM}:${uuid}`, 600);
    // redisClient.disconnect();
  }
}

export async function getRandomUndiplicatedMenuItems() {
  let uuid = serverGetCookie("uuid");
  if (!uuid) {
    cookies().set("uuid", crypto.randomUUID(), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    uuid = serverGetCookie("uuid")!;
  }
  // check uuid and check sendids on redis to verify sent ids to avoid duplicate values sent to the user
  const sentMenuItemIds = await getSentMenuItemIds(uuid);

  let randomItems = await db.query.menuItems.findMany({
    orderBy: sql`RANDOM()`,
    columns: { brandId: false, categoryId: false },
    // where: (menuItems, { eq }) => eq(menuItems.brandId, 3),
    where: sentMenuItemIds
      ? notInArray(menuItems.id, sentMenuItemIds)
      : undefined,
    limit: 10,
    with: {
      brand: { columns: { name: true } },
      sizes: {
        columns: { type: true, price: true },
        limit: 1,
        orderBy: sql`RANDOM()`,
      },
    },
  });

  if (randomItems.length !== 10) {
    // await redisClient.connect();
    await redisClient.del(`${REDIS_KEY_SENT_MENUITEM}:${uuid}`);
    // redisClient.disconnect();
    randomItems = await getRandomMenuItems();
  }

  const randomItemsIds = randomItems.map((item) => item.id.toString());
  addMenuItemIds({ menuItemIds: randomItemsIds, uuid });

  // const encryptedItems = randomItems.map((item) => {
  //   if (!item.price) {
  //     const encryptedSizesData = item.sizes.map((size) => ({
  //       type: size.type,
  //       price: encrypt(size.price),
  //     }));
  //     return { ...item, sizes: encryptedSizesData };
  //   }
  //   return { ...item, price: encrypt(item.price) };
  // });

  const cleanedItemData: MappedMenuItem[] = randomItems
    .map((rand) => {
      if (!rand.price) {
        rand.price = rand.sizes[0].price;
      }
      if (rand.title.toLowerCase() === rand.sizes[0]?.type?.toLowerCase()) {
        rand.sizes[0].type = "";
      }
      if (rand.sizes[0]?.type) {
        const removedDuplicateName = rand.sizes[0]?.type
          .toLowerCase()
          .replace(rand.title, "")
          .trim();
        rand.title = rand.sizes[0].type
          ? `${rand.title} - ${removedDuplicateName}`
          : rand.title;
      }
      // rand.price = rand.price ? +rand.price : 0;

      const { sizes, ...rest } = rand;
      return { ...rest };
    })
    .map((item) => ({ ...item, price: item.price ? Number(item.price) : 0 }));
  return cleanedItemData;
}
