import { users } from '../data/defaults.js';

export function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  req.session.email = user.email;
  res.status(200).json({ message: 'Login successful', email: user.email });
}

export function verify(req, res) {
  if (!req.session?.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({ email: req.session.email });
}

export function logout(req, res) {
  req.session.destroy();
  res.status(204).send();
}
