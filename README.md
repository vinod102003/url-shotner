## MERN URL Shortener

### Stack
- Backend: Node.js + Express + MongoDB (Mongoose)
- Frontend: React + Vite + TailwindCSS

### Quick Start

1) Backend

- Copy `backend/.env.example` to `backend/.env` and fill values
- Install deps and run

```
cd backend
npm install
npm run dev
```

2) Frontend

- Create `frontend/.env` (optional):

```
VITE_API_BASE=http://localhost:5000
```

- Install deps and run

```
cd frontend
npm install
npm run dev
```

### Features
- Shorten URLs with validation
- Redirect via `/:shortcode`
- Admin login (JWT) with hardcoded credentials
- Admin dashboard: list, search, delete, visit counts

### Scripts
- Lint/format via ESLint + Prettier
