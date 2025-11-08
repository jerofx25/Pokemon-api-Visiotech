-- CreateEnum
CREATE TYPE "BattleStatus" AS ENUM ('pending', 'in_progress', 'finished');

-- CreateTable
CREATE TABLE "Battle" (
    "id" SERIAL NOT NULL,
    "pokemonAId" INTEGER NOT NULL,
    "pokemonBId" INTEGER NOT NULL,
    "hpA" INTEGER NOT NULL,
    "hpB" INTEGER NOT NULL,
    "turn" INTEGER NOT NULL DEFAULT 1,
    "currentAttackerId" INTEGER NOT NULL,
    "status" "BattleStatus" NOT NULL DEFAULT 'in_progress',
    "winnerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattleTurn" (
    "id" SERIAL NOT NULL,
    "battleId" INTEGER NOT NULL,
    "turnNumber" INTEGER NOT NULL,
    "attackerId" INTEGER NOT NULL,
    "defenderId" INTEGER NOT NULL,
    "moveId" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "effectiveness" DOUBLE PRECISION NOT NULL,
    "randomRoll" INTEGER NOT NULL,
    "defenderHpAfter" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BattleTurn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_pokemonAId_fkey" FOREIGN KEY ("pokemonAId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_pokemonBId_fkey" FOREIGN KEY ("pokemonBId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleTurn" ADD CONSTRAINT "BattleTurn_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleTurn" ADD CONSTRAINT "BattleTurn_attackerId_fkey" FOREIGN KEY ("attackerId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleTurn" ADD CONSTRAINT "BattleTurn_defenderId_fkey" FOREIGN KEY ("defenderId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleTurn" ADD CONSTRAINT "BattleTurn_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
