/*
  Warnings:

  - You are about to drop the column `description` on the `channels` table. All the data in the column will be lost.
  - Added the required column `position` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "channels" DROP COLUMN "description",
ADD COLUMN     "parent_id" TEXT,
ADD COLUMN     "position" INTEGER NOT NULL,
ADD COLUMN     "topic" TEXT,
ADD COLUMN     "type" INTEGER NOT NULL DEFAULT 0;
