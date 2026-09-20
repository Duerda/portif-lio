from pathlib import Path

root = Path('/home/ubuntu/portif-lio')
html_path = root / 'index.html'
js_path = root / 'script.js'
html = html_path.read_text()
js = js_path.read_text()

html_replacements = {
    'Workspace de estudos com tarefas, notas, Pomodoro, calculadora, cronômetro e flashcards em uma experiência retro, local e personalizável.': 'Workspace de estudos criado para transformar organização em rotina: reúne tarefas, notas, Pomodoro, calculadora, cronômetro e flashcards em um fluxo único, responsivo e personalizável.',
    'Landing page de uma cafeteria de Itu com narrativa de marca, cards de café e doces, carrossel, contato, mapa e apresentação do projeto.': 'Landing page institucional para uma cafeteria de Itu, desenvolvida para apresentar a marca com narrativa visual, cardápio de cafés e doces, carrossel, localização, contato e apresentação da equipe.',
    'Aplicação React de utilidades digitais com login, dashboard, rotas protegidas, Context API, tarefas, moedas, QR Code e remoção de fundo.': 'Aplicação React de utilidades digitais que combina login, dashboard, rotas protegidas e Context API com tarefas, conversor de moedas, QR Code e remoção de fundo em uma experiência responsiva.',
    'Plataforma colaborativa de TCC com fluxos para alunos, orientadores e coordenação: grupos, fórum, biblioteca, avaliações e progresso.': 'Plataforma colaborativa para acompanhar TCCs, com diferentes fluxos para alunos, orientadores e coordenação: autenticação, grupos, fórum, biblioteca, avaliações, configurações e acompanhamento de progresso.',
    'Ferramenta browser-first que interpreta downlink e tipo de conexão para explicar, em linguagem simples, o que a internet suporta no dia a dia.': 'Ferramenta browser-first que traduz dados técnicos da conexão em uma resposta compreensível, usando tipo de conexão, downlink estimado, estado de teste e atualização quando as condições mudam.',
    'Conceito mobile de 10 telas no Figma: cadastro, onboarding de cardápio, categorias de alimentos e detalhes nutricionais com favoritos.': 'Conceito mobile de 10 telas no Figma, estruturado desde cadastro e onboarding até categorias de alimentos, detalhes nutricionais e favoritos, com foco em clareza e acolhimento.',
    'Estudo de interface que organiza fluxos, dashboards, perfis e estados do TCCChat antes da implementação do produto.': 'Estudo de interface que antecipa a arquitetura do TCCChat: fluxos por perfil, dashboards, navegação, grupos, cards de progresso e estados importantes antes da implementação.'
}
for old, new in html_replacements.items():
    if old not in html:
        raise SystemExit(f'Missing HTML description: {old[:50]}')
    html = html.replace(old, new, 1)

