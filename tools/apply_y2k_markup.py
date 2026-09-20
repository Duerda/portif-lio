from pathlib import Path

path = Path('/home/ubuntu/portif-lio/index.html')
html = path.read_text()
old = '<div class="hero-visual reveal">\n        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>'
new = '''<div class="hero-visual reveal y2k-hero-visual">
        <div class="y2k-grid" aria-hidden="true"></div><div class="aura aura-one" aria-hidden="true"></div><div class="aura aura-two" aria-hidden="true"></div>
        <div class="wire-heart" aria-hidden="true"><svg viewBox="0 0 200 180" role="presentation"><path d="M100 160C86 143 25 108 25 57 25 22 69 12 100 48c31-36 75-26 75 9 0 51-61 86-75 103Z"/></svg></div>
        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>'''
if old not in html:
    raise SystemExit('hero marker missing')
html = html.replace(old, new, 1)
old_heading = '<p>Sites, aplicações e estudos visuais separados por área — com desafio, solução, papel, aprendizados e um preview de cada experiência.</p></div>'
new_heading = '<p>Sites, aplicações e estudos visuais separados por área — com desafio, solução, papel, aprendizados e um preview de cada experiência.</p><div class="pantone-strip" aria-label="Paleta da identidade"><i style="--swatch:#DFF3FF"></i><i style="--swatch:#8BD0F2"></i><i style="--swatch:#4E72FF"></i><i style="--swatch:#0B2140"></i></div></div>'
if old_heading not in html:
    raise SystemExit('projects heading missing')
html = html.replace(old_heading, new_heading, 1)
path.write_text(html)
print('y2k markup applied')
