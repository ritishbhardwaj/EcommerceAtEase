"""FastAPI dependencies for authentication and authorization."""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from auth_utils import decode_token

security = HTTPBearer(auto_error=False)


def get_current_user_id_and_role(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> tuple[int, str]:
    """Dependency: requires valid JWT. Returns (user_id, role). Raises 401 if not authenticated."""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    payload = decode_token(credentials.credentials)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        user_id = int(payload["sub"])
        role = payload.get("role") or "customer"
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return (user_id, role)


def require_admin(
    user_id_and_role: tuple[int, str] = Depends(get_current_user_id_and_role),
) -> int:
    """Dependency: requires admin role. Returns user_id. Raises 403 if not admin."""
    user_id, role = user_id_and_role
    if role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return user_id


def get_optional_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> tuple[int, str] | None:
    """Dependency: optional auth. Returns (user_id, role) or None."""
    if not credentials:
        return None
    payload = decode_token(credentials.credentials)
    if not payload or "sub" not in payload:
        return None
    try:
        user_id = int(payload["sub"])
        role = payload.get("role") or "customer"
        return (user_id, role)
    except (ValueError, TypeError):
        return None
