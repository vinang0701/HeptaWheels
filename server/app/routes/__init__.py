from .admin_routes import admin
from .buyer_routes import buyer
from .login_routes import login
from .agent_routes import agent
from .seller_routes import seller

# List of all Blueprints to register
all_blueprints = [admin, login, buyer, agent, seller]
