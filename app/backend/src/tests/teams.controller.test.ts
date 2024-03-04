import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request } from 'express';
import teamsService from '../service/teams.service';
import teamsController from '../controller/teams.controller';
import { getAllTeamsStubReturn } from './allMocks';


describe('CONTROLLER', () => {
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

    it('Should return 500 status and error message when an error occurs', async () => {
      const req = {} as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      const errorMessage = 'Internal Server Error';
      const getAllTeamsStub: any = sinon.stub(teamsService, 'getAllTeams').throws(new Error(errorMessage));

      await teamsController.getAllTeams(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: errorMessage })).to.be.true;

      getAllTeamsStub.restore();
    });
  });
});