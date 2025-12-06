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
PUT /users/:id (Protected)
Header: x-api-key: <API_KEY>

Body (any subset):

json
{ "name": "Updated Name", "email": "new@example.com", "age": 23 }
DELETE /users/:id (Protected)
Header: x-api-key: <API_KEY>

Sample cURL
bash
curl http://localhost:3000/users
curl http://localhost:3000/users/<id>

curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "x-api-key: super-secret-api-key" \
  -d '{"name":"Sara","email":"sara@example.com","age":21}'

curl -X PUT http://localhost:3000/users/<id> \
  -H "Content-Type: application/json" \
  -H "x-api-key: super-secret-api-key" \
  -d '{"name":"Sara Updated"}'

curl -X DELETE http://localhost:3000/users/<id> \
  -H "x-api-key: super-secret-api-key"
Notes
Replace in-memory store with persistent DB for production.

Document where AI assistance helped (see below).

Copilot Assistance
Suggested validation chains for create/update routes

Helped identify missing validationResult checks and consistent status codes

Improved middleware order and error handling pattern

Code

---

## Rubric alignment

- **GitHub repository created:** Include public repo with README, `.gitignore`, and commit history.
- **CRUD endpoints:** Implemented GET, POST, PUT, DELETE under `/users`.
- **Used Copilot to debug:** Documented in README (you can expand with specific examples).
- **Validation for user data:** `express-validator` chains enforce name, email, age, and UUID ids.
- **Middleware:** Logging (`morgan`), authentication (`x-api-key`), and centralized error handler.

---

## Steps to submit to GitHub

### 1. Initialize and commit locally

```bash
mkdir user-management-api
cd user-management-api

# Add files as above
npm init -y
# replace generated package.json with provided one, then:
npm install

git init
git add .
git commit -m "Initial commit: user management API with CRUD, validation, and middleware"
2. Create a new public repository
Sign in to GitHub

Click “+” → New repository

Name: user-management-api

Visibility: Public

Do not add default README (you already have one)

3. Add remote and push
bash
git branch -M main
git remote add origin https://github.com/<your-username>/user-management-api.git
git push -u origin main
4. Verify
Open the repo URL

Check files exist and README renders properly

Confirm it runs locally: npm run dev, then visit http://localhost:3000/health

5. Submit
Copy the repository URL

Paste it into your assignment submission portal for review

Quick test checklist
GET /users: returns list

GET /users/:id: returns user or 404

POST /users: requires x-api-key, validates name/email/age, prevents duplicate email, returns 201

PUT /users/:id: requires x-api-key, validates fields, prevents duplicate email, returns updated user

DELETE /users/:id: requires x-api-key, deletes user, returns confirmation

Error handler: consistent JSON errors with appropriate status codes

Logger: logs each request in dev/prod formats
