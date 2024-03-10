import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';

const points = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals === awayTeamGoals) return 1;
  if (homeTeamGoals > awayTeamGoals) return 3;
  return 0;
};

const allTeamsGames = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals === awayTeamGoals) return 1;
  if (homeTeamGoals > awayTeamGoals) return 1;
  return 0;
};

const teamWinnings = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals > awayTeamGoals) return 1;
  return 0;
};

const teamDraws = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals === awayTeamGoals) return 1;
  return 0;
};

const teamLosses = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals < awayTeamGoals) return 1;
  return 0;
};

const goalsPro = (homeTeamGoals: number, _awayTeamGoals: number) => homeTeamGoals;
const goalsTaken = (_homeTeamGoals: number, awayTeamGoals: number) => awayTeamGoals;

const createLeaderboard = async () => {
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allTeams = await Teams.findAll();

  const matches = allMatches.map((match) => {
    const homeTeam = allTeams.find((team) => team.id === match.homeTeamId);
    return {
      name: homeTeam?.teamName,
      totalPoints: points(match.homeTeamGoals, match.awayTeamGoals),
      totalGames: allTeamsGames(match.homeTeamGoals, match.awayTeamGoals),
      totalVictories: teamWinnings(match.homeTeamGoals, match.awayTeamGoals),
      totalDraws: teamDraws(match.homeTeamGoals, match.awayTeamGoals),
      totalLosses: teamLosses(match.homeTeamGoals, match.awayTeamGoals),
      goalsFavor: goalsPro(match.homeTeamGoals, match.awayTeamGoals),
      goalsOwn: goalsTaken(match.homeTeamGoals, match.awayTeamGoals),
    };
  });
  return matches;
};

export default { createLeaderboard };
