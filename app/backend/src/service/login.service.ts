import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/users.models';

const JWT_SECRET = 'jwt_secret';
const INVALID_EMAIL_PASSWORD = 'Invalid email or password';
const ALL_FIELDS_MUST_BE_FILLED = 'All fields must be filled';

const createToken = (username: string) => {
  const token = jwt.sign({ username }, JWT_SECRET as string, { expiresIn: '1h' });
  return token;
};

const isEmailValid = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const getUserRole = async (username: string) => {
  const appUser = await Users.findOne({ where: { username } });
  if (!appUser) {
    return null;
  }
  return appUser.role;
};

const findUserByEmail = async (email: string) => {
  const foundUser = await Users.findOne({ where: { email } });
  return foundUser;
};

const userLogin = async (email: string, password: string) => {
  if (!email || !password) {
    return { status: 400, message: ALL_FIELDS_MUST_BE_FILLED };
  }
  if (!isEmailValid(email)) {
    return { status: 401, message: INVALID_EMAIL_PASSWORD };
  }
  const user = await findUserByEmail(email);

  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword || password.length < 6) {
      return { status: 401, message: INVALID_EMAIL_PASSWORD };
    }
    const token = createToken(user.username);
    return { status: 200, token };
  }
  return { status: 401, message: INVALID_EMAIL_PASSWORD };
};

export default {
  userLogin,
  createToken,
  getUserRole,
};
