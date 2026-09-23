from pathlib import Path

p = Path('/home/ubuntu/portif-lio/index.html')
s = p.read_text()
replacements = {
    'Eduarda Teixeira — blue archive': 'Eduarda Teixeira — portfólio',
    'BLUE ARCHIVE / EDUARDA DE SOUZA TEIXEIRA': 'PORTFÓLIO / EDUARDA DE SOUZA TEIXEIRA',
    'abrir meu arquivo': 'ver meus projetos',
    'O CENTRO DO MEU ARQUIVO': 'O CENTRO DO MEU TRABALHO',
    'mesma atmosfera macia do meu arquivo': 'mesma atmosfera macia do meu portfólio',
    'sticker-note mono">arquivo<br>aberto<br>01 — 07': 'sticker-note mono">projetos<br>em construção<br>01 — 07',
    'Conheça a<br><em>Corinha.</em>': 'Jogue a<br><em>Cobrinha.</em>',
    'corinha no céu': 'cobrinha no céu',
    'Mini jogo Corinha no céu': 'Mini jogo Cobrinha no céu',
}
for old, new in replacements.items():
    s = s.replace(old, new)

skills_start = s.find('<section class="skills" id="skills">')
skills_end = s.find('</section>', skills_start) + len('</section>')
if skills_start >= 0 and skills_end > skills_start:
    skills = '''<section class="skills" id="skills"><div class="section-top"><span class="mono">02 / FERRAMENTAS</span><span class="side-note mono">o que eu sei<br>e continuo aprendendo.</span></div><div class="skills-intro"><div><p class="eyebrow">CONHECIMENTOS EM PRÁTICA</p><h2>Ferramentas para<br><em>tirar ideias do papel.</em></h2></div><p>Não vejo tecnologia como uma lista parada. Cada ferramenta entra no meu processo para resolver uma parte do problema: estruturar, criar, conectar, testar ou comunicar.</p></div><div class="skill-cloud"><article class="skill-card big"><span class="mono">01 / CONSTRUIR</span><strong>HTML · CSS · JavaScript</strong><p>Estruturo páginas, componentes e interações com foco em responsividade, acessibilidade e clareza.</p><div class="skill-foot"><span>PHP</span><span>React</span><span>React Native</span></div></article><article class="skill-card"><span class="mono">02 / CONECTAR</span><strong>Firebase + SQL</strong><p>Trabalho com Firestore, autenticação, CRUD, integração com banco de dados e organização de informações.</p><div class="skill-foot"><span>Firestore</span><span>Auth</span><span>CRUD</span></div></article><article class="skill-card blue"><span class="mono">03 / DESENHAR</span><strong>Figma · Canva</strong><p>Crio layouts, protótipos e direções visuais pensando em hierarquia, fluxo e experiência de uso.</p><div class="skill-foot"><span>UI/UX</span><span>prototipação</span><span>InDesign</span></div></article><article class="skill-card small"><span class="mono">04 / PUBLICAR</span><strong>GitHub · Vercel</strong><p>Organizo versões, publico projetos e acompanho o caminho entre uma ideia e uma entrega.</p><div class="skill-foot"><span>Adobe</span><span>Photoshop</span><span>CapCut</span></div></article></div></section>'''
    s = s[:skills_start] + skills + s[skills_end:]

if 'project-role-line' not in s:
    s = s.replace('<div class="project-more">', '<div class="project-role-line"><span class="mono">CASE STUDY</span><span>interface · lógica · cuidado</span></div><div class="project-more">')

p.write_text(s)
print('portfolio refined')