js_replacements = {
    "problem:'Como criar um espaço de estudos que ajude a manter o foco sem parecer uma plataforma pesada, fria ou cheia de distrações?'": "problem:'Como criar um espaço de estudos que ajude a manter o foco sem parecer uma plataforma pesada, fria ou cheia de distrações, reunindo várias necessidades em uma experiência simples?'",
    "solution:'Uma experiência com landing page e workspace reunidos em um mesmo universo visual. A pessoa encontra tarefas, notas, Pomodoro, calculadora, cronômetro e flashcards com uma navegação direta.'": "solution:'Uma landing page apresenta o produto e leva para um workspace reunido no mesmo universo visual. A pessoa encontra tarefas, notas, Pomodoro, calculadora, cronômetro e flashcards em uma navegação direta, com foco em organização e continuidade.'",
    "features:['Landing page de apresentação','Workspace com ferramentas de estudo','Tarefas, notas e Pomodoro','Flashcards, calculadora e cronômetro']": "features:['Landing page de apresentação','Workspace responsivo de estudo','Tarefas, notas e Pomodoro','Notas, flashcards e calculadora','Cronômetro para apoiar a rotina']",
    "problem:'Como apresentar uma cafeteria fictícia de forma convidativa, destacando produtos, ambiente, localização e contato em uma única página?'": "problem:'Como apresentar uma cafeteria fictícia de forma convidativa, traduzindo a personalidade da marca em uma página que organize produtos, ambiente, localização e contato?'",
    "solution:'Uma landing page com narrativa de marca, navegação por seções, cards de produtos, carrossel, formulário de contato, mapa e apresentação da equipe.'": "solution:'Uma landing page responsiva com narrativa de marca, navegação por seções, cards de produtos, carrossel de imagens, formulário de contato, mapa e apresentação da equipe. O conteúdo foi organizado para conduzir a pessoa do primeiro contato até a ação.'",
    "features:['Hero e narrativa de marca','Cards de cafés e doces','Carrossel de imagens','Contato, mapa e apresentação']": "features:['Hero e narrativa de marca','Cards de cafés e doces','Carrossel e ambientação visual','Formulário e mapa de localização','Apresentação da equipe']",
    "problem:'Como reunir pequenas ferramentas úteis sem criar uma navegação confusa para quem só quer resolver uma tarefa?'": "problem:'Como reunir pequenas ferramentas úteis em um mesmo produto sem criar uma navegação confusa para quem só quer resolver uma tarefa?'",
    "solution:'Uma aplicação React com login, dashboard e rotas protegidas que reúne lista de tarefas, conversor de moedas, QR Code, remoção de fundo e outras utilidades.'": "solution:'Uma aplicação React com login, dashboard e rotas protegidas. A estrutura usa componentes e Context API para organizar lista de tarefas, conversor de moedas, QR Code, remoção de fundo e outras utilidades dentro de um mesmo sistema.'",
    "features:['Login e dashboard','Rotas protegidas','Lista de tarefas','Conversor, QR Code e remoção de fundo']": "features:['Login e dashboard','Rotas protegidas','Componentes e Context API','Lista de tarefas','Conversor, QR Code e remoção de fundo']",
    "problem:'Como organizar o acompanhamento de trabalhos de conclusão e aproximar alunos, orientadores e coordenação em um mesmo ambiente?'": "problem:'Como organizar o acompanhamento de trabalhos de conclusão e aproximar alunos, orientadores e coordenação em um mesmo ambiente, respeitando necessidades diferentes de acesso?'",
    "solution:'Uma plataforma colaborativa com login, grupos, fórum, biblioteca, avaliações e acompanhamento de progresso para diferentes papéis.'": "solution:'Uma plataforma colaborativa com autenticação, cadastros e fluxos por perfil. O sistema reúne grupos, fórum, biblioteca, avaliações, configurações e acompanhamento de progresso para apoiar o ciclo completo de um trabalho de conclusão.'",
    "features:['Fluxos para aluno e orientador','Grupos e fórum','Biblioteca de referências','Avaliações e acompanhamento']": "features:['Autenticação e cadastro','Fluxos para aluno, orientador e coordenação','Grupos e fórum','Biblioteca de referências','Avaliações e progresso']",
    "problem:'Como transformar dados técnicos de conexão em uma resposta fácil de entender para qualquer pessoa?'": "problem:'Como transformar dados técnicos de conexão em uma resposta fácil de entender, sem exigir que a pessoa conheça termos de rede?'",
    "solution:'Uma tela objetiva com ação principal, estado de carregamento e leitura da Network Information API para exibir tipo de conexão e downlink estimado.'": "solution:'Uma tela objetiva com ação principal, estado de carregamento e leitura da Network Information API. O resultado apresenta tipo de conexão e downlink estimado em uma linguagem mais próxima do uso cotidiano.'",
    "features:['Leitura da conexão do navegador','Downlink estimado','Estado de teste','Resultado em linguagem simples']": "features:['Leitura da conexão do navegador','Downlink estimado','Estado de carregamento','Atualização quando a conexão muda','Resultado em linguagem simples']",
    "problem:'Como falar sobre alimentação e bem-estar de um jeito acolhedor, claro e sem excesso de informação?'": "problem:'Como falar sobre alimentação e bem-estar de um jeito acolhedor, claro e sem excesso de informação, ajudando a pessoa a encontrar o que precisa?'",
    "solution:'Um conceito mobile com cadastro, onboarding de cardápio, categorias de alimentos, detalhes nutricionais e favoritos.'": "solution:'Um conceito mobile com cadastro, onboarding orientado por objetivos, categorias de alimentos, detalhes nutricionais e favoritos. A direção combina hierarquia, componentes e uma linguagem visual cuidadosa.'",
    "features:['Cadastro e entrada','Onboarding de objetivos','Categorias de alimentos','Cards e favoritos']": "features:['Cadastro e entrada','Onboarding de objetivos','Categorias de alimentos','Detalhes nutricionais','Cards e favoritos']",
    "problem:'Como dar direção visual ao TCCChat e organizar as principais telas antes da implementação?'": "problem:'Como dar direção visual ao TCCChat e organizar as principais telas antes da implementação, reduzindo incertezas para quem desenvolveria o produto?'",
    "solution:'Um estudo de interface com navegação, dashboards, perfis, cards de progresso, grupos e estados importantes da plataforma.'": "solution:'Um estudo de interface que organiza navegação, dashboards por perfil, perfis de usuário, cards de progresso, grupos e estados importantes da plataforma antes da implementação.'",
    "features:['Arquitetura de telas','Dashboards por perfil','Cards de progresso','Fluxos e estados de interface']": "features:['Arquitetura de telas','Dashboards por perfil','Perfis e permissões','Cards de progresso','Fluxos e estados de interface']"
}
for old, new in js_replacements.items():
    if old not in js:
        raise SystemExit(f'Missing JS data: {old[:70]}')
    js = js.replace(old, new, 1)

html_path.write_text(html)
js_path.write_text(js)
print('Enriched project summaries and case studies:', len(html_replacements), 'cards;', len(js_replacements), 'case fields')
