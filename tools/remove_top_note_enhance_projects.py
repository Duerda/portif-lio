from pathlib import Path
p = Path('/home/ubuntu/portif-lio/index.html')
s = p.read_text()
old = '<div class="sticker sticker-note mono">projetos<br>em construção<br>01 — 07</div>'
s = s.replace(old, '')
s = s.replace('<p class="eyebrow">ESTUDOS DE CASO</p><h2>Projetos com<br><em>história e intenção.</em></h2>', '<p class="eyebrow">ESTUDOS DE CASO</p><h2>Projetos que<br><em>me fizeram crescer.</em></h2>')
marker = '<div class="filter-row"><span class="mono">ENCONTRAR POR ÁREA</span>'
overview = '<div class="project-overview"><div><strong>07</strong><span>projetos<br>publicados</span></div><div><strong>05</strong><span>experiências<br>web</span></div><div><strong>02</strong><span>estudos<br>de interface</span></div><div class="overview-note"><span class="mono">EM CADA PROJETO</span><p>uma pergunta, uma escolha e uma habilidade nova.</p></div></div>'
if 'class="project-overview"' not in s:
    s = s.replace(marker, overview + marker)
p.write_text(s)
print('top note removed and projects overview added')
