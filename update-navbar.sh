#!/bin/bash
# ================= Header + Nav CSS Loader =================
# Sasa hii script itafanya backup ya navbar.css na ku-update moja kwa moja

COMPONENTS_DIR="public/assets/css/components"
NAVBAR_CSS="$COMPONENTS_DIR/navbar.css"
BACKUP_CSS="$COMPONENTS_DIR/navbar.css.bak"

# 1️⃣ Angalia components dir ipo
if [ ! -d "$COMPONENTS_DIR" ]; then
  echo "Folder $COMPONENTS_DIR haipo!"
  exit 1
fi

# 2️⃣ Fanya backup ya zamani ikiwa ipo
if [ -f "$NAVBAR_CSS" ]; then
  cp "$NAVBAR_CSS" "$BACKUP_CSS"
  echo "✅ Backup ya zamani imeundwa: navbar.css.bak"
fi

# 3️⃣ Andika CSS mpya moja kwa moja
cat > "$NAVBAR_CSS" << 'EOF'
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

/* Optional: make header responsive */
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
EOF

echo "✅ navbar.css ime-updatewa kwa CSS mpya."
