# Deploy NexShop and get a public URL

You’ll deploy the **backend** first, then the **frontend**, and connect them with env variables.

---

## 1. Deploy backend (FastAPI) → get API URL

### Option A: Render (free tier)

1. Push your code to a **GitHub** repo (create one if needed).
2. Go to [render.com](https://render.com) → Sign up / Log in.
3. **New** → **Web Service**.
4. Connect the repo and set:
   - **Root Directory:** `backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Environment:**
   - `SECRET_KEY` = a long random string (e.g. from [randomkeygen.com](https://randomkeygen.com))
   - `CORS_ORIGINS` = leave empty for now; add your frontend URL after step 2 (e.g. `https://your-app.vercel.app`)
6. Create the service. Wait for deploy.
7. Copy your **backend URL**, e.g. `https://nexshop-api.onrender.com` (you’ll use it as the **public API URL**).

### Option B: Railway

1. Go to [railway.app](https://railway.app) → Sign up with GitHub.
2. **New Project** → **Deploy from GitHub** → select repo.
3. Set **Root Directory** to `backend`.
4. **Variables:** add `SECRET_KEY` (random string) and later `CORS_ORIGINS` = your frontend URL.
5. Railway will assign a public URL; use **Generate Domain** if needed. Copy that URL as your **public API URL**.

---

## 2. Deploy frontend (Next.js) → get app URL

### Vercel (recommended for Next.js)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub.
2. **Add New** → **Project** → import the same repo.
3. Set **Root Directory** to `frontend` (or leave as repo root and set in project settings).
4. **Environment variables** (add for Production):
   - `NEXT_PUBLIC_API_URL` = your **backend public URL** from step 1 (e.g. `https://nexshop-api.onrender.com`)
   - `BACKEND_URL` = same URL (so server-side rewrites use it)
5. Deploy. Vercel will give you a URL like `https://your-project.vercel.app` → this is your **public app URL**.

---

## 3. Connect backend to frontend (CORS)

1. In **Render** (or Railway), open your backend service → **Environment**.
2. Set:
   - `CORS_ORIGINS` = your Vercel app URL, e.g. `https://your-project.vercel.app`
3. Save and redeploy the backend if needed.

---

## Summary: your public URLs

- **Frontend (store):** `https://your-project.vercel.app` ← share this with users.
- **Backend (API):** `https://nexshop-api.onrender.com` (or your Railway URL) — used by the frontend; no need to share unless you use the API directly.

---

## Optional: run backend locally with production env

```bash
cd backend
set SECRET_KEY=your-secret-key
set CORS_ORIGINS=https://your-project.vercel.app
uvicorn main:app --reload --port 8000
```

On macOS/Linux use `export` instead of `set`.
