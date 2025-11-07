/*
  Warnings:

  - Changed the type of `type` on the `Move` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Move` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PokemonType" AS ENUM ('normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy');

-- CreateEnum
CREATE TYPE "MoveCategory" AS ENUM ('physical', 'special', 'status');

-- AlterTable
ALTER TABLE "Move" DROP COLUMN "type",
ADD COLUMN     "type" "PokemonType" NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "MoveCategory" NOT NULL;

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "type",
ADD COLUMN     "type" "PokemonType" NOT NULL;
