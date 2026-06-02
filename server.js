import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, 'data', 'users.json');

const ADMIN_EMAIL = 'admin@dmkgenzevent2026.org';
const ADMIN_PASSWORD = 'Dm2K$GenZ@2026Event!';

const app = express();
app.use(cors());
app.use(express.json());

const readUsers = async () => {
  try {
    const file = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const writeUsers = async (users) => {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2), 'utf-8');
};

const normalizeEmail = (email) => email?.trim().toLowerCase();

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

  const normalizedEmail = normalizeEmail(email);
  const users = await readUsers();
  const user = users.find((u) => normalizeEmail(u.email) === normalizedEmail && u.password === password);

  if (user) {
    return res.json(user);
  }

  if (normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ email: ADMIN_EMAIL, role: 'admin', name: 'Admin' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/api/register', async (req, res) => {
  const {
    fullName,
    age,
    mobile,
    email,
    district,
    occupation,
    password,
    referredBy,
    instagram,
    facebook,
    otherProfile,
    governmentIdType,
    governmentIdNumber,
    profilePhoto,
  } = req.body;

  if (!fullName || !age || !mobile || !email || !district || !occupation || !password || !governmentIdType || !governmentIdNumber) {
    return res.status(400).json({ message: 'Please complete all required registration fields.' });
  }

  const users = await readUsers();
  const emailTaken = users.some((u) => normalizeEmail(u.email) === normalizeEmail(email));
  if (emailTaken) return res.status(409).json({ message: 'Email already registered' });

  const registrationId = 'GENZ-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  const referralCode = 'GENZ-' + Math.random().toString(36).substr(2, 4).toUpperCase();

  const newUser = {
    id: Date.now(),
    fullName,
    age,
    mobile,
    email,
    district,
    occupation,
    password,
    referredBy: referredBy || '',
    instagram: instagram || '',
    facebook: facebook || '',
    otherProfile: otherProfile || '',
    governmentIdType,
    governmentIdNumber,
    profilePhoto: profilePhoto || '',
    registrationId,
    referralCode,
    referralCount: 0,
    friendsJoined: [],
    status: 'pending',
    attendanceMarked: false,
    registeredAt: new Date().toISOString(),
    role: 'user',
  };

  if (referredBy) {
    const referrerIndex = users.findIndex((u) => u.referralCode === referredBy);
    if (referrerIndex !== -1) {
      users[referrerIndex].referralCount = (users[referrerIndex].referralCount || 0) + 1;
      users[referrerIndex].friendsJoined = [
        ...(users[referrerIndex].friendsJoined || []),
        fullName,
      ];
    }
  }

  users.push(newUser);
  await writeUsers(users);
  return res.status(201).json(newUser);
});

app.get('/api/users', async (req, res) => {
  const users = await readUsers();
  res.json(users);
});

app.patch('/api/users/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const users = await readUsers();
  const index = users.findIndex((u) => String(u.id) === String(id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index].status = status;
  await writeUsers(users);
  res.json(users[index]);
});

app.patch('/api/users/:id/attendance', async (req, res) => {
  const { id } = req.params;
  const users = await readUsers();
  const index = users.findIndex((u) => String(u.id) === String(id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index].attendanceMarked = true;
  await writeUsers(users);
  res.json(users[index]);
});

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
