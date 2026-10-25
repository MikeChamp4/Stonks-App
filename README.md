# Stonks-App

A cryptocurrency tracker with an Angular frontend and a Node.js/Express backend.
The backend streams live Bitcoin prices from the CryptoCompare WebSocket API and
exposes a small REST API with JWT-based authentication, backed by MongoDB.

## Stack

- **Frontend:** Angular, TypeScript
- **Backend:** Node.js, Express, WebSockets (`ws`)
- **Database:** MongoDB (Mongoose)
- **Auth:** JSON Web Tokens

## Requirements

- Node.js 18+
- MongoDB running locally (or a reachable host)
- A free [CryptoCompare](https://www.cryptocompare.com/) API key

## Setup

Clone the repository and install dependencies for both apps:

```bash
# Backend
cd backend
npm install
cp .env.example .env   # then fill in the values

# Frontend
cd ../frontend
npm install
```

Fill in `backend/.env` with your CryptoCompare key, a JWT secret and your MongoDB
settings. See `backend/.env.example` for the full list of variables.

## Running

```bash
# Backend (from /backend)
npm run dev        # with nodemon, or: npm start

# Frontend (from /frontend)
npm start          # serves on http://localhost:4200
```

## Tests

The frontend ships with Angular unit tests:

```bash
cd frontend
npm test           # runs Karma/Jasmine via ng test
```
