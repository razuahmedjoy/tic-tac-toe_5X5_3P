import prisma from "../../config/prisma.client";

export const recordGameResult = async (winner: string, players: string[]) => {
    return await prisma.gameResult.create({
        data: { winner, players }
    });
};

export const getLeaderboard = async () => {
    return await prisma.gameResult.findMany({
        orderBy: { createdAt: 'desc' },
        select: { id: true, winner: true, players: true, createdAt: true }
    });
};