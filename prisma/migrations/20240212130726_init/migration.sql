/*
  Warnings:

  - You are about to drop the column `hasAir` on the `Car` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "doors" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "carChange" TEXT NOT NULL,
    "link" TEXT NOT NULL
);
INSERT INTO "new_Car" ("carChange", "color", "doors", "id", "link", "model", "name", "type") SELECT "carChange", "color", "doors", "id", "link", "model", "name", "type" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
