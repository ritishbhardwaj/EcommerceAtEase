<<<<<<< HEAD
# NexShop — E-Commerce Website

A responsive e-commerce site built with **Next.js** (frontend), **FastAPI** (backend), and **Tailwind CSS** for styling.

## Project structure

- **`frontend/`** — Next.js 14 app (App Router), Tailwind CSS, TypeScript
- **`backend/`** — FastAPI app with product API

## Prerequisites

- Node.js 18+
- Python 3.10+
- npm or yarn

## Quick start

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API will be at **http://localhost:8000**. Docs: **http://localhost:8000/docs**.

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

App will be at **http://localhost:3000**. The frontend proxies `/api/*` to the backend, so both must run.

## Features

- **Home** — Hero and featured products
- **Products** — Grid of all products from the API
- **Product detail** — Single product with add to cart
- **Cart** — Quantity update, remove, total; checkout placeholder
- **Auth** — Register, login, JWT, protected account page, role-based admin route
- **Responsive** — Mobile-first layout with Tailwind
- **Dark mode** — Respects system preference via CSS variables

## Authentication & Authorization

- **Register** — `POST /auth/register` (email, password, full_name); returns JWT.
- **Login** — `POST /auth/login` (email, password); returns JWT.
- **Current user** — `GET /auth/me` with header `Authorization: Bearer <token>`.
- **Admin only** — `GET /auth/admin/users` returns all users; requires admin role.

**Demo admin (development):** `admin@nexshop.com` / `admin123`

Frontend: Log in and Sign up in the navbar; **Account** (protected) shows profile and logout. Token is stored in `localStorage` and sent in `Authorization` for protected API calls.

## Optional: environment

Create `frontend/.env.local` if the API runs on another host/port:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

By default the Next.js rewrite sends `/api` to `http://localhost:8000`, so no env is required for local dev.

## Tech notes

- **Cart** is stored in React context (client-side only; no persistence yet).
- **Auth** uses JWT (Bearer token). Backend uses in-memory user store; set `SECRET_KEY` via env in production.
- **Images** use Unsplash; allowlisted in `next.config.js`.
- **Backend** uses in-memory product and user data; replace with a database (e.g. SQLAlchemy, PostgreSQL) for production.

Enjoy building!
=======
# EcommerceAtEase
Easy way to ecommerce
>>>>>>> bcb7445287e943b05200ea351b040d2f9556b5ba
