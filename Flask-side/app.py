import os
from flask import Flask, request
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv

# Load environment variables
env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(env_path)

app = Flask(__name__)
CORS(app, origins =["https://localhost:3000","https://capsandstones.netlify.app"])
# Supabase setup
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route("/")
def home():
    return {"message": "API is working"}

# -----------------------------
# CAPS ROUTES
# -----------------------------

@app.route("/Caps", methods=["GET"])
def get_caps():
    response = supabase.table("Caps").select("*").execute()
    return response.data or []

@app.route("/Caps/<id>", methods=["GET"])
def get_cap(id):
    response = supabase.table("Caps").select("*").eq("id", id).execute()
    return response.data or []

@app.route("/Caps", methods=["POST"])
def create_cap():
    body = request.json
    response = supabase.table("Caps").insert(body).execute()
    return response.data or []

@app.route("/Caps/<id>", methods=["PUT"])
def update_cap(id):
    body = request.json
    response = supabase.table("Caps").update(body).eq("id", id).execute()
    return response.data or []

@app.route("/Caps/<id>", methods=["DELETE"])
def delete_cap(id):
    response = supabase.table("Caps").delete().eq("id", id).execute()
    return response.data or []

# -----------------------------
# STONES ROUTES
# -----------------------------

@app.route("/Stones", methods=["GET"])
def get_stones():
    response = supabase.table("Stones").select("*").execute()
    return response.data or []

@app.route("/Stones/<id>", methods=["GET"])
def get_stone(id):
    response = supabase.table("Stones").select("*").eq("id", id).execute()
    return response.data or []

@app.route("/Stones", methods=["POST"])
def create_stone():
    body = request.json
    response = supabase.table("Stones").insert(body).execute()
    return response.data or []

@app.route("/Stones/<id>", methods=["PUT"])
def update_stone(id):
    body = request.json
    response = supabase.table("Stones").update(body).eq("id", id).execute()
    return response.data or []

@app.route("/Stones/<id>", methods=["DELETE"])
def delete_stone(id):
    response = supabase.table("Stones").delete().eq("id", id).execute()
    return response.data or []

# -----------------------------
# COMBINED ITEMS ROUTES
# -----------------------------

@app.route("/items", methods=["GET"])
def get_items():
    caps = supabase.table("Caps").select("*").execute().data or []
    stones = supabase.table("Stones").select("*").execute().data or []
    return {"items": caps + stones}

@app.route("/items", methods=["POST"])
def create_item():
    body = request.json
    item_type = body.get("table") or body.get("type")

    # Caps insert
    if item_type == "Cap":
        response = supabase.table("Caps").insert({
            "type": body.get("type"),
            "brand": body.get("brand"),
            "size": body.get("size")
        }).execute()
        return response.data or []

    # Stones insert
    if item_type == "Stone":
        response = supabase.table("Stones").insert({
            "type": body.get("type"),
            "feel": body.get("feel"),
            "size": body.get("size")
        }).execute()
        return response.data or []

    return {"error": "Invalid item type"}

# -----------------------------
# RUN SERVER
# -----------------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))



