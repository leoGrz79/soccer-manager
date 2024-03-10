import * as express from 'express';
import 'express-async-errors';

import errorMiddleware from './middlewares/errorMiddleware';
import teamsController from './controller/teams.controller';
import loginController from './controller/login.controller';
import matchesController from './controller/matches.controller';
import validateTokenMiddleware from './middlewares/validateToken.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get('/teams', teamsController.getAllTeams);
    this.app.get('/teams/:id', teamsController.findTeamById);
    this.app.post('/login', loginController.login);
    this.app.get('/login/role', validateTokenMiddleware, loginController.getUserRole);
    this.app.get('/matches', matchesController.getInProgressMatches);
    this.app.patch('/matches/:id/finish', validateTokenMiddleware, matchesController.endMatch);
    this.app.patch('/matches/:id', validateTokenMiddleware, matchesController.changeMatch);
    this.app.post('/matches', validateTokenMiddleware, matchesController.addMatch);

    // Não remova esse middleware de erro, mas fique a vontade para customizá-lo
    // Mantenha ele sempre como o último middleware a ser chamado
    this.app.use(errorMiddleware);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
