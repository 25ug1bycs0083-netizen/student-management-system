# EduFlow Student Management System

EduFlow is a full-stack student management system for schools, colleges, and educational institutions. The repository is organized as an independently deployable React/Vite frontend and Express/MongoDB backend.

## Current foundation

- React, Vite, Tailwind CSS, React Router, Axios, and Lucide icons
- Express REST API with MongoDB/Mongoose
- JWT authentication with bcrypt password hashing
- Admin, teacher, and student roles
- Protected frontend routes and backend authorization middleware
- Responsive dashboard shell with a mobile navigation drawer

The application is being built module by module. Authentication and the initial dashboard shell are the first functional slice; student CRUD and the remaining modules build on this foundation.

## Requirements

- Node.js 20+
- MongoDB 7+ (local or hosted)

## Installation

```bash
npm install
npm run install:all
```

Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` and a long random `JWT_SECRET`.

## Run locally

From the project root:

```bash
npm run dev
```

Or run each service separately:

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

The API runs at `http://localhost:5000` and the frontend at `http://localhost:5173`.

## Authentication API

- `POST /api/auth/register` — create a teacher or student account (admin self-registration is blocked)
- `POST /api/auth/login` — receive a JWT and safe user profile
- `GET /api/auth/me` — retrieve the authenticated profile
- `PATCH /api/auth/me` — update permitted profile fields

There is no unsafe default admin password. To provision the first admin, set `ADMIN_NAME`, `ADMIN_EMAIL`, and a strong `ADMIN_PASSWORD` in `backend/.env`, then run:

```bash
npm run seed:admin --prefix backend
```

The seed command refuses to overwrite an existing account. Remove the temporary password values from your environment after provisioning.
