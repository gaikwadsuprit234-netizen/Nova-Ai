# Security notes

This starter is for local development only.
- Keep all provider credentials in backend environment variables.
- Do not commit `.env` files.
- Do not execute generated or uploaded code on the API server.
- Add authentication and per-user database authorization before multi-user deployment.
- Add request-size limits, stronger rate limiting, audit logging, and abuse controls.
- Treat uploaded content, retrieved web pages, and model output as untrusted.
- Review CORS, CSRF, SSRF, SQL injection, XSS, file storage isolation, and secret rotation before production.
