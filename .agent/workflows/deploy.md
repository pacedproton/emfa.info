---
description: How to build and deploy the static site (SPA)
---

# Build and Deploy (Static SPA)

We have configured the project to generate a **Single Page Application (SPA)** using `@sveltejs/adapter-static`. This generates a static `index.html` that handles all routing on the client side.

## 1. Install Dependencies

If you haven't already:

```bash
bun install
```

## 2. Build the Site

Run the build command. This will generate a `build/` directory containing the static files.

```bash
// turbo
bun run build
```

## 3. Deploy to Web Server

Copy the contents of the `build/` directory to your web server's document root (e.g., `/var/www/html/emfa.info`).

```bash
# Example for Nginx/Apache
cp -r build/* /var/www/html/emfa.info/
```

## 4. Web Server Configuration (Crucial!)

Since this is a SPA, your web server **MUST** be configured to rewrite all requests to `index.html` so that the client-side router can handle them.

### Nginx Example

```nginx
server {
    listen 80;
    server_name emfa.info;
    root /var/www/html/emfa.info;
    index index.html;

    location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        # FOR SPA: Fallback to index.html
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache Example (.htaccess)

If using Apache, ensure `.htaccess` is enabled and add:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
