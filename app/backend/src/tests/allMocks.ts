export const getAllTeamsStubReturn = [
  {
    id: 1,
    teamName: 'Xablau Futebol Clube',
  },
  {
    id: 2,
    teamName: 'Patos Ninjas Adolescentes Mutantes Futebol Clube',
  },
];

export const findTeamByIdStubReturn = {
  id: 1,
  teamName: 'Xablau Futebol Clube',
};

export const authValidStubReturn = {
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  // senha: secret_user
};

export const authInvalidStubReturn = {
  username: 'User',
  role: 'user',
  email: '@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  // senha: secret_user
};

export const roleStubReturn = {
  username: 'user',
  role: 'role'
}

export const getAllMatchesAndTeamsStubReturn = [

  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
];

export const getAllMatchesStubReturn = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: { teamName: 'Team 1' },
    awayTeam: { teamName: 'Team 2' },
  }
]

export const matchesAndTeamsStubReturn = [
  {
    id: 1,
    homeTeamId: undefined,
    homeTeamGoals: 1,
    awayTeamId: undefined,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: undefined
    },
    awayTeam: {
      teamName: undefined
    }
  },
]

