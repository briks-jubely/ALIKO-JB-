#!/bin/bash
HTML_DIR="public/html"
PAGES=("index.html" "Workshop.html" "academy.html" "Services.html")

for PAGE in "${PAGES[@]}"; do
  FILE="$HTML_DIR/$PAGE"
  [[ ! -f "$FILE" ]] && continue

  # Insert header at the very top of <body>
  sed -i '/<body>/a \
<header class="site-header">\
  <div class="logo">\
    <h1>ALIKO JB AUTOMOTIVE ENGINEERING</h1>\
    <p>Professional Vehicle Diagnostics & Electrical Solutions</p>\
  </div>\
</header>' "$FILE"

  echo "✅ Header added to $FILE"
done
