import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import matchesService from '../service/matches.service';

const JWT_SECRET = 'jwt_secret';
const TOKEN_MUST_BE_VALID = 'Token must be a valid token';
const TOKEN_NOT_FOUND = 'Token not found';

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

const getAllMatches = async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: TOKEN_NOT_FOUND });
  }

  validateToken(req, res);

  const authToken = auth.split(' ')[1];
  try {
    jwt.verify(authToken, JWT_SECRET);
    const matches = await matchesService.getAllMatches();
    if (!matches) {
      return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
    }
    return res.status(200).json(matches);
  } catch (e) {
    return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
  }
};

const getAllMatchesAndTeams = async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: TOKEN_NOT_FOUND });
  }

  validateToken(req, res);

  const authToken = auth.split(' ')[1];
  try {
    jwt.verify(authToken, JWT_SECRET);
    const matches = await matchesService.getMatchesAndTeams();
    if (!matches) {
      return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
    }
    return res.status(200).json(matches);
  } catch (e) {
    return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
  }
};

export default {
  getAllMatches,
  getAllMatchesAndTeams,
};
