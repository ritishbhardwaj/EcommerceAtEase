from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr

from auth_dependencies import get_current_user_id_and_role, require_admin
from auth_utils import (
    create_access_token,
    decode_token,
    hash_password,
    verify_password,
)

router = APIRouter()

# In-memory user store: email -> user dict (replace with DB in production)
USERS_DB: dict[str, dict] = {}
# Next id for new users
_next_id = 1


def _seed_admin() -> None:
    """Seed a demo admin user (for development only)."""
    global _next_id
    admin_email = "admin@nexshop.com"
    if admin_email not in USERS_DB:
        USERS_DB[admin_email] = {
            "id": 1,
            "email": admin_email,
            "hashed_password": hash_password("admin123"),
            "full_name": "Admin User",
            "role": "admin",
        }
        _next_id = 2


_seed_admin()

# Role: "customer" | "admin"
def _next_user_id() -> int:
    global _next_id
    n = _next_id
    _next_id += 1
    return n


# ---------- Schemas ----------
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str


# ---------- Routes ----------
@router.post("/register", response_model=TokenResponse)
def register(data: UserRegister):
    if data.email.lower() in USERS_DB:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    if len(data.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters",
        )
    user_id = _next_user_id()
    user = {
        "id": user_id,
        "email": data.email.lower(),
        "hashed_password": hash_password(data.password),
        "full_name": data.full_name.strip(),
        "role": "customer",
    }
    USERS_DB[user["email"]] = user
    token = create_access_token({"sub": str(user["id"]), "email": user["email"], "role": user["role"]})
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin):
    user = USERS_DB.get(data.email.lower())
    if not user or not verify_password(data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    token = create_access_token({"sub": str(user["id"]), "email": user["email"], "role": user["role"]})
    return TokenResponse(access_token=token)


def get_current_user_id_and_role(token: str | None) -> tuple[int, str] | None:
    """Returns (user_id, role) or None if invalid/missing token."""
    if not token or not token.strip():
        return None
    # Strip "Bearer " if present
    if token.lower().startswith("bearer "):
        token = token[7:].strip()
    payload = decode_token(token)
    if not payload or "sub" not in payload:
        return None
    try:
        user_id = int(payload["sub"])
        role = payload.get("role") or "customer"
        return (user_id, role)
    except (ValueError, TypeError):
        return None


# ---------- Protected route: current user ----------
@router.get("/me", response_model=UserResponse)
def get_me(user_id_and_role: tuple[int, str] = Depends(get_current_user_id_and_role)):
    """Return current user profile. Requires valid Bearer token."""
    user_id, _ = user_id_and_role
    user = next((u for u in USERS_DB.values() if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserResponse(
        id=user["id"],
        email=user["email"],
        full_name=user["full_name"],
        role=user["role"],
    )


# ---------- Admin-only route (authorization) ----------
@router.get("/admin/users", response_model=list[UserResponse])
def list_users_admin(_admin_id: int = Depends(require_admin)):
    """List all users. Requires admin role."""
    return [
        UserResponse(id=u["id"], email=u["email"], full_name=u["full_name"], role=u["role"])
        for u in USERS_DB.values()
    ]
