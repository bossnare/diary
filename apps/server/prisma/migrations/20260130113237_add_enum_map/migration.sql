/*
  Warnings:

  - The values [DRAFT,PUBLISHED,TRASHED] on the enum `NoteStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [USER,ADMIN,DEV] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NoteStatus_new" AS ENUM ('draft', 'published', 'trashed');
ALTER TABLE "public"."notes" ALTER COLUMN "note_status" DROP DEFAULT;
ALTER TABLE "notes" ALTER COLUMN "note_status" TYPE "NoteStatus_new" USING ("note_status"::text::"NoteStatus_new");
ALTER TYPE "NoteStatus" RENAME TO "NoteStatus_old";
ALTER TYPE "NoteStatus_new" RENAME TO "NoteStatus";
DROP TYPE "public"."NoteStatus_old";
ALTER TABLE "notes" ALTER COLUMN "note_status" SET DEFAULT 'draft';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('user', 'admin', 'dev');
ALTER TABLE "public"."profiles" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "profiles" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "profiles" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterTable
ALTER TABLE "notes" ALTER COLUMN "note_status" SET DEFAULT 'draft';

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "role" SET DEFAULT 'user';
