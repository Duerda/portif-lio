from pathlib import Path
p = Path('/home/ubuntu/portif-lio/index.html')
s = p.read_text()
replacements = {
    'joguinho': 'snake game',
    'corinha': 'snake',
    'Corinha': 'Cobrinha',
    'corinha-canvas': 'snake-canvas',
    'corinha-section': 'snake-section',
    'corinha-heading': 'snake-heading',
    'corinha-game-card': 'snake-game-card',
    'corinha-canvas': 'snake-canvas',
    'corinha-game': 'snake-game',
    'game-instructions': 'game-instructions',
    'corinha no céu azul': 'cobrinha no céu azul',
    'Ajude a Cobrinha<br>a encontrar as <em>estrelas.</em>': 'Guie a cobrinha<br>e faça seu <em>recorde.</em>',
    'Uma pequena brincadeira feita em JavaScript, com a mesma atmosfera azul do portfólio. Mova a personagem, colete estrelas e deixe seu nome no diário.': 'Uma pequena experiência feita em JavaScript, com a mesma atmosfera azul do portfólio. Colete as estrelinhas, cresça e tente superar seu próprio recorde.',
    'Encontre 8 estrelinhas antes do tempo acabar. Cada estrela revela uma palavra que combina comigo.': 'Coma as estrelinhas, aumente sua pontuação e não bata nas bordas ou no próprio corpo.',
    'quando estiver pronta, aperte começar.': 'quando estiver pronta, aperte começar.',
}
for old, new in replacements.items():
    s = s.replace(old, new)
# Add project metadata strip to every project card just before the project-expand button.
needle = '<button class="project-expand"'
metadata = '<div class="project-meta"><span>case study</span><span>interface + código</span><span>detalhes ↗</span></div>'
s = s.replace(needle, metadata + needle)
s = s.replace('id="corinha"', 'id="snake"')
s = s.replace('href="#corinha"', 'href="#snake"')
p.write_text(s)
print('snake naming and project metadata applied')
