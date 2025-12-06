# User Management API

A simple Node.js + Express API for managing users.  
Built, debugged, and enhanced with Copilot.

## Features
- CRUD endpoints: GET, POST, PUT, DELETE
- Validation for user data
- Middleware: logging and authentication
- Debugging assisted by Copilot

## Setup
1. Clone the repo
2. Run `npm install`
3. Start server: `node index.js`
4. Test endpoints with Postman or curl

## Example Requests
- GET `/users`
- POST `/users` with `{ "name": "Alice", "email": "alice@example.com" }`
- PUT `/users/1`
- DELETE `/users/1`

## Middleware
- Logger: logs all requests
- Auth: requires `x-api-key: secret123` header
