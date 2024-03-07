import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';
import ITeams from '../Interfaces/ITeams';
import { IMatchesAndTeams } from '../Interfaces/IMatches';

const getAllMatches = async () => {
  const allMatches = await Matches.findAll();
  return allMatches;
};

const getAllTeams = async ():Promise<ITeams[]> => {
  const allTeams = await Teams.findAll();
  return allTeams;
};

const getMatchesAndTeams = async ():Promise<IMatchesAndTeams[]> => {
  const allMatches = await getAllMatches();
  const allTeams = await getAllTeams();

  const MatchesAndTeams = allMatches.map((match) => {
    const homeTeam = allTeams.find((team) => team.id === match.homeTeamId);
    const awayTeam = allTeams.find((team) => team.id === match.awayTeamId);
    return {
      id: match.id,
      homeTeamId: homeTeam?.id,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: awayTeam?.id,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: { teamName: homeTeam?.teamName },
      awayTeam: { teamName: awayTeam?.teamName },
    };
  });
  return MatchesAndTeams;
};

export default {
  getAllMatches,
  getMatchesAndTeams,
};
