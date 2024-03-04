import { Request, Response } from 'express';
import teamsService from '../service/teams.service';

const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await teamsService.getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    if (!(error instanceof Error)) return;
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllTeams,
};
