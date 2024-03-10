import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';

const getAllMatches = async () => Matches.findAll();
const getAllTeams = async () => Teams.findAll();

const getMatchesAndTeams = async () => {
  const allMatches = await getAllMatches();
  const allTeams = await getAllTeams();

  const matchesAndTeams = allMatches.map((match) => {
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
  return matchesAndTeams;
};

const getInProgressMatches = async (status: boolean) => {
  let inProgressMatches;
  if (status === true || status === false) {
    const matchesAndTeams = await getMatchesAndTeams();
    inProgressMatches = matchesAndTeams.filter((match) => match.inProgress === (status === true));
  } else {
    inProgressMatches = await Matches.findAll();
  }
  return inProgressMatches;
};

const changeMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => Matches
  .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

const endMatch = async (id: number) => Matches.update({ inProgress: false }, { where: { id } });

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
  const id = (await Matches.findAll()).length + 1;
  // const id = getAllMatchesFromDB.length + 1;
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
  getMatchesAndTeams,
  getInProgressMatches,
  endMatch,
  changeMatch,
  addMatch,
};
