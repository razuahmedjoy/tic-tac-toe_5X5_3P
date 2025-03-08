import { Request, Response } from 'express';
import { recordGameResult, getLeaderboard as fetchLeaderboard } from '../services/game.service';

export const recordWin = async (req: Request, res: Response) => {
    try {
        const { winner, players } = req.body;
        const result = await recordGameResult(winner, players);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error recording game result' });
    }
};

export const getLeaderboard = async (req: Request, res: Response) => {
    try {
        const results = await fetchLeaderboard();
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard' });
    }
};