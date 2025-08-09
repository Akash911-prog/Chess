import { PrismaClient } from "@prisma/client";
import { getSocketId } from "../libs/onlineUsers";

const prisma = new PrismaClient();

export async function lobbySocketHandler(socket, io) {
    socket.on('createChallenge', async (opponentId) => {
        try {
            const challenge = await prisma.challenge.create({
                data: {
                    challengerId: socket.userId,
                    opponentId
                }
            });

            const opponentSocket = getSocketId(opponentId);
            if (opponentSocket) {
                io.to(opponentSocket).emit('challengeRecieved', challenge);
            }
        } catch (error) {
            console.error("Error creating challenge:", error);
        }
    })

    socket.on('acceptChallenge', async (challengeId) => {
        try {
            const challenge = await prisma.challenge.update({
                where: { id: challengeId },
                data: { status: "accepted" }
            });

            const gameSession = prisma.gameSession.create({
                data: {
                    playerWhiteId: challenge.challengerId,
                    playerBlackId: challenge.opponentId,
                    isAiGame: false,
                    isOffline: false,
                    status: "in_progress",
                }
            })

            const opponentSocket = getSocketId(challenge.opponentId);
            if (opponentSocket) {
                io.to(opponentSocket).emit('challengeAccepted', (challenge, gameSession));
            }

        } catch (error) {
            console.error("Error accepting challenge:", error);
        }
    })

    socket.on("rejectChallenge", async (challengeId) => {
        try {
            const challenge = await prisma.challenge.delete({
                where: { id: challengeId }
            })

            const opponentSocket = getSocketId(challenge.opponentId);
            if (opponentSocket) {
                io.to(opponentSocket).emit('challengeRejected', challenge);
            }
        } catch (error) {
            console.error("Error rejecting challenge:", error);
        }
    })
}