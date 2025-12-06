import express from 'express';
import usersRouter from './routes/users.js';
import logger from './middleware/logger.js';
import auth from './middleware/auth.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Core middleware
app.use(express.json());
app.use(logger);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Public routes
app.use('/users', usersRouter);

// Example protected route group (optional): uncomment to protect all /users routes
// app.use('/users', auth, usersRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
