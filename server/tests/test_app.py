import pytest
from app import create_app  # Assuming you will set up the factory function in __init__.py
# tests/conftest.py



@pytest.fixture
def client():
    app = create_app()  # Create a test instance of your app
    app.config['TESTING'] = True  # Enable testing mode

    with app.test_client() as client:
        yield client  # This is the test client

def test_home(client):
    """Test the home route"""
    response = client.get('/')
    assert response.status_code == 200
    assert b'hi! help' in response.data  # Check the response contains expected text
