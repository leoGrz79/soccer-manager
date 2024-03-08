import { Request, Response } from 'express';
import matchesService from '../service/matches.service';

const TOKEN_MUST_BE_VALID = 'Token must be a valid token';

const getInProgressMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress !== undefined) {
    try {
      const inProgressMatches = await matchesService.getInProgressMatches(inProgress as string);
      return res.status(200).json(inProgressMatches);
    } catch (error) {
      return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
    }
  } else {
    try {
      const matchesAndTeams = await matchesService.getMatchesAndTeams();
      return res.status(200).json(matchesAndTeams);
    } catch (error) {
      return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
    }
  }
};

export default {
  getInProgressMatches,
};
