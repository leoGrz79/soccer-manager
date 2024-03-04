import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import teamsService from '../service/teams.service';
import Teams from '../database/models/teams.model';
// import ITeams from '../Interfaces/ITeams';
import { getAllTeamsStubReturn } from './allMocks';

describe('SERVICES', () => {
  describe('Tests the getAllTeams function (Service)', () => {
    it('Should return 2 teams (Xablau FC e Patos Ninjas Adolescentes Mutantes Futebol Clube', async () => {
      const geatAllTeamsStub: any = sinon.stub(Teams, 'findAll').resolves(getAllTeamsStubReturn as unknown as []);
      const result = await teamsService.getAllTeams();
      expect(result).to.deep.equal(getAllTeamsStubReturn);
      geatAllTeamsStub.restore();
    });
  });
});