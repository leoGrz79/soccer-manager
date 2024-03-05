import * as sinon from 'sinon';
import * as chai from 'chai';
import * as express from 'express';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');
// import request from 'superagent';
// the ts-ignore above was suggested by linter to fix the following error:
// 3 import chaiHttp from 'chai-http';
//          ~~~~~~~~

//   node_modules/chai-http/types/index.d.ts:61:1
//     61 export = chaiHttp;
//        ~~~~~~~~~~~~~~~~~~
//     This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.
// src/tests/app.test.ts:3:8 - error TS1259: Module '"/home/leogrz/dev/Trybe/moduloBackend/projetos/sd-034-trybe-futebol-clube/app/backend/node_modules/chai-http/types/index"' can only be default-imported using the 'esModuleInterop' flag


chai.use(chaiHttp);

const { expect } = chai;
describe('App', () => {
//   it('Should start the server on port 3001', async () => {
//     // I GIVE UP!!! CAN´T MAKE IT WORK!!!
//   });

  it('Should navigate to / route and return a 200 status', async () => {
    const res = await chai.request(app).get('/');
    expect(res.status).to.equal(200);
  });

  it('Should navigate to /teams route and return a 200 status', async () => {
    const res = await chai.request(app).get('/teams');
    expect(res.status).to.equal(200);
  });
});