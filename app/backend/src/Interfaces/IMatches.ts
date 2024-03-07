export interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchesAndTeams {
  id: number | undefined,
  homeTeamId: string | undefined,
  homeTeamGoals: number,
  awayTeamId: string | undefined,
  awayTeamGoals: number | undefined,
  inProgress: boolean | undefined,
  homeTeam: {
    teamName: string | undefined,
  },
  awayTeam: {
    teamName: string | undefined,
  },
}
