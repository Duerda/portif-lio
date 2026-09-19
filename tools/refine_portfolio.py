from pathlib import Path

root = Path('/home/ubuntu/portif-lio')
html = (root / 'index.html').read_text()
replacements = {
    '<h1>Ideias que viram <em>experiências.</em></h1>': '<h1>Projetos com <em>intenção.</em></h1>',
    '<p class="hero-lead">Oi, eu sou a Eduarda. Estudo Desenvolvimento de Sistemas e gosto de transformar curiosidade em interfaces, projetos e aprendizados reais.</p>': '<p class="hero-lead">Oi, eu sou a Eduarda. Estudo Desenvolvimento de Sistemas e transformo perguntas em interfaces, produtos e experiências digitais com identidade própria.</p>',
    '<span><b>10+</b> tecnologias</span>': '<span><b>07</b> projetos</span>',
    '<div class="section-kicker">03 <span>/</span> PROJETOS</div><h2>Explore o que já <em>criei.</em></h2>': '<div class="section-kicker">03 <span>/</span> PROJETOS</div><h2>Ideias, interfaces e <em>aprendizados.</em></h2>',
    '<h3>Universyn</h3><p>Um espaço de estudo que reúne tarefas, notas e ferramentas essenciais em uma experiência calma e personalizável.</p>': '<h3>Universyn</h3><p>Workspace de estudos com tarefas, notas, Pomodoro, calculadora, cronômetro e flashcards em uma experiência retro, local e personalizável.</p>',
    '<h3>Cafeteria Delícia</h3><p>Landing page para uma cafeteria de Itu, com apresentação de produtos, ambiente, contato e localização.</p>': '<h3>Cafeteria Delícia</h3><p>Landing page de uma cafeteria de Itu com narrativa de marca, cards de café e doces, carrossel, contato, mapa e apresentação do projeto.</p>',
    '<h3>SimplA</h3><p>Uma coleção de ferramentas online simples e rápidas para resolver pequenas tarefas do dia a dia.</p>': '<h3>siimpla</h3><p>Aplicação React de utilidades digitais com login, dashboard, rotas protegidas, Context API, tarefas, moedas, QR Code e remoção de fundo.</p>',
    '<h3>TCCChat</h3><p>Plataforma para conectar alunos, orientadores e coordenadores durante o desenvolvimento de trabalhos de conclusão.</p>': '<h3>TCCChat</h3><p>Plataforma colaborativa de TCC com fluxos para alunos, orientadores e coordenação: grupos, fórum, biblioteca, avaliações e progresso.</p>',
    '<h3>Checknet</h3><p>Uma ferramenta direta para consultar o tipo de conexão e a velocidade estimada da internet usando os recursos disponíveis no navegador.</p>': '<h3>CheckNet</h3><p>Ferramenta browser-first que interpreta downlink e tipo de conexão para explicar, em linguagem simples, o que a internet suporta no dia a dia.</p>',
    '<h3>Nutrify</h3><p>Conceito de interface para alimentação e saúde, com foco em clareza, confiança e hábitos mais leves.</p>': '<h3>Nutrify</h3><p>Conceito mobile de 10 telas no Figma: cadastro, onboarding de cardápio, categorias de alimentos e detalhes nutricionais com favoritos.</p>',
    '<h3>TCCChat — Design</h3><p>Arquivo de design que organiza as telas e a identidade visual da plataforma de gestão de TCC.</p>': '<h3>TCCChat — Design</h3><p>Estudo de interface que organiza fluxos, dashboards, perfis e estados do TCCChat antes da implementação do produto.</p>',
    '<span>07</span></button><button class="filter-button" data-filter="web">Web / Sites <span>05</span>': '<span>07</span></button><button class="filter-button" data-filter="web">Web / Sites <span>05</span>',
}
for old, new in replacements.items():
    if old not in html:
        print('missing:', old[:80])
    html = html.replace(old, new)
(root / 'index.html').write_text(html)
print('updated index.html')
