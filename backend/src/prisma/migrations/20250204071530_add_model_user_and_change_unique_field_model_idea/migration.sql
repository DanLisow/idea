/*
  Warnings:

  - A unique constraint covering the columns `[nick]` on the table `Idea` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Idea_name_key";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nick_key" ON "User"("nick");

-- CreateIndex
CREATE UNIQUE INDEX "Idea_nick_key" ON "Idea"("nick");
