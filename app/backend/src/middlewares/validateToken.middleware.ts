import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret';
const TOKEN_MUST_BE_VALID = 'Token must be a valid token';
const TOKEN_NOT_FOUND = 'Token not found';

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: TOKEN_NOT_FOUND });
  }

  const authToken = auth.split(' ')[1];
  try {
    jwt.verify(authToken, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ message: TOKEN_MUST_BE_VALID });
  }
};

export default validateTokenMiddleware;
