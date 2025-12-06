import express from 'express';
import { validationResult } from 'express-validator';
import users, { findUserIndexById, findUserById } from '../data/users.js';
import { v4 as uuidv4 } from 'uuid';
import { validateCreateUser, validateUpdateUser, validateUserIdParam } from '../validators/userValidators.js';

// For demo: protect only create/update/delete with API key
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /users - list all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET /users/:id - get single user
router.get('/:id', validateUserIdParam, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = findUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /users - create user (protected)
router.post('/', auth, validateCreateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, age } = req.body;

  // Uniqueness check for email (simple in-memory)
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return res.status(409).json({ error: 'Email already exists' });

  const newUser = {
    id: uuidv4(),
    name,
    email,
    age: typeof age === 'number' ? age : undefined
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - update user (protected)
router.put('/:id', auth, validateUpdateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const idx = findUserIndexById(req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });

  const existing = users[idx];
  const { name, email, age } = req.body;

  if (email) {
    const duplicate = users.some(
      u => u.email.toLowerCase() === email.toLowerCase() && u.id !== existing.id
    );
    if (duplicate) return res.status(409).json({ error: 'Email already in use' });
  }

  const updated = {
    ...existing,
    ...(name !== undefined ? { name } : {}),
    ...(email !== undefined ? { email } : {}),
    ...(age !== undefined ? { age } : {})
  };

  users[idx] = updated;
  res.json(updated);
});

// DELETE /users/:id - delete user (protected)
router.delete('/:id', auth, validateUserIdParam, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const idx = findUserIndexById(req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });

  const deleted = users.splice(idx, 1)[0];
  res.json({ message: 'User deleted', user: deleted });
});

export default router;
