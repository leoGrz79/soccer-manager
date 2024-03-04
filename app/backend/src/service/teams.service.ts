import ITeams from '../Interfaces/ITeams';
import Teams from '../database/models/teams.model';

const getAllTeams = async ():Promise<ITeams[]> => {
  const allTeams = await Teams.findAll();
  return allTeams;
};

const findTeamById = async (id: number):Promise<ITeams | null> => {
  const team = await Teams.findByPk(id);
  return team?.dataValues || null;
};

export default {
  getAllTeams,
  findTeamById,
};
