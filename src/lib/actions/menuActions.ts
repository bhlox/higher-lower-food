"use server";

import { db } from "@/db";
import { redisClient } from "../config/redis";
import { notInArray, sql } from "drizzle-orm";
import { MenuItem, menuItems } from "@/db/schema";
import { cookies } from "next/headers";
import { MappedMenuItem } from "@/lib/types";

export async function getMenuItems() {
  console.log("server action triggered");
  if (!redisClient.isOpen) {
    redisClient.connect();
  }
  // check uuid and check sendids on redis to verify sent ids to avoid duplicate values sent to the user
  const uuid = cookies().get("uuid")?.value.split("-").pop();
  const members = await redisClient.sMembers(`sent_ids:${uuid}`);
  const numberIds = members.map((member) => Number(member));

  let randomItems = await db.query.menuItems.findMany({
    orderBy: sql`RANDOM()`,
    columns: { brandId: false, categoryId: false },
    where: members.length > 0 ? notInArray(menuItems.id, numberIds) : undefined,
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
    await redisClient.del("sent_ids:23g4");
    // fetch a new set of randomItems
    randomItems = await db.query.menuItems.findMany({
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

  const toBeCachedSentIds = randomItems.map((item) => item.id.toString());
  if (toBeCachedSentIds.length > 0) {
    await redisClient.sAdd(`sent_ids:${uuid}`, toBeCachedSentIds);
  }

  redisClient.expire(`sent_ids:${uuid}`, 600);
  redisClient.quit();

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
  const cleanedItemData = randomItems.map((rand) => {
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
    // rand.price = Number(rand.price);
    let { sizes, ...rest } = rand;
    return rest;
  });

  // console.log(cleanedItemData);

  return cleanedItemData;
}
