import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import teamsService from '../service/teams.service';
import Teams from '../database/models/teams.model';
import { getAllTeamsStubReturn, findTeamByIdStubReturn } from './allMocks';

describe('SERVICES', () => {
  describe('Tests the getAllTeams function (Service)', () => {
    it('Should return 2 teams (Xablau FC e Patos Ninjas Adolescentes Mutantes Futebol Clube)', async () => {
      const geatAllTeamsStub: any = sinon.stub(Teams, 'findAll').resolves(getAllTeamsStubReturn as unknown as any);
      const result = await teamsService.getAllTeams();
      expect(result).to.deep.equal(getAllTeamsStubReturn);
      geatAllTeamsStub.restore();
    });
  });

  describe('Tests the findTeamById function (Service)', () => {
    it('Should return a single team with the given id', async () => {
      const teamId = 1;
      const findByOneStub: any = sinon.stub(Teams, 'findOne').resolves(findTeamByIdStubReturn as unknown as any);
      const result = await teamsService.findTeamById(teamId);
      expect(result).to.deep.equal(findTeamByIdStubReturn);
      findByOneStub.restore();
    });

    it('Should return null if an id is not found', async () => {
      const teamId = 999;
      const findByPkStub: any = sinon.stub(Teams, 'findByPk').resolves(null);
      const result = await teamsService.findTeamById(teamId);
      expect(result).to.be.null;
      findByPkStub.restore();
    });
  });
});
