import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import matchesService from '../service/matches.service';
import matchesController from '../controller/matches.controller';
import { getAllMatchesAndTeamsStubReturn } from './allMocks';

describe('MATCHES CONTROLLER', () => {
  describe('Tests the getAllMatchesAndTeams function', () => {
    it('Should return all matches and teams', async () => {
      const getMatchesAndTeamsStub: any = sinon.stub(matchesService, 'getMatchesAndTeams').resolves(getAllMatchesAndTeamsStubReturn);
      const req = {} as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      await matchesController.getAllMatchesAndTeams(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(getAllMatchesAndTeamsStubReturn)).to.be.true;
      getMatchesAndTeamsStub.restore();
    });

    it('Should return an error message if getMatchesAndTeams throws an error', async () => {
      const getMatchesAndTeamsStub: any = sinon.stub(matchesService, 'getMatchesAndTeams').throws(new Error('Invalid token'));
      const req = {} as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      await matchesController.getAllMatchesAndTeams(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ message: 'Token must be a valid token' })).to.be.true;
      getMatchesAndTeamsStub.restore();
    });
  });
});