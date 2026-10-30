import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { connectDatabase } from '../config/db.js';

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME || 'System Administrator';

if (!email || !password) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in backend/.env');
  process.exit(1);
}

try {
  await connectDatabase();
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.error('An account with ADMIN_EMAIL already exists');
    process.exitCode = 1;
  } else {
    await User.create({ name, email, password, role: 'admin' });
    console.log(`Admin account created for ${email}`);
  }
} finally {
  await mongoose.disconnect();
}
