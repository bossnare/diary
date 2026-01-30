/*
  Warnings:

  - You are about to drop the column `note_status` on the `notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notes" DROP COLUMN "note_status",
ADD COLUMN     "status" "NoteStatus" NOT NULL DEFAULT 'draft';
