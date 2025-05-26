import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export function authenticate(req: any) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user; // user = { id, role, iat, exp }
  } catch (err) {
    return null;
  }
}

// Optional Role-Based Access Control helper
export function requireRole(allowedRoles: string[], user: any) {
  if (!user) throw new Error('Not authenticated');
  if (!allowedRoles.includes(user.role)) throw new Error('Not authorized');
}
