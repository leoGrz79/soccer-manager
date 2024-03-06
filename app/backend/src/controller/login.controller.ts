import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import loginService from '../service/login.service';

const JWT_SECRET = 'jwt_secret';
const TOKEN_MUST_BE_VALID = 'Token must be a valid token';
const TOKEN_NOT_FOUND = 'Token not found';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loginResponse = await loginService.userLogin(email, password);
  if (loginResponse.status !== 200) {
    return res
      .status(loginResponse.status)
      .json({ message: loginResponse.message });
  }
  return res.status(loginResponse.status).json({ token: loginResponse.token });
};

const validateToken = (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: TOKEN_NOT_FOUND });
  }

  const authToken = auth.split(' ')[1];
  try {
    jwt.verify(authToken, JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
  }
};

const getUserRole = async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: TOKEN_NOT_FOUND });
  }

  validateToken(req, res);

  const authToken = auth.split(' ')[1];
  try {
    const username = jwt.verify(authToken, JWT_SECRET) as { username: string };
    console.log('OLHA O BAIANO AQUI!!!', username.username);
    const role = await loginService.getUserRole(username.username);
    if (!role) {
      return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
    }
    return res.status(200).json({ role });
  } catch (e) {
    return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
  }
};

export default {
  login, validateToken, getUserRole,
};
