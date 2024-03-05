// import * as sinon from 'sinon';
// import { expect } from 'chai';
// import { App } from '../app';

// describe('App', () => {
//   let sandbox: sinon.SinonSandbox;

//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   it('should start the app with default port if APP_PORT is not set', () => {
//     const app = new App();
//     const startStub = sandbox.stub(app, 'start');

//     app.start(3001);

//     expect(startStub.calledOnce).to.be.true;
//     expect(startStub.calledWith(3001)).to.be.true;
//   }); 
// });
