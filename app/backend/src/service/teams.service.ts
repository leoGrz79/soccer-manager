import ITeams from '../Interfaces/ITeams';
import Teams from '../database/models/teams.model';

const getAllTeams = async ():Promise<ITeams[]> => {
  const allTeams = await Teams.findAll();
  return allTeams;
};

export default {
  getAllTeams,
};
