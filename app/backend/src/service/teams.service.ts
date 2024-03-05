import ITeams from '../Interfaces/ITeams';
import Teams from '../database/models/teams.model';

const getAllTeams = async ():Promise<ITeams[]> => {
  const allTeams = await Teams.findAll();
  return allTeams;
};

const findTeamById = async (id: number):Promise<ITeams | null> => {
  const team = await Teams.findOne({ where: { id } });
  // const team = await Teams.findByPk(id); // changed due to TypeError: Attempted to wrap findByPk which is already wrapped
  return team;
};

export default {
  getAllTeams,
  findTeamById,
};
