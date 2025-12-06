// Simple API key auth middleware
export default function auth(req, res, next) {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: invalid or missing API key' });
  }
  next();
}
