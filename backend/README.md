## URL Shortener Backend

Scripts:

- dev: start with nodemon
- start: production start

Env vars:

- PORT, MONGO_URI, CLIENT_URL, BASE_URL, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD

Endpoints:

- POST /api/shorten
- GET /:shortcode (mounted in main server)
- POST /api/admin/login
- GET /api/admin/urls
- DELETE /api/admin/urls/:id

