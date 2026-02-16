import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth, products

app = FastAPI(
    title="NexShop API",
    description="E-commerce backend API",
    version="1.0.0",
)

# CORS: allow frontend origin (comma-separated in production, e.g. https://yourapp.vercel.app)
_cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").strip().split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _cors_origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])


@app.get("/")
def root():
    return {"message": "NexShop API", "docs": "/docs"}
