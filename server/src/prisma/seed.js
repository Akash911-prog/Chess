import { PrismaClient, GameStatus, ChallengeStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Seeding database...")

    // Create Profiles
    const alice = await prisma.profile.create({
        data: {
            username: "alice123"
        }
    })

    const bob = await prisma.profile.create({
        data: {
            username: "bob456"
        }
    })

    const aiProfile = await prisma.profile.create({
        data: {
            username: "ai_bot"
        }
    })

    // Create Challenge: Alice → Bob
    await prisma.challenge.create({
        data: {
            challengerId: alice.id,
            opponentId: bob.id,
            status: ChallengeStatus.pending
        }
    })

    // Create GameSession: Alice (white) vs Bob (black), Alice wins
    const game1 = await prisma.gameSession.create({
        data: {
            playerWhiteId: alice.id,
            playerBlackId: bob.id,
            winnerId: alice.id,
            status: GameStatus.completed,
            isAiGame: false,
            isOffline: false,
            pgn: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6",
            endedAt: new Date(),
            moves: {
                create: [
                    { moveNumber: 1, notation: "e4" },
                    { moveNumber: 2, notation: "e5" },
                    { moveNumber: 3, notation: "Nf3" },
                    { moveNumber: 4, notation: "Nc6" },
                    { moveNumber: 5, notation: "Bb5" },
                    { moveNumber: 6, notation: "a6" }
                ]
            }
        }
    })

    // Create GameSession: Bob vs AI, ongoing
    const game2 = await prisma.gameSession.create({
        data: {
            playerWhiteId: bob.id,
            playerBlackId: aiProfile.id,
            status: GameStatus.in_progress,
            isAiGame: true,
            isOffline: false
        }
    })

    // Create GameSession: Offline game
    const game3 = await prisma.gameSession.create({
        data: {
            status: GameStatus.waiting,
            isOffline: true,
            isAiGame: false
        }
    })

    console.log("✅ Seed completed.")
}

main()
    .catch(e => {
        console.error("❌ Seed failed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
