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