export function requireAuth(req, res, next) {
  if (!req.session?.email) {
    return res.status(401).json({ message: 'Unauthorized please login' });
  }
  next();
}
