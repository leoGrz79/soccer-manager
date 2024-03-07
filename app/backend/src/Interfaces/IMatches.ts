export interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchesAndTeams {
  id: number,
  homeTeamId: number | undefined,
  homeTeamGoals: number,
  awayTeamId: number | undefined,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: {
    teamName: string | undefined,
  },
  awayTeam: {
    teamName: string | undefined,
  },
}
