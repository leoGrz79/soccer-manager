import { Request, Response } from 'express';
import matchesService from '../service/matches.service';

const TOKEN_MUST_BE_VALID = 'Token must be a valid token';

const getAllMatches = async (req: Request, res: Response) => {
  try {
    const matches = await matchesService.getAllMatches();
    return res.status(200).json(matches);
  } catch (error) {
    return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
  }
};

const getAllMatchesAndTeams = async (req: Request, res: Response) => {
  try {
    const matchesAndTeams = await matchesService.getMatchesAndTeams();
    return res.status(200).json(matchesAndTeams);
  } catch (error) {
    return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
  }
};

export default {
  getAllMatches,
  getAllMatchesAndTeams,
};
