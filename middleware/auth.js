function auth(req, res, next) {
  // Simple demo auth: require header "x-api-key"
  if (req.headers['x-api-key'] !== 'secret123') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
}
module.exports = auth;
