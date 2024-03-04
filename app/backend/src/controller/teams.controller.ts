import { Request, Response } from 'express';
import teamsService from '../service/teams.service';

const getAllTeams = async (req: Request, res: Response) => {
  const teams = await teamsService.getAllTeams();
  res.status(200).json(teams);
};

const findTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await teamsService.findTeamById(Number(id));
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.status(200).json(team);
};

export default {
  getAllTeams,
  findTeamById,
};
