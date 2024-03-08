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

const endMatch = async (id: number) => {
  const match = await Matches.update({ inProgress: false }, { where: { id } });
  return match;
};

const changeMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
  const match = await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return match;
};

const checkTeams = async (homeTeamId: number, awayTeamId: number) => {
  if (homeTeamId === awayTeamId) {
    return { status: 422, message: 'It is not possible to create a match with two equal teams' };
  }
  const homeTeam = await Teams.findOne({ where: { id: homeTeamId } });
  const awayTeam = await Teams.findOne({ where: { id: awayTeamId } });
  if (!homeTeam || !awayTeam) {
    return { status: 404, message: 'There is no team with such id!' };
  }
  return { status: 201 };
};

const addMatch = async (
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const { status, message } = await checkTeams(homeTeamId, awayTeamId);
  const getAllMatchesFromDB = await Matches.findAll();
  const id = getAllMatchesFromDB.length + 1;
  const match = await Matches.create({
    id,
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });
  if (status !== 201) return { status, message };
  return { status: 201, match };
};

export default {
  getAllMatches,
  getMatchesAndTeams,
  getInProgressMatches,
  endMatch,
  changeMatch,
  addMatch,
};
