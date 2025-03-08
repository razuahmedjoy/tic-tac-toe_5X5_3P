import { z } from 'zod';

export const recordGameResultSchema = z.object({
    winner: z.string(),
    players: z.array(z.string())
});