/*
  Warnings:

  - A unique constraint covering the columns `[site_type]` on the table `site_type` will be added. If there are existing duplicate values, this will fail.
  - Made the column `site_type` on table `site_type` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "site_type" ALTER COLUMN "site_type" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "site_type_site_type_key" ON "site_type"("site_type");
