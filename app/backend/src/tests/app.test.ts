import * as sinon from 'sinon';
import * as chai from 'chai';
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


// public start(PORT: string | number): void {
//   this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
// }

import { app, App } from '../app';

chai.use(chaiHttp);
const { expect } = chai;
describe('App', () => {
  afterEach(() => {
    sinon.restore();
  });
  
  it('Checks if server is running on port 3001', () => {    
    // const sandbox = sinon.createSandbox();
    const PORT = 3001;
    const appInstance = new App();
    const listenSpy = sinon.spy(app, 'listen');
    const consoleSpy = sinon.spy(console, 'log');
    appInstance.start(PORT);
    console.log('CONSOLE SPY', consoleSpy);
    console.log('LISTEN SPY', listenSpy);
  });

  it('Should navigate to / route and return a 200 status', async () => {
    const res = await chai.request(app).get('/');
    expect(res.status).to.equal(200);
  });

  it('Should navigate to /teams route and return a 200 status', async () => {
    const res = await chai.request(app).get('/teams');
    expect(res.status).to.equal(200);
  });
});