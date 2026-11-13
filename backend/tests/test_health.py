from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_provider_list():
    response = client.get("/api/providers")
    assert response.status_code == 200
    assert {p["id"] for p in response.json()["providers"]} == {"openai", "gemini", "anthropic"}


def test_capability_catalog_is_honest():
    response = client.get("/api/capabilities")
    assert response.status_code == 200
    states = {item["status"] for item in response.json()["capabilities"]}
    assert "planned" in states
    assert "available" in states
