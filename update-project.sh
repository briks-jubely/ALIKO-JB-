#!/bin/bash
# ==========================================
# Update headers + navbar CSS for all HTML pages
# Includes install button ONLY for index.html
# ==========================================

# ------------------------------
# Paths
# ------------------------------
HTML_DIR="public/html"
BACKUP_DIR="$HTML_DIR/backup_html"
CSS_FILE="public/assets/css/components/navbar.css"

# ------------------------------
# Backup HTML pages
# ------------------------------
mkdir -p "$BACKUP_DIR"
find "$HTML_DIR" -type f -name "*.html" | while read file; do
  [[ "$file" == *backup_html* ]] && continue
  cp "$file" "$BACKUP_DIR/$(basename "$file")"
done
echo "✅ HTML backups created in $BACKUP_DIR"

# ------------------------------
# Update navbar.css
# ------------------------------
cat > "$CSS_FILE" << 'CSS_EOF'
/* ================= Header + Nav ================= */

/* Header container */
.site-header {
  background-color: #28a745; /* green background */
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Logo + Name + Tagline */
.site-header .logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.site-header .logo h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
}

.site-header .logo p {
  margin: 0;
  font-size: 1rem;
  color: #fff;
}

/* Main navigation */
.main-nav {
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;
}

.main-nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s, transform 0.3s;
}

.main-nav a:hover {
  color: #000;
  transform: scale(1.05);
}

/* Install button (only on index.html) */
.install-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: #28a745;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.install-btn:hover {
  background-color: #e6e6e6;
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .site-header .logo {
    flex-direction: column;
    align-items: flex-start;
  }
  .main-nav {
    flex-direction: column;
    gap: 1rem;
  }
}
CSS_EOF

echo "✅ navbar.css updated with new header styles"

# ------------------------------
# Update all HTML headers
# ------------------------------
find "$HTML_DIR" -type f -name "*.html" | while read file; do
  [[ "$file" == *backup_html* ]] && continue

  # Determine if install button is needed
  INSTALL_BTN=""
  if [[ "$(basename "$file")" == "index.html" ]]; then
    INSTALL_BTN='<button id="installBtn" class="install-btn" onclick="installApp()">Install App</button>'
  fi

  # Replace <header> ... </header>
  sed -i '/<header/,/<\/header>/c\
<header class="site-header">\
  <div class="logo">\
    <h1>ALIKO JB AUTOMOTIVE ENGINEERING</h1>\
    <p>Professional Vehicle Diagnostics & Electrical Solutions</p>\
  </div>\
  <nav class="main-nav">\
    <a href="index.html">Home</a>\
    <a href="Workshop.html">Workshop</a>\
    <a href="academy.html">Academy</a>\
    <a href="Services.html">Services</a>\
  </nav>\
  '"$INSTALL_BTN"'\
</header>' "$file"

  echo "✅ Updated header for $file"
done

echo "🎉 All headers and navbar CSS updated! Backups in $BACKUP_DIR"
