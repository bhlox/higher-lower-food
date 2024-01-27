import {
  pgTable,
  bigint,
  varchar,
  serial,
  numeric,
  text,
  integer,
  primaryKey,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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

export const brandsRelations = relations(brands, ({ many }) => ({
  menuItems: many(menuItems),
}));

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

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
  brand: one(brands, {
    fields: [menuItems.brandId],
    references: [brands.id],
  }),
  category: one(categories, {
    fields: [menuItems.categoryId],
    references: [categories.id],
  }),
  sizes: many(sizes),
}));

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
      sizesTypeKey: unique("size_type_key").on(table.type),
    };
  }
);

export const sizesRelations = relations(sizes, ({ one }) => ({
  menuItem: one(menuItems, {
    fields: [sizes.itemId],
    references: [menuItems.id],
  }),
}));

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

// #BUG: $infertInsert method is currently buggy. auto generated fields are still being required. consulted with the drizzle AI chatbot and it has something to do with the drizzle-orm version. for now do the typing yourself LOL or change to any type. use the typescript ignore utils for further use
export type Category = typeof categories.$inferSelect;
export type NewCategory = string; //  typeof categories.$inferInsert;

export type MenuItem = typeof menuItems.$inferSelect;
export type NewMenuItem = {
  price: string | null;
  brandId: number;
  categoryId: number | null;
  title: string;
  imageLink: string;
};

export type Brand = typeof brands.$inferSelect;
export type NewBrand = { name: string; logo: string };

export type Size = typeof sizes.$inferSelect;
export type NewSize = { price: string; type: string; itemId: number };
