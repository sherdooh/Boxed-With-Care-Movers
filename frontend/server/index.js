import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await mkdir(UPLOADS_DIR, { recursive: true });
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}${ext}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'BWC@2025!';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'change-this-secret';
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || '';
const PORT = process.env.BACKEND_PORT || 5175;

const defaultContent = {
  siteName: 'Boxed With Care Movers',
  siteTagline: 'MOVERS & PACKERS',
  heroHeadline: 'Moving Made\nSimple,\nSafe & Stress-Free',
  heroHighlight: 'Simple,',
  heroSubtext:
    'Professional residential and commercial moving services for local and regional relocations. We handle your belongings with the care they deserve — every box, every step of the way.',
  heroCTA: 'Get a Free Quote',
  heroCallText: 'Call Us Now',
  heroBgImage:
    'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=1600',
  phone: '+254 748 851 679',
  email: 'Info@boxedwithcaremovers.co.ke',
  footerText:
    'Trusted moving and packing specialists. We handle your belongings with the care they deserve — every box, every step of the way.',
  serviceImages: [
    'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7262416/pexels-photo-7262416.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7937307/pexels-photo-7937307.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  blogSectionHeadline: 'Moving Tips, Planning Guides, and Packing Advice',
  blogSectionSubtext: 'Stay informed with practical moving articles that help make every relocation smoother, safer, and more predictable.',
  blogPosts: [
    {
      id: 'moving-checklist',
      title: 'The Essential Moving Checklist for Every Home',
      excerpt: 'A practical moving checklist to keep your relocation organized from first box to final unpacking. Prepare smarter, move easier, and avoid last-minute stress.',
      image: 'https://images.pexels.com/photos/5849141/pexels-photo-5849141.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Moving Tips',
      url: '#contact',
    },
    {
      id: 'packing-hacks',
      title: 'Packing Hacks That Protect Fragile Belongings',
      excerpt: 'Discover clever packing strategies to safeguard fragile items and valuables during transport. Learn what materials work best and where to apply them.',
      image: 'https://images.pexels.com/photos/6841809/pexels-photo-6841809.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Packing',
      url: '#contact',
    },
    {
      id: 'moving-costs',
      title: 'How to Estimate Moving Costs for Your Budget',
      excerpt: 'Understand the key factors that shape moving costs so you can budget confidently and avoid surprises. From distance to service levels, here is what matters.',
      image: 'https://images.pexels.com/photos/7045559/pexels-photo-7045559.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Planning',
      url: '#contact',
    },
  ],
};

async function ensureDataFiles() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(CONTENT_FILE, 'utf8');
  } catch {
    await writeFile(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf8');
  }

  try {
    await readFile(LEADS_FILE, 'utf8');
  } catch {
    await writeFile(LEADS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

async function readJson(filePath, fallback) {
  try {
    const raw = await readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, data) {
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing authorization token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, ADMIN_JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username }, ADMIN_JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

app.post('/api/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file provided' });
  }

  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

app.get('/api/me', requireAuth, (_req, res) => {
  res.json({ authenticated: true });
});

app.get('/api/content', async (_req, res) => {
  const content = await readJson(CONTENT_FILE, defaultContent);
  res.json(content);
});

app.post('/api/content', requireAuth, async (req, res) => {
  const content = req.body;
  await writeJson(CONTENT_FILE, content);
  res.json(content);
});

app.get('/api/leads', requireAuth, async (_req, res) => {
  const leads = await readJson(LEADS_FILE, []);
  res.json(leads);
});

app.post('/api/leads', async (req, res) => {
  const lead = req.body;
  const leads = await readJson(LEADS_FILE, []);
  const updatedLeads = [lead, ...leads];
  await writeJson(LEADS_FILE, updatedLeads);
  res.status(201).json(lead);
});

app.delete('/api/leads/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const leads = await readJson(LEADS_FILE, []);
  const updatedLeads = leads.filter((lead) => lead.id !== id);
  await writeJson(LEADS_FILE, updatedLeads);
  res.json({ message: 'Lead deleted successfully' });
});

app.get('/api/google-reviews', async (_req, res) => {
  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    return res.status(500).json({ message: 'Google reviews are not configured. Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID.' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      GOOGLE_PLACE_ID,
    )}&fields=name,rating,reviews&key=${encodeURIComponent(GOOGLE_PLACES_API_KEY)}`;

    const googleRes = await fetch(url);
    const googleData = await googleRes.json();

    if (!googleRes.ok || googleData.status !== 'OK') {
      const message = googleData.error_message || googleData.status || 'Google Places API request failed';
      return res.status(502).json({ message });
    }

    const reviews = (googleData.result?.reviews ?? []).slice(0, 6).map((review, index) => ({
      id: review.time ? `${review.time}` : `review-${index}`,
      authorName: review.author_name,
      authorUrl: review.author_url,
      rating: review.rating,
      text: review.text,
      relativeTimeDescription: review.relative_time_description,
      profilePhotoUrl: review.profile_photo_url,
    }));

    res.json(reviews);
  } catch (error) {
    console.error('Google reviews fetch failed', error);
    res.status(500).json({ message: 'Failed to fetch Google reviews.' });
  }
});

app.listen(PORT, async () => {
  await ensureDataFiles();
  console.log(`Backend API server running on http://localhost:${PORT}`);
});
