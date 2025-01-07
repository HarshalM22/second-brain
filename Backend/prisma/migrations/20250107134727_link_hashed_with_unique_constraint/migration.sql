/*
  Warnings:

  - You are about to drop the column `link` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hash]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "link",
DROP COLUMN "title",
ADD COLUMN     "hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Link_hash_key" ON "Link"("hash");
