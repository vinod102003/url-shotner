import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function signup(req, res) {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ username }).lean();
    if (existing) return res.status(409).json({ message: 'Username already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const created = await User.create({ username, passwordHash, role: 'user' });
    return res.status(201).json({ id: created._id, username: created.username });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body || {};
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { sub: user._id.toString(), role: user.role, username: user.username },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' },
    );
    return res.json({ token, role: user.role, username: user.username });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function seedAdmin() {
  const expectedUser = process.env.ADMIN_USERNAME || 'admin';
  const expectedPass = process.env.ADMIN_PASSWORD || 'admin123';
  const exists = await User.findOne({ username: expectedUser });
  if (!exists) {
    const passwordHash = await bcrypt.hash(expectedPass, 10);
    await User.create({ username: expectedUser, passwordHash, role: 'admin' });
    console.log('Seeded admin user');
  }
}
