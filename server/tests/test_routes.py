import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True

    with app.test_client() as client:
        yield client

def test_admin_route(client):
    """Test the admin route"""
    response = client.get('/admin')  # Adjust the route to match your application
    assert response.status_code == 200

