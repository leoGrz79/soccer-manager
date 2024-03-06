import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request } from 'express';
import teamsService from '../service/teams.service';
import teamsController from '../controller/teams.controller';
import { getAllTeamsStubReturn, findTeamByIdStubReturn } from './allMocks';


describe('TEAMS CONTROLLER', () => {
  describe('Tests the getAllTeams function (Controller)', () => {
    it('Should return 2 teams', async () => {
      const req = {} as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      const getAllTeamsStub: sinon.SinonStub = sinon.stub(teamsService, 'getAllTeams').resolves(getAllTeamsStubReturn);

      await teamsController.getAllTeams(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(getAllTeamsStubReturn)).to.be.true;

      getAllTeamsStub.restore();
    });
  });

  describe('Tests the findTeamById function (Controller)', () => {
    it('Should return a single team with the given id', async () => {
      const req = {
        params: { id: 1 },
      } as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      const findTeamByIdStub: sinon.SinonStub = sinon.stub(teamsService, 'findTeamById').resolves(findTeamByIdStubReturn);

      await teamsController.findTeamById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(findTeamByIdStubReturn)).to.be.true;

      findTeamByIdStub.restore();
    });

    it('Should return 404 if an id is not found', async () => {
      const req = {
        params: { id: 999 },
      } as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      const getTeamByIdStub: sinon.SinonStub = sinon.stub(teamsService, 'findTeamById').resolves(null);

      await teamsController.findTeamById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Team not found' })).to.be.true;

      getTeamByIdStub.restore();
    });
  });
});