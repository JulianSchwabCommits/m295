import { users } from '../data/defaults.js';

export function login(req, res) {
  try {
    if (req.session?.email) {
      return res
        .status(200)
        .json({ message: 'already logged in', email: req.session.email });
    }

    const email = req.body?.email;
    const password = req.body?.password;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'email and password are required' });
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.email = user.email;
    res.status(200).json({ message: 'login successful', email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'internal server error' });
  }
}

export function verify(req, res) {
  try {
    const email = req.body?.email;

    if (!email) {
      return res.status(400).json({ message: 'email is required' });
    }

    if (!req.session?.email) {
      return res.status(401).json({ message: 'No Session login first' });
    }

    const user = users.find((u) => u.email === req.session.email);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (email !== req.session.email) {
      return res.status(401).json({ message: 'email does not match session' });
    }

    res
      .status(200)
      .json({ message: 'session valid', email: req.session.email });
  } catch (err) {
    res.status(500).json({ message: 'internal server error' });
  }
}

export function logout(req, res) {
  if (!req.session?.email) {
    return res.status(401).json({ message: 'not logged in' });
  }

  req.session.destroy();
  res.status(204).send();
}
