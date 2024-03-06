import { expect } from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import loginService from '../service/login.service';
import loginController from '../controller/login.controller';
import * as jwt from 'jsonwebtoken';

describe('LOGIN CONTROLLER', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Tests the login function', () => {
    it('Should return status 200 and a token if login is successful', async () => {
      const req = {
        body: {
          email: 'valid@email.com',
          password: 'validpassword',
        },
      } as any;

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      const userAuth = {
        status: 200,
        token: 'validtoken',
      };

      sinon.stub(loginService, 'userLogin').resolves(userAuth);

      await loginController.login(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ token: 'validtoken' })).to.be.true;
    });

    it('Should return status and error message if login is unsuccessful', async () => {
      const req = {
        body: {
          email: 'invalid@email.com',
          password: 'invalidpassword',
        },
      } as any;

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as any;

      const userAuth = {
        status: 401,
        message: 'Invalid email or password',
      };

      sinon.stub(loginService, 'userLogin').resolves(userAuth);

      await loginController.login(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ message: 'Invalid email or password' })).to.be.true;
    });
  });
  describe('Tests the getUserRole function', () => {
    it('Should return status 200 and a role if login is successful', async () => {
      const req: any =
        {
          headers: {
            authorization: 'Bearer token'
          }
        } as any;
      const res: any =
        {
          status: sinon.stub().returnsThis(), json: sinon.stub()
        } as unknown as any;

      const userName: any = { username: 'user' };
      const userRole = 'role';

      sinon.stub(jwt, 'verify').returns(userName);
      sinon.stub(loginService, 'getUserRole').resolves(userRole);

      await loginController.getUserRole(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ role: 'role' })).to.be.true;

      sinon.restore();
    });
  });
})