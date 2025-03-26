-- CreateEnum
CREATE TYPE "CupcakeRating" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- CreateTable
CREATE TABLE "PastryChef" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PastryChef_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cupcake" (
    "id" TEXT NOT NULL,
    "rating" "CupcakeRating" NOT NULL,
    "name" TEXT NOT NULL,
    "description" JSONB,
    "imageUrl" TEXT NOT NULL,
    "pastryChefId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cupcake_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cupcake" ADD CONSTRAINT "Cupcake_pastryChefId_fkey" FOREIGN KEY ("pastryChefId") REFERENCES "PastryChef"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
