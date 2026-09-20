from pathlib import Path

path = Path('/home/ubuntu/portif-lio/index.html')
html = path.read_text()
old = '<a class="logo" href="#inicio" aria-label="Eduarda, voltar ao início"><span>ET</span> Eduarda<span class="dot">.</span></a>'
new = '<a class="logo" href="#inicio" aria-label="Eduarda, voltar ao início"><img class="brand-mark" src="assets/eduarda-mark.svg" alt=""><span class="brand-name">Eduarda<span class="dot">.</span></span></a>'
if old not in html:
    raise SystemExit('old logo not found')
path.write_text(html.replace(old, new, 1))
print('brand mark integrated')
