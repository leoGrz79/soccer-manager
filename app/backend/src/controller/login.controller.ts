import { Request, Response } from 'express';
import loginService from '../service/login.service';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userAuth = await loginService.userLogin(email, password);
  if (userAuth.status !== 200) {
    return res
      .status(userAuth.status)
      .json({ message: userAuth.message });
  }
  res.status(userAuth.status).json({ token: userAuth.token });
};

export default {
  login,
};
