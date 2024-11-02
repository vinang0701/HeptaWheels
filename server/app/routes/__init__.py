from .admin_routes import admin
from .buyer_routes import buyer
from .login_routes import login_routes
from .agent_routes import agent

# Import other routes as needed

# List of all Blueprints to register
all_blueprints = [admin, login_routes, buyer, agent]
