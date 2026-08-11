import os
import json
from flask import Flask, request
from supabase import create_client
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(env_path)

app = Flask(__name__)

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route("/")
def home():
    return "API is working"

@app.route("/Caps", methods=["GET"])
def get_caps():
    response = supabase.table("Caps").select("*").execute()
    return response.data

@app.route("/Caps/<id>", methods=["GET"])
def get_cap(id):
    response = supabase.table("Caps").select("*").eq("id", id).execute()
    return response.data

@app.route("/Caps", methods=["POST"])
def create_cap():
    body = request.json
    response = supabase.table("Caps").insert(body).execute()
    return response.data

@app.route("/Caps/<id>", methods=["PUT"])
def update_cap(id):
    body = request.json
    response = supabase.table("Caps").update(body).eq("id", id).execute()
    return response.data

@app.route("/Caps/<id>", methods=["DELETE"])
def delete_cap(id):
    response = supabase.table("Caps").delete().eq("id", id).execute()
    return response.data

@app.route("/Stones", methods=["GET"])
def get_stones():
    response = supabase.table("Stones").select("*").execute()
    return response.data

@app.route("/Stones/<id>", methods=["GET"])
def get_stone(id):
    response = supabase.table("Stones").select("*").eq("id", id).execute()
    return response.data

@app.route("/Stones", methods=["POST"])
def create_stone():
    body = request.json
    response = supabase.table("Stones").insert(body).execute()
    return response.data

@app.route("/Stones/<id>", methods=["PUT"])
def update_stone(id):
    body = request.json
    response = supabase.table("Stones").update(body).eq("id", id).execute()
    return response.data

@app.route("/Stones/<id>", methods=["DELETE"])
def delete_stone(id):
    response = supabase.table("Stones").delete().eq("id", id).execute()
    return response.data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
