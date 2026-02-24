#!/bin/bash
# ========================================
# Scan all HTML pages for potential horizontal scroll
# ========================================

HTML_DIR="public/html"

echo "🔍 Checking scroll for all HTML pages in $HTML_DIR"
echo

for FILE in "$HTML_DIR"/*.html; do
    # Check if file exists
    [[ ! -f "$FILE" ]] && continue

    # Scan for elements with width > 100% or max-width issues
    HORIZ=$(grep -E "width|max-width" "$FILE" | grep -E "100%|px" )
    
    echo "==================== $(basename "$FILE") ===================="
    
    if [[ -z "$HORIZ" ]]; then
        echo "✅ No obvious horizontal scroll issues found"
    else
        echo "⚠️  Potential width causing horizontal scroll:"
        echo "$HORIZ"
    fi

    # Optional: check overflow CSS
    OVERFLOW=$(grep -E "overflow" "$FILE")
    if [[ -n "$OVERFLOW" ]]; then
        echo "ℹ️  Overflow CSS present:"
        echo "$OVERFLOW"
    fi
    
    echo
done

echo "🎉 Scroll check completed!"
