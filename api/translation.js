import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { lang } = req.query;

  const supportedLangs = ['hi', 'en', 'kn'];
  if (!supportedLangs.includes(lang)) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  const filePath = path.join(process.cwd(), 'public', 'translations', `${lang}.json`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(fileContent);
  } catch (error) {
    res.status(500).json({ error: 'Could not read file' });
  }
}
