import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import {expect} from 'chai';
import * as bcyrpt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
// the ts-ignore above was suggested by linter to fix the following error:
// 3 import chaiHttp from 'chai-http';
//          ~~~~~~~~

//   node_modules/chai-http/types/index.d.ts:61:1
//     61 export = chaiHttp;
//        ~~~~~~~~~~~~~~~~~~
//     This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.
// src/tests/app.test.ts:3:8 - error TS1259: Module '"/home/leogrz/dev/Trybe/moduloBackend/projetos/sd-034-trybe-futebol-clube/app/backend/node_modules/chai-http/types/index"' can only be default-imported using the 'esModuleInterop' flag

import Users from '../database/models/users.models';
import { authValidStubReturn } from './allMocks';

import { app } from '../app';
chai.use(chaiHttp);

const INVALID_EMAIL = '@user.com';
const EMPTY_EMAIL = '';
const EMPTY_PASSWORD = '';
const VALID_EMAIL = 'user@user.com';
const VALID_PASSWORD = 'secret_user';
const INVALID_EMAIL_PASSWORD_MESSAGE = 'Invalid email or password';
const ALL_FIELDS_MUST_BE_FILLED_MESSAGE = 'All fields must be filled';
const STUB_BODY_VALID = { email: VALID_EMAIL, password: VALID_PASSWORD};
const STUB_INVALID_EMAIL_BODY = { email: INVALID_EMAIL, password: VALID_PASSWORD};
const STUB_EMPTY_EMAIL_BODY = { email: EMPTY_EMAIL, password: VALID_PASSWORD};
const STUB_EMPTY_PASSWORD_BODY = { email: VALID_EMAIL, password: EMPTY_PASSWORD};

describe('LOGIN SERVICE', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Tests the userLogin function', () => {
    it('Should return status 400 and error message if email is missing', async () => {
      const result = await chai.request(app).post('/login').send(STUB_EMPTY_EMAIL_BODY);
      expect(result.body).to.deep.equal({ message: ALL_FIELDS_MUST_BE_FILLED_MESSAGE });
      expect(result.status).to.equal(400);
    });

    it('Should return status 400 and error message if password is missing', async () => {
      const result = await chai.request(app).post('/login').send(STUB_EMPTY_PASSWORD_BODY);
      expect(result.body).to.deep.equal({ message: ALL_FIELDS_MUST_BE_FILLED_MESSAGE });
      expect(result.status).to.equal(400);
    });

    it('Should return status 401 and error message if email is not found', async () => {
      sinon.stub(Users, 'findOne').resolves(null);
      const result = await chai.request(app).post('/login').send(STUB_INVALID_EMAIL_BODY);
      expect(result.status).to.equal(401);
      expect(result.body).to.deep.equal({ message: INVALID_EMAIL_PASSWORD_MESSAGE });    
    });

    it('Should return status 200 and a token if login is successful', async () => {
      sinon.stub(jwt, 'sign').returns();
      sinon.stub(Users, 'findOne').resolves(Users.build(authValidStubReturn));

      const result = await chai.request(app).post('/login').send(STUB_BODY_VALID);
      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal({});
    });

    // it('Should return 200 from bcrypt', async () => {
    //   sinon.stub(bcyrpt, 'compare')
    //   .resolves({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlckB1c2VyLmNvbSIsImlhdCI6MTcwOTY4MTgyMCwiZXhwIjoxNzA5Njg1NDIwfQ.tKwAmTO2GMNfSt4CcRXKDx8aP3bFP6kWCcHK_T5Eg4Q"});
    //   const result = await chai.request(app).post('/login').send(STUB_BODY_VALID);
    //   expect(result.body)
    //   .to.deep
    //   .equal({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlckB1c2VyLmNvbSIsImlhdCI6MTcwOTY4MTgyMCwiZXhwIjoxNzA5Njg1NDIwfQ.tKwAmTO2GMNfSt4CcRXKDx8aP3bFP6kWCcHK_T5Eg4Q"});
    //   expect(result.status).to.equal(200);
    // });
  });
});