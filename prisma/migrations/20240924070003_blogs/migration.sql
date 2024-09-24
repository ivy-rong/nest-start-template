/*
  Warnings:

  - Added the required column `site_type_id` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "site_type_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "site_type" (
    "id" SERIAL NOT NULL,
    "site_type" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "site_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_site_type_id_fkey" FOREIGN KEY ("site_type_id") REFERENCES "site_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
