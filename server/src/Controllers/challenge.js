import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function createChallenge(req, res) {
    try {
        const { challengerId, opponentId } = await req.body;
        console.log("Creating challenge...");

        if (!challengerId || !opponentId) {
            console.error("Missing required fields");
            return res.status(400).json({ error: "Missing required fields", success: false });
        }

        const challenge = await prisma.challenge.create({
            data: {
                challengerId,
                opponentId,
                status: "pending"
            }
        });

        return res.status(201).json({ challenge, success: true });

    } catch (error) {
        console.error("Error creating challenge:", error);
        return res.status(500).json({ error, success: false });
    }
}


export async function getChallenges(req, res) {
    try {
        console.log("Getting challenges...");
        userId = req.user.id;
        const challenges = await prisma.challenge.findMany({
            where: {
                OR: [
                    { challengerId: userId },
                    { opponentId: userId }
                ]
            }
        });
        return res.status(200).json({ challenges, success: true });
    } catch (error) {
        console.error("Error getting challenges:", error);
        return res.status(500).json({ error, success: false });
    }
}

export async function acceptChallenge(req, res) {
    try {
        console.log("Accepting challenge...");
        const { challengeId } = await req.body;
        const challenge = await prisma.challenge.update({
            where: { id: challengeId },
            data: { status: "accepted" }
        });
        return res.status(200).json({ challenge, success: true });
    } catch (error) {
        console.error("Error accepting challenge:", error);
        return res.status(500).json({ error, success: false });
    }
}

export async function rejectChallenge(req, res) {
    try {
        console.log("Rejecting challenge...");
        const { challengeId } = await req.body;
        const challenge = await prisma.challenge.update({
            where: { id: challengeId },
            data: { status: "rejected" }
        });
        return res.status(200).json({ challenge, success: true });
    } catch (error) {
        console.error("Error rejecting challenge:", error);
        return res.status(500).json({ error, success: false });
    }
}