import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';

const getAllMatches = async () => {
  const allMatches = await Matches.findAll();
  return allMatches;
};

const getAllTeams = async () => {
  const allTeams = await Teams.findAll();
  return allTeams;
};

const getMatchesAndTeams = async () => {
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

const getInProgressMatches = async (status: string) => {
  let inProgressMatches;
  if (status === 'true' || status === 'false') {
    const matchesAndTeams = await getMatchesAndTeams();
    inProgressMatches = matchesAndTeams.filter((match) => match.inProgress === (status === 'true'));
  } else {
    inProgressMatches = await Matches.findAll();
  }
  return inProgressMatches;
};

export default {
  getAllMatches,
  getMatchesAndTeams,
  getInProgressMatches,
};
