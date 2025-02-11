/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Idea` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Idea_nick_key";

-- CreateIndex
CREATE UNIQUE INDEX "Idea_name_key" ON "Idea"("name");
