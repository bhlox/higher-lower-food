ALTER TABLE "menu_items" DROP CONSTRAINT "menu_items_brand_id_brands_id_fk";
--> statement-breakpoint
ALTER TABLE "sizes" DROP CONSTRAINT "sizes_item_id_menu_items_id_fk";
--> statement-breakpoint
ALTER TABLE "brands_categories" DROP CONSTRAINT "brands_categories_brand_id_brands_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sizes" ADD CONSTRAINT "sizes_item_id_menu_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "menu_items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "brands_categories" ADD CONSTRAINT "brands_categories_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
