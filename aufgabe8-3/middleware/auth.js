export function requireAuth(req, res, next) {
  if (req.session?.email) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}
