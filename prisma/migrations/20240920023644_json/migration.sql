/*
  Warnings:

  - You are about to drop the column `description` on the `system_json` table. All the data in the column will be lost.
  - You are about to drop the column `h1` on the `system_json` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `system_json` table. All the data in the column will be lost.
  - You are about to drop the column `site_name` on the `system_json` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `system_json` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "system_json" DROP COLUMN "description",
DROP COLUMN "h1",
DROP COLUMN "keywords",
DROP COLUMN "site_name",
DROP COLUMN "title",
ADD COLUMN     "json" VARCHAR;
