from .admin_routes import admin
from .login_routes import login_routes
# Import other routes as needed

# List of all Blueprints to register
all_blueprints = [admin, login_routes]