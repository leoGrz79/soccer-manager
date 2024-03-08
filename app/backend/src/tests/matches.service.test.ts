import * as sinon from 'sinon';
import { expect } from 'chai';
import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';
import getMatchesAndTeams from '../service/matches.service';
import { getAllMatchesStubReturn, getAllTeamsStubReturn, matchesAndTeamsStubReturn } from './allMocks';

describe('MATCHES SERVICE', () => {
  afterEach(() => {
    sinon.restore();
  });

  beforeEach(() => {
    sinon.restore();
  });
  describe('Tests the getMatchesAndTeams function', () => {
    it('Should return all matches and teams', async () => {
      const matches: any = getAllMatchesStubReturn;
      const teams: any = getAllTeamsStubReturn;

      sinon.stub(Matches, 'findAll').resolves(matches);
      sinon.stub(Teams, 'findAll').resolves(teams);

      const matchesAndTeams = await getMatchesAndTeams.getMatchesAndTeams();
      expect(matchesAndTeams).to.have.lengthOf(1);
      expect(matchesAndTeams).to.be.deep.equal(matchesAndTeamsStubReturn);
    });
  });
});

