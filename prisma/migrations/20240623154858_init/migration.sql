-- CreateTable
CREATE TABLE "system_user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "nick_name" VARCHAR(50),
    "password" VARCHAR(100) NOT NULL,
    "avatar_url" VARCHAR(100),
    "gender" VARCHAR(50),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "access_token" TEXT,
    "refresh_token" TEXT,

    CONSTRAINT "system_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_role" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "remark" VARCHAR(500),
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "system_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_user_username_key" ON "system_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "system_role_code_key" ON "system_role"("code");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "system_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "system_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
