import { Router } from 'express';
import { recordWin, getLeaderboard } from '../controllers/game.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { recordGameResultSchema } from '../validators/game.schema';


export const gameRoutes = () => {
    const router = Router();

    router.post('/games', validateRequest(recordGameResultSchema), recordWin);
    router.get('/leaderboard', getLeaderboard);

    return router;
};