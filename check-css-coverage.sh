grep -R 'class="' public/html \
| sed 's/.*class="//;s/".*//' \
| tr ' ' '\n' \
| sort | uniq > /tmp/html.txt

grep -Rho '\.[a-zA-Z0-9_-]\+' public/assets/css \
| sed 's/^\.//' \
| sort | uniq > /tmp/css.txt

comm -23 /tmp/html.txt /tmp/css.txt
