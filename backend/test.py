from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_api_check_ip():
    """request analysis for an ip"""
    response = client.post(
        "/api/check",
        json={
            "target": "1.1.1.1",
        },
    )
    assert response.status_code == 200
    assert response.json()
    print(response.json())


def test_api_check_url():
    """request analysis for a url"""
    response = client.post(
        "/api/check",
        json={
            "target": "https://fastapi.tiangolo.com/",
        },
    )
    assert response.status_code == 200
    assert response.json()
    print(response.json())


def test_api_items():
    """assert that the api items is working"""
    response = client.get("/api/items")
    assert response.status_code == 200
    assert response.json()
