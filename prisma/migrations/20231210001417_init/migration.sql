/*
  Warnings:

  - You are about to drop the column `local` on the `Rent` table. All the data in the column will be lost.
  - Added the required column `carId` to the `Rent` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Locals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aeroport1" TEXT NOT NULL,
    "aeroport2" TEXT NOT NULL,
    "aeroport3" TEXT NOT NULL,
    "busStation" TEXT NOT NULL,
    "busStation2" TEXT NOT NULL,
    "busStation3" TEXT NOT NULL,
    "busStation4" TEXT NOT NULL,
    "localId" INTEGER NOT NULL,
    CONSTRAINT "Locals_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Rent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "locatedAt" DATETIME NOT NULL,
    "devolutionTime" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    CONSTRAINT "Rent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rent_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rent" ("devolutionTime", "id", "locatedAt", "userId") SELECT "devolutionTime", "id", "locatedAt", "userId" FROM "Rent";
DROP TABLE "Rent";
ALTER TABLE "new_Rent" RENAME TO "Rent";
CREATE UNIQUE INDEX "Rent_carId_key" ON "Rent"("carId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
