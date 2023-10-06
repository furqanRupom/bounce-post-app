/*
  Warnings:

  - You are about to alter the column `date` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Made the column `date` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" SET DATA TYPE VARCHAR(255);
