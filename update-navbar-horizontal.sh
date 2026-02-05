#!/bin/bash

# 📁 Backup folder
BACKUP_DIR="public/html/backup_html"
mkdir -p "$BACKUP_DIR"

# 1️⃣ Update navbar.css
NAVBAR_CSS="public/assets/css/components/navbar.css"
cp "$NAVBAR_CSS" "$NAVBAR_CSS.bak"

cat > "$NAVBAR_CSS" << 'CSS_EOF'
/* ================= Header + Nav ================= */
.site-header {
  background-color: #28a745;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.site-header .logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
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
.main-nav {
  display: flex;
  flex-direction: row;
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
@media (max-width: 768px) {
  .site-header .logo { align-items: flex-start; }
  .main-nav { flex-direction: row; gap: 1rem; }
}
CSS_EOF

echo "✅ navbar.css updated. Backup at navbar.css.bak"

# 2️⃣ Update HTML headers (skip login.html)
find public/html -type f -name "*.html" ! -name "login.html" | while read FILE; do
  BASENAME=$(basename "$FILE")
  
  # Backup
  cp "$FILE" "$BACKUP_DIR/$BASENAME"
  echo "✅ Backup created for $FILE"

  # Determine if index.html (install button only there)
  INSTALL_BUTTON=""
  if [[ "$BASENAME" == "index.html" ]]; then
    INSTALL_BUTTON='<button id="installBtn" class="install-btn" onclick="installApp()">Install App</button>'
  fi

  # New header HTML
  HEADER_HTML="<header class=\"site-header\">
  <div class=\"logo\">
    <h1>ALIKO JB AUTOMOTIVE ENGINEERING</h1>
    <p>Professional Vehicle Diagnostics & Electrical Solutions</p>
  </div>
  <nav class=\"main-nav\">
    <a href=\"index.html\">Home</a>
    <a href=\"Workshop.html\">Workshop</a>
    <a href=\"academy.html\">Academy</a>
    <a href=\"Services.html\">Services</a>
  </nav>
  $INSTALL_BUTTON
</header>"

  # Replace old header
  awk -v newheader="$HEADER_HTML" '
    BEGIN{inside=0}
    /<header/{inside=1; print newheader; next}
    /<\/header>/{inside=0; next}
    !inside{print}
  ' "$FILE" > "$FILE.tmp" && mv "$FILE.tmp" "$FILE"

  echo "✅ Updated header for $FILE"
done

echo "🎉 All headers and navbar CSS updated!"
