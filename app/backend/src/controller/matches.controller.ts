import { Request, Response } from 'express';
import matchesService from '../service/matches.service';

const TOKEN_MUST_BE_VALID = 'Token must be a valid token';

const getInProgressMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (!inProgress) {
    const result = await matchesService.getMatchesAndTeams();
    return res.status(200).json(result);
  }
  const convert = inProgress === 'true';
  const inProgressMatches = await matchesService.getInProgressMatches(convert);
  return res.status(200).json(inProgressMatches);
};

const endMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await matchesService.endMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  } catch (error) {
    return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
  }
};

const changeMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  try {
    await matchesService.changeMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Match changed' });
  } catch (error) {
    return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
  }
};

const addMatch = async (req: Request, res: Response) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

  try {
    const { status, message, match } = await matchesService
      .addMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    if (message) return res.status(status).json({ message });
    return res.status(201).json(match);
  } catch (e) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
};

export default {
  getInProgressMatches,
  endMatch,
  changeMatch,
  addMatch,
};
