import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';

function responseFor(user) {
  return { token: signToken(user.id), user: user.toSafeObject() };
}

export async function register(req, res) {
  const { name, email, password, role = 'student' } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' });
  if (role === 'admin') return res.status(403).json({ message: 'Admin accounts cannot be self-registered' });
  const user = await User.create({ name, email, password, role });
  res.status(201).json(responseFor(user));
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !user.isActive || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json(responseFor(user));
}

export function getProfile(req, res) {
  res.json({ user: req.user.toSafeObject() });
}

export async function updateProfile(req, res) {
  const updates = {};
  for (const field of ['name', 'phone', 'avatar']) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });
  res.json({ user: user.toSafeObject() });
}
