import {
  pgTable,
  unique,
  pgEnum,
  integer,
  varchar,
  text,
  foreignKey,
  numeric,
  bigint,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);

export const categories = pgTable(
  "categories",
  {
    id: integer("id").primaryKey().notNull(),
    name: varchar("name").notNull(),
  },
  (table) => {
    return {
      categoriesNameKey: unique("categories_name_key").on(table.name),
    };
  }
);

export const brands = pgTable(
  "brands",
  {
    id: integer("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    logo: text("logo").notNull(),
  },
  (table) => {
    return {
      brandsNameKey: unique("brands_name_key").on(table.name),
    };
  }
);

export const menuItems = pgTable(
  "menu_items",
  {
    id: integer("id").primaryKey().notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    price: numeric("price", { precision: 10, scale: 2 }),
    imageLink: text("image_link").notNull(),
    categoryId: integer("category_id").references(() => categories.id),
    brandId: integer("brand_id")
      .notNull()
      .references(() => brands.id),
  },
  (table) => {
    return {
      itemsImageLinkKey: unique("items_image_link_key").on(table.imageLink),
    };
  }
);

export const sizes = pgTable(
  "sizes",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    type: varchar("type").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    itemId: integer("item_id")
      .notNull()
      .references(() => menuItems.id),
  },
  (table) => {
    return {
      sizeTypeKey: unique("size_type_key").on(table.type),
    };
  }
);

export const brandsCategories = pgTable(
  "brands_categories",
  {
    brandId: integer("brand_id")
      .notNull()
      .references(() => brands.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (table) => {
    return {
      brandsCategoriesPkey: primaryKey({
        columns: [table.brandId, table.categoryId],
        name: "brands_categories_pkey",
      }),
    };
  }
);
