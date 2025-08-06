-- CreateEnum
CREATE TYPE "public"."GameStatus" AS ENUM ('waiting', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "public"."ChallengeStatus" AS ENUM ('pending', 'accepted', 'declined');

-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GameSession" (
    "id" UUID NOT NULL,
    "playerWhiteId" UUID,
    "playerBlackId" UUID,
    "winnerId" UUID,
    "isAiGame" BOOLEAN NOT NULL DEFAULT false,
    "isOffline" BOOLEAN NOT NULL DEFAULT false,
    "status" "public"."GameStatus" NOT NULL DEFAULT 'waiting',
    "pgn" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Move" (
    "id" SERIAL NOT NULL,
    "gameId" UUID NOT NULL,
    "moveNumber" INTEGER NOT NULL,
    "notation" TEXT NOT NULL,
    "fenAfterMove" TEXT,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Challenge" (
    "id" UUID NOT NULL,
    "challengerId" UUID NOT NULL,
    "opponentId" UUID NOT NULL,
    "status" "public"."ChallengeStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "public"."Profile"("username");

-- AddForeignKey
ALTER TABLE "public"."GameSession" ADD CONSTRAINT "GameSession_playerWhiteId_fkey" FOREIGN KEY ("playerWhiteId") REFERENCES "public"."Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GameSession" ADD CONSTRAINT "GameSession_playerBlackId_fkey" FOREIGN KEY ("playerBlackId") REFERENCES "public"."Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GameSession" ADD CONSTRAINT "GameSession_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "public"."Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Move" ADD CONSTRAINT "Move_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Challenge" ADD CONSTRAINT "Challenge_challengerId_fkey" FOREIGN KEY ("challengerId") REFERENCES "public"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Challenge" ADD CONSTRAINT "Challenge_opponentId_fkey" FOREIGN KEY ("opponentId") REFERENCES "public"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
