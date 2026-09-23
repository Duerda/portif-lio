from pathlib import Path

p = Path('/home/ubuntu/portif-lio/index.html')
s = p.read_text()
skills = '<span>InDesign</span><span>Photoshop básico</span><span>Adobe</span><span>CapCut</span>'
s = s.replace('<span>Git / GitHub</span><span>Vercel</span><span>Figma</span><span>Canva</span><span>UI/UX</span><span>Bootstrap</span>', '<span>Git / GitHub</span><span>Vercel</span><span>Figma</span><span>Canva</span><span>UI/UX</span><span>Bootstrap</span>' + skills)
marker = '<section class="experience section" id="experiencia">'
game = '''<section class="corinha-section section" id="corinha"><div class="section-label mono">04 / UMA PAUSA INTERATIVA</div><div class="corinha-heading"><div><p class="eyebrow">MINI JOGO DE PORTFÓLIO</p><h2>Ajude a Corinha<br>a encontrar as <em>estrelas.</em></h2></div><p>Uma pequena brincadeira feita em JavaScript, com a mesma atmosfera azul do portfólio. Mova a personagem, colete estrelas e deixe seu nome no diário.</p></div><div class="corinha-game-card"><div class="game-instructions"><span class="sticker">jogar</span><p class="mono">USE AS SETAS OU WASD</p><h3>corinha no céu azul</h3><p>Encontre 8 estrelinhas antes do tempo acabar. Cada estrela revela uma palavra que combina comigo.</p><button class="game-start" type="button">começar partida <span>↗</span></button><div class="game-score"><span>estrelas <b id="game-score">0 / 8</b></span><span>tempo <b id="game-time">30s</b></span></div><p id="game-message" class="game-message">quando estiver pronta, aperte começar.</p></div><div class="game-stage"><canvas id="corinha-canvas" width="720" height="400" aria-label="Mini jogo Corinha no céu azul"></canvas><div class="game-cloud cloud-a"></div><div class="game-cloud cloud-b"></div></div></div></section>'''
if 'id="corinha"' not in s:
    s = s.replace(marker, game + '\n' + marker)
if 'href="#corinha"' not in s:
    s = s.replace('<a href="#projetos">projetos</a>', '<a href="#projetos">projetos</a><a href="#corinha">joguinho</a>')
p.write_text(s)
print('corinha section added')
