from fastapi import APIRouter, HTTPException

router = APIRouter()

# In-memory product data with Unsplash product images (replace with DB later)
PRODUCTS = [
    {
        "id": 1,
        "name": "Wireless Headphones",
        "description": "Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.",
        "price": 149.99,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
        "category": "Electronics",
        "in_stock": True,
    },
    {
        "id": 2,
        "name": "Minimalist Watch",
        "description": "Sleek analog watch with leather strap. Perfect for everyday wear and special occasions.",
        "price": 89.00,
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
        "category": "Accessories",
        "in_stock": True,
    },
    {
        "id": 3,
        "name": "Organic Cotton T-Shirt",
        "description": "Soft, sustainable organic cotton t-shirt. Available in multiple colors. Comfortable fit.",
        "price": 34.99,
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
        "category": "Apparel",
        "in_stock": True,
    },
    {
        "id": 4,
        "name": "Portable Bluetooth Speaker",
        "description": "Water-resistant speaker with 360° sound. Perfect for outdoor adventures and parties.",
        "price": 79.99,
        "image": "https://images.unsplash.com/photo-1545454670-7f4d8b435b9c?w=600&h=600&fit=crop",
        "category": "Electronics",
        "in_stock": True,
    },
    {
        "id": 5,
        "name": "Leather Backpack",
        "description": "Durable full-grain leather backpack with laptop compartment. Classic design that ages beautifully.",
        "price": 199.00,
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
        "category": "Accessories",
        "in_stock": True,
    },
    {
        "id": 6,
        "name": "Running Shoes",
        "description": "Lightweight running shoes with responsive cushioning. Designed for speed and comfort.",
        "price": 129.99,
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
        "category": "Footwear",
        "in_stock": True,
    },
    {
        "id": 7,
        "name": "Smart Desk Lamp",
        "description": "LED desk lamp with adjustable brightness, color temperature, and USB charging port.",
        "price": 59.99,
        "image": "https://images.unsplash.com/photo-1507473886375-c6a805999f8f?w=600&h=600&fit=crop",
        "category": "Home",
        "in_stock": True,
    },
    {
        "id": 8,
        "name": "Ceramic Coffee Set",
        "description": "Handcrafted ceramic coffee mug and pour-over set. Dishwasher safe.",
        "price": 45.00,
        "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=600&fit=crop",
        "category": "Home",
        "in_stock": False,
    },
    {
        "id": 9,
        "name": "Fitness Tracker Band",
        "description": "Track steps, heart rate, and sleep. 7-day battery. Compatible with iOS and Android.",
        "price": 49.99,
        "image": "https://images.unsplash.com/photo-1576243345710-3fad0c98327d?w=600&h=600&fit=crop",
        "category": "Electronics",
        "in_stock": True,
    },
]


@router.get("")
def list_products():
    return PRODUCTS


@router.get("/{product_id}")
def get_product(product_id: int):
    for p in PRODUCTS:
        if p["id"] == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")
