import { Request, Response } from 'express';
import teamsService from '../service/teams.service';

const getAllTeams = async (req: Request, res: Response) => {
  const teams = await teamsService.getAllTeams();
  res.status(200).json(teams);
};

export default {
  getAllTeams,
};
