-- CreateEnum
CREATE TYPE "AuthTypeEnum" AS ENUM ('USER', 'COOGLE', 'GITHUB');

-- CreateTable
CREATE TABLE "system_auth" (
    "id" SERIAL NOT NULL,
    "auth_type" "AuthTypeEnum" NOT NULL DEFAULT 'USER',
    "open_id" VARCHAR(100) NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "expires_in" INTEGER,
    "data" JSON,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blogs" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "image" VARCHAR(255) NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "date" TIMESTAMPTZ(3),
    "catalogue" VARCHAR(255),
    "text" VARCHAR,
    "seo_id" INTEGER NOT NULL,
    "site_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_dictionary_item" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "remark" VARCHAR(500),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "dictionary_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_dictionary_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_dictionary" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "remark" VARCHAR(500),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_dictionary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_json" (
    "id" SERIAL NOT NULL,
    "json" VARCHAR,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_json_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_role" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "remark" VARCHAR(500),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seo" (
    "id" SERIAL NOT NULL,
    "keywords" VARCHAR(50),
    "description" VARCHAR(500),
    "title" VARCHAR(50),
    "h1" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "Seo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_type" (
    "id" SERIAL NOT NULL,
    "site_type" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "site_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_user_role" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "nick_name" VARCHAR(50),
    "password" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(25),
    "email" VARCHAR(50),
    "avatar_url" VARCHAR(100),
    "gender" VARCHAR(50),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_auth_auth_type_open_id_key" ON "system_auth"("auth_type", "open_id");

-- CreateIndex
CREATE UNIQUE INDEX "Blogs_path_key" ON "Blogs"("path");

-- CreateIndex
CREATE UNIQUE INDEX "system_dictionary_code_key" ON "system_dictionary"("code");

-- CreateIndex
CREATE UNIQUE INDEX "system_role_code_key" ON "system_role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "site_type_site_type_key" ON "site_type"("site_type");

-- CreateIndex
CREATE UNIQUE INDEX "system_user_username_key" ON "system_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "system_user_phone_number_key" ON "system_user"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "system_user_email_key" ON "system_user"("email");

-- AddForeignKey
ALTER TABLE "system_auth" ADD CONSTRAINT "system_auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "system_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_seo_id_fkey" FOREIGN KEY ("seo_id") REFERENCES "Seo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_site_type_id_fkey" FOREIGN KEY ("site_type_id") REFERENCES "site_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_dictionary_item" ADD CONSTRAINT "system_dictionary_item_dictionary_id_fkey" FOREIGN KEY ("dictionary_id") REFERENCES "system_dictionary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_user_role" ADD CONSTRAINT "system_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "system_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_user_role" ADD CONSTRAINT "system_user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "system_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
