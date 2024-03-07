import Matches from '../database/models/matches.model';

const getAllMatches = async () => {
  const allMatches = await Matches.findAll();
  return allMatches;
};

export default {
  getAllMatches,
};
