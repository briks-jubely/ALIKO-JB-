#!/bin/bash
# ==========================================
# Update all headers in HTML pages
# Logo + H1 + P tagline + nav
# Install button ONLY for index.html
# ==========================================

HTML_DIR="public/html"
BACKUP_DIR="$HTML_DIR/backup_html"

# 1️⃣ Make backup folder
mkdir -p "$BACKUP_DIR"

# 2️⃣ Loop through HTML pages
find "$HTML_DIR" -type f -name "*.html" | while read file; do
  # Skip backups
  [[ "$file" == *backup_html* ]] && continue

  # Backup original
  cp "$file" "$BACKUP_DIR/$(basename "$file")"

  # Determine if install button is needed
  INSTALL_BTN=""
  if [[ "$(basename "$file")" == "index.html" ]]; then
    INSTALL_BTN='<button id="installBtn" class="install-btn" onclick="installApp()">Install App</button>'
  fi

  # Overwrite header
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

echo "🎉 All headers updated! Backup copies are in $BACKUP_DIR"
