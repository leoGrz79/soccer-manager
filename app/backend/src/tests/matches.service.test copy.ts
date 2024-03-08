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

      const findAllMatchesStub: any = sinon.stub(Matches, 'findAll').resolves(matches);
      const findAllTeamsStub: any = sinon.stub(Teams, 'findAll').resolves(teams);
      const expectedReturn = matchesAndTeamsStubReturn;

      const result = await getMatchesAndTeams.getMatchesAndTeams();

      expect(result).to.deep.equal(expectedReturn);
      findAllMatchesStub.restore();
      findAllTeamsStub.restore();
    });
  });
});
