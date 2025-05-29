import jwt from 'jsonwebtoken';
export const generateToken = (user: any) => {
  return jwt.sign(user, 'jwt_secret_key', { expiresIn: '1d' });
};
export const verifyToken = (token: string) => {
  return jwt.verify(token, 'jwt_secret_key');
};