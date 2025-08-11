import { nanoid } from 'nanoid';
import validator from 'validator';
import Url from '../models/Url.js';

function getBaseUrl() {
  if (process.env.BASE_URL) {
    const baseUrl = process.env.BASE_URL.replace(/\/+$/, '');
    console.log('Using BASE_URL from environment:', baseUrl);
    return baseUrl;
  }
  // Fallback for development
  console.log('BASE_URL not set, using default localhost:5000');
  return 'http://localhost:5000';
}

export async function shortenUrl(req, res) {
  try {
    const { originalUrl } = req.body || {};
    if (!originalUrl || typeof originalUrl !== 'string') {
      return res.status(400).json({ message: 'originalUrl is required' });
    }

    const isValid = validator.isURL(originalUrl, {
      protocols: ['http', 'https'],
      require_protocol: true,
    });
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid URL. Include http(s) protocol.' });
    }

    let shortCode = nanoid(7);
    // Ensure uniqueness in rare collision cases
    // Try a few times before giving up
    for (let attempt = 0; attempt < 3; attempt += 1) {
      // eslint-disable-next-line no-await-in-loop
      const exists = await Url.findOne({ shortCode }).lean();
      if (!exists) break;
      shortCode = nanoid(7);
    }

    const created = await Url.create({ originalUrl, shortCode });
    const shortUrl = `${getBaseUrl()}/${created.shortCode}`;

    return res.status(201).json({
      id: created._id,
      originalUrl: created.originalUrl,
      shortCode: created.shortCode,
      shortUrl,
      createdAt: created.createdAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function redirectToOriginal(req, res) {
  try {
    const { shortcode } = req.params;
    const record = await Url.findOneAndUpdate(
      { shortCode: shortcode },
      { $inc: { visitCount: 1 } },
      { new: true },
    );
    if (!record) {
      return res.status(404).json({ message: 'Short URL not found' });
    }
    return res.redirect(record.originalUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function adminListUrls(_req, res) {
  try {
    const docs = await Url.find({}).sort({ createdAt: -1 }).lean();
    const baseUrl = getBaseUrl();
    const data = docs.map((d) => ({
      id: d._id,
      originalUrl: d.originalUrl,
      shortCode: d.shortCode,
      shortUrl: `${baseUrl}/${d.shortCode}`,
      createdAt: d.createdAt,
      visitCount: d.visitCount || 0,
    }));
    return res.json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function adminDeleteUrl(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Url.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'URL not found' });
    }
    return res.json({ message: 'Deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export function getConfig(req, res) {
  return res.json({
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,
    PORT: process.env.PORT,
    getBaseUrl: getBaseUrl(),
  });
}

export async function adminLogin(req, res) {
  try {
    const { username, password } = req.body || {};
    const expectedUser = process.env.ADMIN_USERNAME || 'admin';
    const expectedPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (username !== expectedUser || password !== expectedPass) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const jwt = (await import('jsonwebtoken')).default;
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'dev-secret', {
      expiresIn: '1d',
    });
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

