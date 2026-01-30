/*
  Warnings:

  - You are about to drop the column `deleted` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notes" DROP COLUMN "deleted",
DROP COLUMN "published";
