-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "local" TEXT NOT NULL,
    "locatedAt" DATETIME NOT NULL,
    "devolutionTime" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Rent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "doors" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "carChange" TEXT NOT NULL,
    "hasAir" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
