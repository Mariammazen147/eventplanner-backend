# EventPlanner Backend (Phase 0)

## Overview
This is the backend for the EventPlanner project, implemented in Node.js with Express and MongoDB. Phase 0 focuses solely on User Management: sign up and login.

### Tech Stack
- Backend: Node.js + Express
- Database: MongoDB Atlas (Cloud)
- Auth: bcrypt for password hashing, jsonwebtoken for JWT
- Validation: express-validator

## Setup Instructions

1. Clone the repo:
   git clone https://github.com/Mariammazen147/eventplanner-backend.git
   cd eventplanner-backend

2. Install dependencies:
   npm install

3. Create .env from example:
   cp .env.example .env

4. Run the server:
   npm run dev

   Expected logs:
   MongoDB Atlas Connected: ac-eventplanner-usknbsb.mongodb.net
   Server running on http://localhost:3000

## API Endpoints (Phase 0 Only)

| Method | Endpoint           | Description                  | Body Example |
|--------|--------------------|------------------------------|--------------|
| POST   | /api/auth/signup   | Create user account          | { "email": "mario@test.com", "password": "123456" } |
| POST   | /api/auth/login    | Login and get JWT token      | { "email": "mario@test.com", "password": "123456" } |
| GET    | /health            | Health check                 | - |

### Responses
- Signup (201):
  { "message": "User created", "user": { "id": "...", "email": "mario@test.com" } }

- Login (200):
  { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "user": { "id": "...", "email": "mario@test.com" } }

- Validation Error (400):
  { "errors": [ { "msg": "Valid email required" }, { "msg": "Password >=6 chars" } ] }

## Security
- Passwords hashed with bcrypt
- JWT tokens (7-day expiry)
- .env NEVER committed (in .gitignore)

## Testing
Use Postman:
- Collection: EventPlanner_Phase0_APIs.json (attached in submission)
- Signup: 201 + user saved
- Login: JWT token
- Validation: 400 on invalid input
