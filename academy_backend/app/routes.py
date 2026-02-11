from flask import render_template
from app import app

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/workshop")
def workshop():
    return render_template("Workshop.html")

@app.route("/academy")
def academy():
    return render_template("academy.html")

@app.route("/services")
def services():
    return render_template("Services.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/register")
def register():
    return render_template("register.html")
