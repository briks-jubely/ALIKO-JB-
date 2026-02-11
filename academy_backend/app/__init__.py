import os
from flask import Flask

# Hakikisha absolute path kwa templates
app = Flask(
    __name__,
    template_folder=os.path.join(os.path.dirname(os.path.abspath(__file__)), "../templates")
)

# Import routes
from app import routes
