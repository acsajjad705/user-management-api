# User Management API

A simple Express-based API with CRUD endpoints, validation, logging, authentication, and error handling.

## Features
- CRUD: GET, POST, PUT, DELETE for /users
- Validation: input checks via express-validator
- Middleware: morgan logging, API key auth, centralized error handler
- In-memory data store for simplicity (swap for DB when needed)

## Getting Started
1. Clone the repo
2. Run `npm install`
3. Create `.env` with:
   - `PORT=3000`
   - `API_KEY=super-secret-api-key`
4. Start dev: `npm run dev` or prod: `npm start`
5. Test health: `GET http://localhost:3000/health`

## Endpoints

### GET /users
- Returns list of users

### GET /users/:id
- Returns a single user
- Path param: `id` (UUID)

### POST /users (Protected)
- Header: `x-api-key: <API_KEY>`
- Body:
```json
{ "name": "Your Name", "email": "you@example.com", "age": 22 }
