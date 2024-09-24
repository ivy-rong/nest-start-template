/*
  Warnings:

  - You are about to drop the column `site_name` on the `Blogs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `Blogs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "site_name",
ADD COLUMN     "path" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Blogs_path_key" ON "Blogs"("path");
