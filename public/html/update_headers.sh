#!/bin/bash

# Define professional header without install button
HEADER_WITHOUT_BUTTON='<header class="app-header">
  <div class="nav-container">
    <div class="logo">
      <img src="../assets/images/icon-192.png" class="app-logo" alt="ALIKO JB Logo">
      <span class="brand-title">ALIKO JB AUTOMOTIVE ENGINEERING</span>
    </div>
    <nav class="app-nav">
      <a href="index.html">Home</a>
      <a href="Workshop.html">Workshop</a>
      <a href="academy.html">Academy</a>
      <a href="Services.html">Services</a>
    </nav>
  </div>
</header>'

# Header WITH install button (for index.html)
HEADER_WITH_BUTTON='<header class="app-header">
  <div class="nav-container">
    <div class="logo">
      <img src="../assets/images/icon-192.png" class="app-logo" alt="ALIKO JB Logo">
      <span class="brand-title">ALIKO JB AUTOMOTIVE ENGINEERING</span>
    </div>
    <nav class="app-nav">
      <a href="index.html">Home</a>
      <a href="Workshop.html">Workshop</a>
      <a href="academy.html">Academy</a>
      <a href="Services.html">Services</a>
    </nav>
    <button id="installBtn" class="install-btn" onclick="installApp()">Install App</button>
  </div>
</header>'

# Backup originals
mkdir -p backup_html
cp *.html backup_html/

# Function to replace header
replace_header() {
  local file=$1
  local header_content=$2

  # Delete old header and replace with new
  awk -v h="$header_content" '
    BEGIN{inside=0}
    /<header/{inside=1; print h; next}
    /<\/header>/{inside=0; next}
    inside==0{print $0}
  ' "$file" > tmp_file && mv tmp_file "$file"
}

# Apply headers
replace_header "index.html" "$HEADER_WITH_BUTTON"
replace_header "Workshop.html" "$HEADER_WITHOUT_BUTTON"
replace_header "academy.html" "$HEADER_WITHOUT_BUTTON"
replace_header "Services.html" "$HEADER_WITHOUT_BUTTON"

echo "Headers updated successfully!"
