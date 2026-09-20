from pathlib import Path

path = Path('/home/ubuntu/portif-lio/index.html')
html = path.read_text()
needle = '<link rel="stylesheet" href="style.css?v=2026-portfolio">'
html = html.replace(needle, '<link rel="icon" type="image/svg+xml" href="assets/eduarda-mark.svg">\n  ' + needle, 1)
path.write_text(html)
