import { Request, Response } from 'express';
import leaderBoard from '../service/leaderboard.service';

const leaderboard = async (_req: Request, res: Response) => {
  const result = await leaderBoard.createLeaderboard();
  return res.status(200).json(result);
};

export default { leaderboard };
