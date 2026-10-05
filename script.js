const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#menu');

menuButton?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open');
  menuButton.classList.toggle('open', Boolean(open));
  menuButton.setAttribute('aria-expanded', String(Boolean(open)));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menu');
}));

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('nav a[href^="#"]')];

if ('IntersectionObserver' in window) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => link.classList.toggle('current', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => activeObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));
} else {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('visible'));
}

const pageProgress = document.querySelector('.progress');
const backTop = document.querySelector('.back-top');
function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (pageProgress) pageProgress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  backTop?.classList.toggle('show', window.scrollY > 650);
}
window.addEventListener('scroll', updateScroll, { passive: true });
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
updateScroll();

const tilt = document.querySelector('.tilt-card');
if (tilt && window.matchMedia('(pointer:fine)').matches) {
  tilt.addEventListener('pointermove', (event) => {
    const rect = tilt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    tilt.style.transform = `rotateX(${-y * 6}deg) rotateY(${x * 6}deg) rotate(4deg) scale(1.02)`;
  });
  tilt.addEventListener('pointerleave', () => { tilt.style.transform = 'rotate(4deg)'; });
}

const filterButtons = [...document.querySelectorAll('.filter-button')];
const projectCards = [...document.querySelectorAll('.interactive-projects .project-card')];
const emptyProjects = document.querySelector('.project-empty');

filterButtons.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
  let visible = 0;
  projectCards.forEach((card) => {
    const matches = filter === 'all' || card.dataset.category.split(/\s+/).includes(filter);
    card.classList.toggle('is-hidden', !matches);
    if (matches) visible += 1;
  });
  if (emptyProjects) emptyProjects.hidden = visible !== 0;
}));

const caseData = {
  universyn:{eyebrow:'01 / PROJETO PESSOAL · WEB', live:'https://4173-i3ws3dt405s5p5uopkcmo-edeb783b.us4.manus.computer/', problem:'Como criar um espaço de estudos que ajude a manter o foco sem parecer uma plataforma pesada, fria ou cheia de distrações, reunindo várias necessidades em uma experiência simples?', role:'Concepção visual, estrutura de interface, organização das ferramentas e implementação da experiência responsiva.', solution:'Uma landing page apresenta o produto e leva para um workspace reunido no mesmo universo visual. A pessoa encontra tarefas, notas, Pomodoro, calculadora, cronômetro e flashcards em uma navegação direta, com foco em organização e continuidade.', features:['Landing page de apresentação','Workspace responsivo de estudo','Tarefas, notas e Pomodoro','Notas, flashcards e calculadora','Cronômetro para apoiar a rotina'], learning:'Transformar uma ideia ampla em um produto com começo, navegação clara e ações que fazem sentido para quem usa.', next:'Conectar as ferramentas a persistência de dados e evoluir o workspace para diferentes rotinas de estudo.', tech:['HTML','CSS','JavaScript','Local storage'], image:'assets/captures/universyn-home.webp'},
  cafeteria:{eyebrow:'02 / PROJETO ACADÊMICO · WEB', live:'https://landingpage-one-khaki.vercel.app/', problem:'Como apresentar uma cafeteria fictícia de forma convidativa, traduzindo a personalidade da marca em uma página que organize produtos, ambiente, localização e contato?', role:'Estrutura do site, hierarquia de informações e implementação das interações entre seções com Bootstrap e JavaScript.', solution:'Uma landing page responsiva com narrativa de marca, navegação por seções, cards de produtos, carrossel de imagens, formulário de contato, mapa e apresentação da equipe. O conteúdo foi organizado para conduzir a pessoa do primeiro contato até a ação.', features:['Hero e narrativa de marca','Cards de cafés e doces','Carrossel e ambientação visual','Formulário e mapa de localização','Apresentação da equipe'], learning:'Transformar uma identidade de marca em uma página com narrativa, pontos de contato e chamadas para ação.', next:'Aprimorar acessibilidade, validar o formulário e evoluir o conteúdo para um sistema de cardápio real.', tech:['HTML','CSS','Bootstrap','JavaScript'], image:'assets/project-previews/cafeteria-delicia-reference.png'},
  siimpla:{eyebrow:'03 / PROJETO WEB · APLICAÇÃO', live:'https://siimpla.vercel.app/', problem:'Como reunir pequenas ferramentas úteis em um mesmo produto sem criar uma navegação confusa para quem só quer resolver uma tarefa?', role:'Interface, componentização, rotas, estado com Context API e organização das páginas para desktop e mobile.', solution:'Uma aplicação React com login, dashboard e rotas protegidas. A estrutura usa componentes e Context API para organizar lista de tarefas, conversor de moedas, QR Code, remoção de fundo e outras utilidades dentro de um mesmo sistema.', features:['Login e dashboard','Rotas protegidas','Componentes e Context API','Lista de tarefas','Conversor, QR Code e remoção de fundo'], learning:'Separar responsabilidades entre componentes e perceber como pequenos detalhes de fluxo impactam a usabilidade.', next:'Conectar as ferramentas a uma conta persistente e criar uma camada mais forte de feedback e estados de erro.', tech:['React','React Router','Context API','CSS'], image:'assets/project-previews/siimpla.png'},
  tcchat:{eyebrow:'04 / PROJETO DE TCC · COLABORATIVO', live:'https://duerda.github.io/tcchat/', problem:'Como organizar o acompanhamento de trabalhos de conclusão e aproximar alunos, orientadores e coordenação em um mesmo ambiente, respeitando necessidades diferentes de acesso?', role:'Construção da experiência visual e organização das telas, contribuindo para fluxos diferentes por perfil de usuário.', solution:'Uma plataforma colaborativa com autenticação, cadastros e fluxos por perfil. O sistema reúne grupos, fórum, biblioteca, avaliações, configurações e acompanhamento de progresso para apoiar o ciclo completo de um trabalho de conclusão.', features:['Autenticação e cadastro','Fluxos para aluno, orientador e coordenação','Grupos e fórum','Biblioteca de referências','Avaliações e progresso'], learning:'Pensar produto para diferentes perfis, documentar fluxos e equilibrar muita informação sem perder a clareza.', next:'Validar os fluxos com usuários reais e estabilizar o deploy e a integração completa com Firebase.', tech:['HTML','CSS','JavaScript','Firebase'], image:'assets/project-previews/tcchat.webp'},
  checknet:{eyebrow:'05 / PROJETO WEB · INTERAÇÃO', live:'https://checknet.vercel.app/', problem:'Como transformar dados técnicos de conexão em uma resposta fácil de entender, sem exigir que a pessoa conheça termos de rede?', role:'HTML, identidade visual em CSS e interação em JavaScript, incluindo atualização quando a conexão muda.', solution:'Uma tela objetiva com ação principal, estado de carregamento e leitura da Network Information API. O resultado apresenta tipo de conexão e downlink estimado em uma linguagem mais próxima do uso cotidiano.', features:['Leitura da conexão do navegador','Downlink estimado','Estado de carregamento','Atualização quando a conexão muda','Resultado em linguagem simples'], learning:'Uma interface minimalista pode comunicar uma funcionalidade técnica com poucos elementos e uma resposta imediata.', next:'Adicionar histórico de testes, comparação de resultados e uma explicação mais acessível sobre cada métrica.', tech:['HTML','CSS','JavaScript','Web API'], image:'assets/project-previews/checknet.webp'},
  nutrify:{eyebrow:'06 / PROJETO DE DESIGN · UI', live:'https://www.figma.com/design/ZNFLzqj60k23kZNzNXCW7D/nutrify?node-id=0-1', problem:'Como falar sobre alimentação e bem-estar de um jeito acolhedor, claro e sem excesso de informação, ajudando a pessoa a encontrar o que precisa?', role:'Conceito visual no Figma, composição, paleta, estrutura de telas e consistência entre os elementos.', solution:'Um conceito mobile com cadastro, onboarding orientado por objetivos, categorias de alimentos, detalhes nutricionais e favoritos. A direção combina hierarquia, componentes e uma linguagem visual cuidadosa.', features:['Cadastro e entrada','Onboarding de objetivos','Categorias de alimentos','Detalhes nutricionais','Cards e favoritos'], learning:'Decisões visuais ajudam a comunicar o posicionamento de um produto antes mesmo de o usuário ler todo o conteúdo.', next:'Transformar o conceito visual em protótipo navegável e validar os fluxos com pessoas usuárias.', tech:['Figma','UI Design','Produto','Prototipação'], image:'assets/figma-previews/nutrify.jpg'},
  'tcchat-design':{eyebrow:'07 / DESIGN DO TCCCHAT · UI', live:'https://www.figma.com/site/St5fOKsXxBWARv4lobeiZh/Sem-t%C3%ADtulo?node-id=0-1', problem:'Como dar direção visual ao TCCChat e organizar as principais telas antes da implementação, reduzindo incertezas para quem desenvolveria o produto?', role:'Contribuição nos fluxos e na definição de uma linguagem visual para alunos, professores e coordenação.', solution:'Um estudo de interface que organiza navegação, dashboards por perfil, perfis de usuário, cards de progresso, grupos e estados importantes da plataforma antes da implementação.', features:['Arquitetura de telas','Dashboards por perfil','Perfis e permissões','Cards de progresso','Fluxos e estados de interface'], learning:'O design funciona como ponte entre regras de negócio, necessidades de usuário e desenvolvimento.', next:'Consolidar o design system e aproximar os frames do protótipo navegável e do produto implementado.', tech:['Figma','Fluxos','Identidade','UI Design'], image:''}
};
const modal = document.querySelector('#case-modal');
const closeCase = () => { modal?.classList.remove('is-open'); modal?.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); };
const openCase = (card) => {
  if (!modal) return;
  const key = card.dataset.project; const data = caseData[key]; if (!data) return; window.currentCaseKey = key;
  const text = (id, value) => { const el = document.querySelector(id); if (el) el.textContent = value; };
  text('#case-eyebrow', data.eyebrow); text('#case-title', card.querySelector('h3')?.textContent || data.eyebrow); text('#case-summary', card.querySelector('.project-info p')?.textContent || '');
  text('#case-problem', data.problem); text('#case-role', data.role); text('#case-solution', data.solution); text('#case-learning', data.learning); text('#case-next', data.next);
  const image = document.querySelector('#case-image'); if (image) { image.src = data.image || ''; image.alt = `${card.querySelector('h3')?.textContent || 'Projeto'} — preview`; image.parentElement.classList.toggle('is-empty', !data.image); }
  const list = document.querySelector('#case-features'); if (list) list.innerHTML = data.features.map(item => `<li>${item}</li>`).join('');
  const tech = document.querySelector('#case-tech'); if (tech) tech.innerHTML = data.tech.map(item => `<span>${item}</span>`).join('');
  const github = card.querySelector('.project-more>a')?.href || card.querySelector('.project-go')?.href; const githubLink = document.querySelector('#case-github'); if (githubLink) { githubLink.href = github || data.live; githubLink.textContent = github ? 'Ver código ↗' : 'Ver design ↗'; }
  const live = document.querySelector('#case-live'); if (live) { live.href = data.live; live.textContent = key === 'nutrify' || key === 'tcchat-design' ? 'Abrir design ↗' : 'Ver projeto ao vivo ↗'; }
  modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); modal.querySelector('.case-close')?.focus();
};
document.querySelectorAll('.project-expand').forEach(button => button.addEventListener('click', () => openCase(button.closest('.project-card'))));
modal?.querySelectorAll('[data-case-close]').forEach(item => item.addEventListener('click', closeCase));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeCase(); });




/* MIMI — jogo de vestir por camadas, com uma única bonequinha */
(() => {
  const canvas=document.querySelector('#dressup-canvas'); if(!canvas)return;
  const ctx=canvas.getContext('2d'); ctx.imageSmoothingEnabled=false;
  const buttons=[...document.querySelectorAll('.mimi-choice')], tabs=[...document.querySelectorAll('.mimi-tab')], panels=[...document.querySelectorAll('.mimi-slot')], scenes=[...document.querySelectorAll('.scene-button')];
  const message=document.querySelector('#game-message'), stageLook=document.querySelector('#stage-look');
  const state={hair:'brown',top:'jacket',bottom:'skirt',shoes:'boots',accessory:'bow',scene:'wood'}; let frame=0, lookNumber=1;
  const copy={
    hair:{brown:'castanho',cocoa:'chanel',honey:'presilha'},top:{jacket:'jaqueta azul',sweater:'tricô fofo',hoodie:'moletom',raincoat:'capa chuva'},bottom:{skirt:'saia azul',shorts:'short jeans',tutu:'tutu rosa'},shoes:{boots:'botinhas',sneakers:'tênis',maryjanes:'boneca'},accessory:{bow:'laço azul',flower:'florzinha',headphones:'fone',none:'sem detalhe'}
  };
  const rect=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
  const drawScene=()=>{
    const s=state.scene; ctx.clearRect(0,0,180,230);
    if(s==='wood'){rect(0,0,180,230,'#c99572');for(let x=8;x<180;x+=32){rect(x,0,3,230,'#b5795e');rect(x+5,0,2,230,'#e1b28c')}for(let y=26;y<230;y+=42){rect(0,y,180,2,'#d9a07b');}rect(20,49,37,51,'#9a654e');rect(25,54,27,41,'#b47759');rect(122,46,37,53,'#e5b58e');rect(127,51,27,43,'#f0c9a0');}
    if(s==='garden'){rect(0,0,180,230,'#a8d1bb');rect(0,145,180,85,'#79ad76');for(let x=10;x<180;x+=30){rect(x,128,3,33,'#5d9362');rect(x-7,128,15,4,'#5d9362')}rect(25,34,3,3,'#fff0a3');rect(144,55,3,3,'#fff0a3');rect(31,118,5,5,'#f7a8a8');rect(139,111,5,5,'#f7d474')}
    if(s==='night'){rect(0,0,180,230,'#273953');rect(0,151,180,79,'#1e2a43');rect(24,25,42,42,'#f5e6aa');rect(29,30,34,32,'#fff2bf');rect(100,23,3,3,'#f8de88');rect(133,48,3,3,'#f8de88');rect(20,129,4,4,'#d9e7ff');rect(153,93,3,3,'#d9e7ff')}
  };
  const draw=()=>{
    const bob=Math.round(Math.sin(frame/18)*2), blink=Math.floor(frame%180)>174; drawScene();
    const skin='#f6d9c5', skinLight='#ffe9db', skinShade='#dfb29e';
    const hair=state.hair==='cocoa'?'#302129':state.hair==='honey'?'#38231f':'#241c23';
    const hairMid='#3a2930', hairLight='#52383b', hairGlint='#68484a';
    rect(50,207,78,4,'#765043');rect(60,211,58,2,'#a26f57');
    // Silhueta traseira: cabelo comprido em ondas assimétricas, feito em degraus.
    rect(67,35+bob,45,8,hair);rect(60,40+bob,60,9,hair);rect(56,47+bob,68,12,hair);
    rect(52,55+bob,15,15,hair);rect(49,67+bob,15,15,hair);rect(51,80+bob,15,15,hair);rect(55,92+bob,14,15,hair);rect(52,104+bob,15,13,hair);rect(56,115+bob,13,13,hair);rect(62,126+bob,10,5,hair);
    rect(113,54+bob,15,15,hair);rect(117,66+bob,15,15,hair);rect(116,79+bob,15,15,hair);rect(111,91+bob,15,15,hair);rect(115,103+bob,14,14,hair);rect(111,115+bob,13,12,hair);rect(106,125+bob,10,6,hair);
    // Camadas alternadas de sombra e brilho para dar volume às ondas.
    rect(53,62+bob,5,9,hairMid);rect(59,75+bob,5,8,hairLight);rect(55,88+bob,5,9,hairMid);rect(59,101+bob,5,9,hairLight);rect(56,113+bob,5,9,hairMid);rect(62,122+bob,5,7,hairLight);
    rect(121,61+bob,5,9,hairMid);rect(118,74+bob,5,9,hairLight);rect(122,87+bob,5,9,hairMid);rect(117,100+bob,5,9,hairLight);rect(119,112+bob,5,9,hairMid);rect(112,122+bob,5,7,hairLight);
    rect(68,40+bob,9,3,hairLight);rect(81,38+bob,11,3,hairMid);rect(99,40+bob,10,3,hairGlint);rect(65,48+bob,6,3,hairGlint);rect(107,48+bob,7,3,hairMid);
    // Orelhas, pescoço e rosto claro com contorno de pixels macio.
    rect(61,68+bob,7,14,skinShade);rect(63,69+bob,5,11,skin);rect(112,68+bob,7,14,skinShade);rect(112,69+bob,5,11,skin);
    rect(67,49+bob,45,5,skin);rect(64,54+bob,51,9,skin);rect(63,62+bob,54,20,skin);rect(65,81+bob,50,10,skin);rect(70,90+bob,40,7,skin);rect(77,96+bob,27,5,skin);
    rect(76,99+bob,27,13,skin);rect(78,99+bob,22,3,skinLight);
    // Franja em cachos pixelados, aberta no centro para deixar os olhos livres.
    rect(66,47+bob,49,7,hair);rect(63,51+bob,12,8,hair);rect(69,55+bob,10,5,hairMid);rect(77,51+bob,12,10,hair);rect(84,55+bob,8,6,hairLight);
    rect(91,50+bob,12,10,hair);rect(97,55+bob,9,5,hairMid);rect(103,50+bob,11,8,hair);rect(108,55+bob,7,6,hairLight);
    // Mechas laterais curvas que emolduram o rosto e se unem às ondas longas.
    rect(63,58+bob,6,12,hair);rect(65,68+bob,6,10,hairMid);rect(63,77+bob,7,11,hair);rect(66,86+bob,7,10,hairMid);rect(70,94+bob,6,6,hair);
    rect(111,58+bob,6,12,hair);rect(110,68+bob,6,10,hairMid);rect(112,77+bob,7,11,hair);rect(109,86+bob,7,10,hairMid);rect(106,94+bob,6,6,hair);
    rect(65,62+bob,3,6,hairGlint);rect(67,81+bob,3,6,hairLight);rect(112,61+bob,3,6,hairGlint);rect(110,81+bob,3,6,hairLight);
    // Sobrancelhas delicadas e olhos verde-avelã com aro, profundidade e brilhos.
    rect(72,60+bob,5,2,hairMid);rect(77,58+bob,7,2,hairMid);rect(98,58+bob,7,2,hairMid);rect(105,60+bob,5,2,hairMid);
    if(blink){rect(73,69+bob,12,2,'#493637');rect(97,69+bob,12,2,'#493637');rect(74,71+bob,10,1,'#b87972');rect(98,71+bob,10,1,'#b87972')}
    else{
      rect(72,63+bob,14,14,'#493638');rect(96,63+bob,14,14,'#493638');
      rect(73,64+bob,12,12,'#fffaf1');rect(97,64+bob,12,12,'#fffaf1');
      rect(75,65+bob,8,10,'#755b3d');rect(99,65+bob,8,10,'#755b3d');
      rect(76,65+bob,7,9,'#91a965');rect(100,65+bob,7,9,'#91a965');
      rect(78,66+bob,4,7,'#52663f');rect(102,66+bob,4,7,'#52663f');
      rect(79,66+bob,3,6,'#29332d');rect(103,66+bob,3,6,'#29332d');
      rect(74,64+bob,4,3,'#fff');rect(98,64+bob,4,3,'#fff');rect(82,71+bob,2,2,'#e6f0cf');rect(106,71+bob,2,2,'#e6f0cf');
      rect(72,62+bob,5,2,hairMid);rect(81,63+bob,4,2,hairMid);rect(96,63+bob,4,2,hairMid);rect(105,62+bob,5,2,hairMid);
    }
    // Blush discreto, nariz mínimo e sorriso pequeno e acolhedor.
    rect(70,81+bob,4,2,'#edb5a9');rect(74,82+bob,5,3,'#f0bdb1');rect(79,81+bob,3,2,'#edb5a9');
    rect(103,81+bob,3,2,'#edb5a9');rect(106,82+bob,5,3,'#f0bdb1');rect(111,81+bob,3,2,'#edb5a9');
    rect(89,78+bob,3,3,skinShade);rect(91,80+bob,3,2,'#cf9183');
    rect(86,88+bob,9,2,'#a95f68');rect(84,87+bob,3,2,'#a95f68');rect(95,87+bob,3,2,'#a95f68');rect(88,90+bob,7,1,'#da8790');
    // Pernas em tom de pele consistente.
    rect(70,169+bob,16,34,skin);rect(101,169+bob,16,34,skin);rect(71,170+bob,3,24,skinLight);rect(102,170+bob,3,24,skinLight);
    // Saia / parte inferior combinável.
    if(state.bottom==='skirt'){rect(63,133+bob,61,10,'#8fc6e2');rect(57,142+bob,73,31,'#78b2d4');rect(63,168+bob,61,7,'#4b86ad');rect(73,143+bob,6,26,'#a9d8ea');rect(101,143+bob,6,26,'#a9d8ea')}
    if(state.bottom==='shorts'){rect(64,135+bob,59,17,'#527fa3');rect(64,148+bob,27,22,'#416981');rect(95,148+bob,28,22,'#416981');rect(91,151+bob,4,19,skin)}
    if(state.bottom==='tutu'){rect(60,137+bob,67,9,'#f3a3c0');rect(54,146+bob,79,22,'#f6c9df');rect(61,155+bob,65,18,'#e994bc');rect(56,143+bob,73,3,'#fff1f5')}
    // Blusas e jaqueta preservam o look inicial azul e rosa.
    if(state.top==='jacket'){rect(69,99+bob,51,39,'#72b7d9');rect(63,107+bob,12,38,'#92cde6');rect(113,107+bob,12,38,'#92cde6');rect(82,100+bob,25,37,'#e84e9a');rect(85,102+bob,5,6,'#ffc6dc');rect(99,102+bob,5,6,'#ffc6dc');rect(87,110+bob,3,3,'#fff0c9');rect(87,120+bob,3,3,'#fff0c9');rect(82,128+bob,25,4,'#c93b84')}
    if(state.top==='sweater'){rect(68,100+bob,57,42,'#f0b47e');rect(62,109+bob,12,35,'#e8a36e');rect(116,109+bob,12,35,'#e8a36e');rect(82,108+bob,29,5,'#fff0c8');rect(89,119+bob,15,5,'#d88966')}
    if(state.top==='hoodie'){rect(66,101+bob,60,43,'#906eb0');rect(59,111+bob,13,35,'#80609d');rect(119,111+bob,13,35,'#80609d');rect(80,101+bob,32,17,'#6b508a');rect(85,112+bob,20,4,'#e6b1cf')}
    if(state.top==='raincoat'){rect(67,99+bob,58,46,'#e2b84e');rect(60,108+bob,13,38,'#d9aa3b');rect(118,108+bob,13,38,'#d9aa3b');rect(83,101+bob,26,43,'#f7dd77');rect(87,111+bob,18,4,'#9a7650')}
    // Braços e mãos em pele clara, com as mangas por cima dos ombros.
    rect(57,117+bob,10,27,skin);rect(123,117+bob,10,27,skin);rect(54,138+bob,14,8,skin);rect(122,138+bob,14,8,skin);rect(56,139+bob,5,3,skinLight);rect(124,139+bob,5,3,skinLight);
    // Sapatos combináveis.
    if(state.shoes==='boots'){rect(67,198+bob,22,10,'#292d3b');rect(99,198+bob,22,10,'#292d3b');rect(70,195+bob,16,6,'#5e80a0');rect(102,195+bob,16,6,'#5e80a0')}
    if(state.shoes==='sneakers'){rect(66,198+bob,25,8,'#fff');rect(98,198+bob,25,8,'#fff');rect(70,195+bob,16,5,'#e85d79');rect(102,195+bob,16,5,'#e85d79')}
    if(state.shoes==='maryjanes'){rect(67,198+bob,22,9,'#8e4e64');rect(100,198+bob,22,9,'#8e4e64');rect(72,197+bob,14,3,'#f6d16e');rect(105,197+bob,14,3,'#f6d16e')}
    // Acessórios continuam componíveis sobre o cabelo detalhado.
    if(state.accessory==='bow'){rect(64,31+bob,18,12,'#4f87ad');rect(104,31+bob,18,12,'#4f87ad');rect(68,33+bob,10,7,'#7eb8db');rect(108,33+bob,10,7,'#7eb8db');rect(80,34+bob,26,8,'#5794bd');rect(85,32+bob,13,12,'#9ed5ed');rect(69,33+bob,4,3,'#d8f2fa');rect(111,33+bob,4,3,'#d8f2fa')}
    if(state.accessory==='flower'){rect(110,39+bob,5,5,'#f2bd52');rect(106,35+bob,5,5,'#e86b7e');rect(114,35+bob,5,5,'#e86b7e');rect(110,31+bob,5,5,'#e86b7e')}
    if(state.accessory==='headphones'){rect(60,48+bob,5,30,'#e44974');rect(115,48+bob,5,30,'#e44974');rect(64,43+bob,52,5,'#e44974');rect(57,73+bob,10,12,'#e44974');rect(113,73+bob,10,12,'#e44974')}
    if(state.accessory==='none'){rect(76,39+bob,5,4,hair);rect(99,39+bob,5,4,hair)}
  };
  const updateMessage=()=>{const parts=Object.values(state).slice(0,5).map((v,i)=>Object.values(copy)[i][v]);message.textContent=`Mimi escolheu ${parts[1]}, ${parts[2]} e ${parts[4]}.`};
  buttons.forEach(button=>button.addEventListener('click',()=>{const slot=button.dataset.slot;state[slot]=button.dataset.value;buttons.filter(b=>b.dataset.slot===slot).forEach(b=>b.classList.toggle('is-selected',b===button));lookNumber=(lookNumber%9)+1;stageLook.textContent=String(lookNumber).padStart(2,'0');document.querySelector('#game-look').textContent=`Mimi ${String(lookNumber).padStart(2,'0')}`;updateMessage()}));
  tabs.forEach(tab=>tab.addEventListener('click',()=>{const slot=tab.dataset.slotTab;tabs.forEach(t=>t.classList.toggle('is-active',t===tab));panels.forEach(p=>p.classList.toggle('is-visible',p.dataset.slotPanel===slot))}));
  scenes.forEach(scene=>scene.addEventListener('click',()=>{state.scene=scene.dataset.scene;scenes.forEach(s=>s.classList.toggle('is-selected',s===scene))}));
  document.querySelector('.mimi-random')?.addEventListener('click',()=>{Object.keys(state).slice(0,5).forEach(slot=>{const choices=buttons.filter(b=>b.dataset.slot===slot);const choice=choices[Math.floor(Math.random()*choices.length)];state[slot]=choice.dataset.value;choices.forEach(b=>b.classList.toggle('is-selected',b===choice))});lookNumber=(lookNumber%9)+1;stageLook.textContent=String(lookNumber).padStart(2,'0');document.querySelector('#game-look').textContent=`Mimi ${String(lookNumber).padStart(2,'0')}`;updateMessage()});
  document.querySelector('.mimi-reset')?.addEventListener('click', () => {
    Object.assign(state, {hair:'brown', top:'jacket', bottom:'skirt', shoes:'boots', accessory:'bow', scene:'wood'});
    buttons.forEach(b => b.classList.toggle('is-selected', (b.dataset.slot === 'hair' && b.dataset.value === 'brown') || (b.dataset.slot === 'top' && b.dataset.value === 'jacket') || (b.dataset.slot === 'bottom' && b.dataset.value === 'skirt') || (b.dataset.slot === 'shoes' && b.dataset.value === 'boots') || (b.dataset.slot === 'accessory' && b.dataset.value === 'bow')));
    scenes.forEach(s => s.classList.toggle('is-selected', s.dataset.scene === 'wood'));
    lookNumber = 1; stageLook.textContent = '01'; document.querySelector('#game-look').textContent = 'Mimi 01'; updateMessage();
  });
  const animate=()=>{frame++;draw();requestAnimationFrame(animate)};draw();animate();
})();
/* LANGUAGE SWITCHER — Portuguese / English */
(() => {
  const toggle = document.querySelector('.language-toggle');
  if (!toggle) return;
  let lang = localStorage.getItem('portfolio-language') || 'pt';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const set = (selector, value) => { const el = $(selector); if (el) el.innerHTML = value; };
  const setText = (selector, value) => { const el = $(selector); if (el) el.textContent = value; };
  const projectCopy = {
    universyn:{kind:'DIGITAL PRODUCT · ORGANIZATION',desc:'Study workspace bringing tasks, notes, Pomodoro, calculator, timer and flashcards into one environment. The goal is to help people start and maintain a routine without getting lost across multiple tools.',role:'Concept, interface, structure and responsive implementation.',practice:'Product flow, interface states and JavaScript.',details:[['CHALLENGE','Create focus without building a heavy or distracting platform.'],['SOLUTION','Study tools organized in one continuous navigation.'],['LEARNING','Turning a broad idea into clear steps and actions.'],['NEXT STEP','Add data persistence and personalized routines.'],],link:'view complete code'},
    cafeteria:{kind:'LANDING PAGE · BRAND',desc:'Landing page created to present a coffee shop in an inviting way, guiding people through products, atmosphere, location and contact.',role:'Structure, hierarchy, content and interactions.',practice:'Brand storytelling, Bootstrap and JavaScript.',details:[['CHALLENGE','Present products and personality without making the page confusing.'],['SOLUTION','A visual journey from discovery to contact.'],['LEARNING','How a brand can find its voice through interface.'],['NEXT STEP','Validate accessibility and turn the content into a real menu.']],link:'view complete code'},
    siimpla:{kind:'APPLICATION · UTILITIES',desc:'React application gathering small tools for everyday tasks: login, dashboard, task list, currency converter, QR Code and background removal.',role:'Interface, routes, state and component architecture.',practice:'React Router and Context API.',details:[['CHALLENGE','Gather useful tools without confusing someone who needs one quick action.'],['SOLUTION','A dashboard built with components and protected routes.'],['LEARNING','Separating responsibilities and thinking through application states.'],['NEXT STEP','Connect a persistent account and improve error feedback.']],link:'view complete code'},
    tcchat:{kind:'PLATFORM · COLLABORATION',desc:'Platform designed to connect students, advisors and coordinators throughout the development of final projects.',role:'Visual experience, screens and profile-based flows.',practice:'Firebase, authentication and information architecture.',details:[['CHALLENGE','Organize different needs in one shared environment.'],['SOLUTION','Specific flows for students, advisors and coordination.'],['LEARNING','Designing for several profiles without losing clarity.'],['NEXT STEP','Validate flows with real users and stabilize deployment.']],link:'view code and documentation'},
    checknet:{kind:'TOOL · WEB API',desc:'Tool that turns technical connection data into a simple answer about what the network is offering at that moment.',role:'HTML, visual direction and JavaScript.',practice:'Network Information API and loading states.',details:[['CHALLENGE','Explain network information without requiring technical knowledge.'],['SOLUTION','An objective screen with an immediate answer.'],['LEARNING','A minimal interface can communicate a complex function.'],['NEXT STEP','Add history and comparison of results.']],link:'view complete code'},
    nutrify:{kind:'UI DESIGN · PRODUCT',desc:'Mobile concept with 10 screens for sign-up, onboarding, food categories, nutrition details and favorites.',role:'Visual concept, palette and screen structure.',practice:'Components, hierarchy and prototyping.',details:[['GOAL','Talk about well-being in a welcoming and clear way.'],['DIRECTION','A light, organized and trustworthy interface.'],['LEARNING','Visual language communicates positioning before text.'],['NEXT STEP','Turn the concept into a navigable prototype.']],link:'open in Figma'},
    'tcchat-design':{kind:'DESIGN · ARCHITECTURE',desc:'Visual study organizing dashboards, profiles, permissions, groups and states before implementation.',role:'Flows and visual language for different user profiles.',practice:'Screen architecture and design system.',details:[['GOAL','Give the product shape before building it.'],['STRUCTURE','Dashboards, profiles, groups and progress.'],['LEARNING','Design connects rules, people and development.'],['NEXT STEP','Consolidate the design system in a navigable prototype.']],link:'open in Figma'}
  };
  const text = {
    en:{nav:['about','skills','projects','play','contact'],heroEyebrow:'PORTFOLIO / EDUARDA DE SOUZA TEIXEIRA',hero:'I turn<br><em>curiosity</em><br>into products.',intro:'Developer in training, Systems Development student and creator of digital experiences that mix code, design and the joy of discovering.',projectsButton:'view my projects',aboutLabel:'01 / ABOUT ME',aboutNote:'still learning,<br>already creating.',aboutEyebrow:'NICE TO MEET YOU, I AM EDUARDA',aboutTitle:'A <em>curious</em><br>mind.',skillsLabel:'02 / TOOLS',projectsLabel:'03 / PROJECTS',gameLabel:'04 / PLAYGROUND',experienceLabel:'05 / PRACTICAL EXPERIENCE',contactLabel:'06 / CONTACT',projectSide:'what I created<br>to learn by doing.',projectIntro:'Every project shows part of my process: the problem I found, the decisions I made, what I built and what I still want to improve.',filters:['all','web','mobile','academic','personal'],gameTitle:'Dress up<br><em>the Dev.</em>',gameIntro:'A brand-new dress-up game: choose Mimi’s clothes, switch the scene and build a look with your own mood.',gameBadge:'✦ studio open',gameControls:'STYLE MIMI',gameName:'style your Dev',gameDesc:'She is always the same girl: dark wavy hair, hazel-green eyes and lots of personality. You decide how she goes out for the day.',start:'choose your look',stars:'look',time:'mood',gameReady:'Mimi is ready for her first little adventure.',experienceTitle:'Learning<br>by doing.',experienceText:'I am building my first formal professional experience, but I have already developed complete systems and interfaces from concept to implementation.',contactTitle:'Let’s create<br>something <em>beautiful?</em>',contactText:'I am looking for an internship or first opportunity in technology, systems development or digital media.',email:'send an email',modalLabels:['WHAT THIS PROJECT SOLVES','MY CONTRIBUTION','HOW I THOUGHT ABOUT IT','WHAT WAS BUILT','TECHNOLOGIES','WHAT I LEARNED','NEXT STEP']},
    pt:{nav:['sobre','skills','projetos','play','contato'],heroEyebrow:'PORTFÓLIO / EDUARDA DE SOUZA TEIXEIRA',hero:'Eu transformo<br><em>curiosidade</em><br>em produto.',intro:'Desenvolvedora em formação, estudante de Desenvolvimento de Sistemas e criadora de experiências digitais que misturam código, design e vontade de descobrir.',projectsButton:'ver meus projetos',aboutLabel:'01 / QUEM ESTÁ POR TRÁS',aboutNote:'ainda aprendendo,<br>já fazendo.',aboutEyebrow:'PRAZER, EU SOU A EDUARDA',aboutTitle:'Uma mente<br><em>curiosa.</em>',skillsLabel:'02 / FERRAMENTAS',projectsLabel:'03 / PROJETOS',gameLabel:'04 / PLAYGROUND',experienceLabel:'05 / EXPERIÊNCIA PRÁTICA',contactLabel:'06 / CONTATO',projectSide:'o que eu criei<br>para aprender fazendo.',projectIntro:'Cada projeto mostra uma parte do meu processo: o problema que encontrei, as decisões que tomei, o que eu construí e o que ainda quero melhorar.',filters:['todos','web','mobile','acadêmicos','pessoais'],gameTitle:'Vista a<br><em>Dev.</em>',gameIntro:'Uma nova brincadeira de vestir: escolha as roupas da Mimi, troque o cenário e monte um look com o seu humor.',gameBadge:'✦ ateliê aberto',gameControls:'MONTE A MIMI',gameName:'monte seu look',gameDesc:'Ela é sempre a mesma menina: cabelo escuro e ondulado, olhos verde-avelã e muita personalidade. Agora você decide como ela sai para o dia.',start:'escolha seu look',stars:'look',time:'humor',gameReady:'a Mimi está pronta para o primeiro passeio.',experienceTitle:'Aprender<br>fazendo.',experienceText:'Ainda estou construindo minha primeira experiência profissional formal, mas já desenvolvi sistemas e interfaces completos do conceito à implementação.',contactTitle:'Vamos criar<br>algo <em>bonito?</em>',contactText:'Estou buscando uma oportunidade de estágio ou primeira experiência em tecnologia, desenvolvimento de sistemas ou meios digitais.',email:'enviar e-mail',modalLabels:['O QUE ESTE PROJETO RESOLVE','MINHA CONTRIBUIÇÃO','COMO PENSEI','O QUE FOI CONSTRUÍDO','TECNOLOGIAS','O QUE APRENDI','PRÓXIMO PASSO']}
  };
  const apply = () => {
    const t = text[lang]; document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.title = lang === 'en' ? 'Eduarda Teixeira — portfolio' : 'Eduarda Teixeira — portfólio';
    $$('nav a').forEach((a,i) => { if(t.nav[i]) a.textContent=t.nav[i]; });
    set('.hero .eyebrow',t.heroEyebrow); set('.hero h1',t.hero); setText('.hero-intro',t.intro); setText('.hero-cta .btn.solid',t.projectsButton+' ↓');
    setText('#sobre .section-top>span:first-child',t.aboutLabel); set('#sobre .side-note',t.aboutNote); setText('#sobre .eyebrow',t.aboutEyebrow); set('#sobre h2',t.aboutTitle);
    setText('#skills .section-top>span:first-child',t.skillsLabel); setText('#projetos .section-top>span:first-child',t.projectsLabel); setText('#game .section-top>span:first-child',t.gameLabel); setText('#experiencia .section-top>span:first-child',t.experienceLabel); setText('#contato .contact-paper>.mono',t.contactLabel);
    setText('.projects .side-note',t.projectSide); setText('.projects-intro>p',t.projectIntro); set('#game h2',t.gameTitle); setText('.game-heading>p',t.gameIntro); setText('.game-badge',t.gameBadge); setText('.game-copy>.mono',t.gameControls); setText('.game-copy h3',t.gameName); setText('.game-copy>p:not(.mono):not(.game-message)',t.gameDesc); setText('.game-start',t.start+' ↗'); set('.game-stats span:first-child',`${t.stars} <b id="game-look">Mimi 01</b>`); set('.game-stats span:nth-child(2)',`${t.time} <b>ativa</b>`); setText('#game-message',t.gameReady);
    set('#experiencia h2',t.experienceTitle); setText('#experiencia .experience-grid>div>p',t.experienceText); set('#contato h2',t.contactTitle); setText('#contato .contact-paper>p',t.contactText); setText('.contact-links .btn',t.email+' ↗');
    if(lang==='en'){
      const about=['I have knowledge in Systems Development, mainly HTML, CSS, JavaScript, PHP, React and React Native. I also work with Firebase and intermediate SQL, authentication, CRUD, database integration and responsive interfaces.','In design, I am comfortable with Canva and have experience with Figma for layouts and prototypes. I have also used InDesign, have basic knowledge of Photoshop and other Adobe tools, and use CapCut to edit videos and content.','Alongside academic projects, I create personal projects to practice and learn new technologies. I am curious, learn quickly and enjoy looking for solutions when I find something I do not know yet.']; $$('.manifesto-text>p').forEach((el,i)=>{if(about[i])el.textContent=about[i];}); set('.signature','made with<br><em>curiosity + care</em> <span>✦</span>');
      setText('#skills .skills-intro>p','My toolbox follows the whole path of a project: I start by understanding the idea, organize the interface, build the logic, connect the data and take care of delivery.');
      const tools=[['BUILD','From the first element<br>to a responsive product.','I use HTML, CSS and JavaScript to create pages and interactions. With React and React Native, I organize screens into components and think about different screen sizes from the start.','I apply it to: landing pages, dashboards, applications and mobile interfaces.'],['CONNECT','Data that supports<br>a good experience.','I have intermediate experience with Firebase, Firestore and SQL. I also study authentication, CRUD and database integration to create products that go beyond appearance.','I apply it to: login, sign-ups, permissions, lists, progress and persistence.'],['DESIGN','Before the code,<br>I organize the idea.','I use Figma and Canva to create layouts, prototypes and visual directions. I also have contact with InDesign, basic Photoshop and Adobe tools for composition and editorial work.','I apply it to: wireframes, prototypes, identities, presentations and flows.'],['DELIVER','Organization to<br>take ideas into the world.','I use Git and GitHub to track versions and Vercel to publish projects. I also use CapCut to edit videos and content that helps present an idea.','I apply it to: documentation, publishing, portfolios and product presentations.']]; $$('.tool-panel').forEach((el,i)=>{const d=tools[i];if(!d)return;el.querySelector('.tool-top .mono').textContent=d[0];el.querySelector('h3').innerHTML=d[1];el.querySelector('p').textContent=d[2];el.querySelector('.tool-note').textContent=d[3];});
      setText('.project-overview .overview-note .mono','IN EVERY PROJECT'); setText('.project-overview .overview-note p','a question, a choice and a new skill.'); setText('.project-overview>div:nth-child(1) span','published\nprojects'); setText('.project-overview>div:nth-child(2) span','web\nexperiences'); setText('.project-overview>div:nth-child(3) span','interface\nstudies'); setText('.filter-row>span','FIND BY AREA');
      const exp=['logical thinking and problem solving','organization and attention to detail','proactivity and willingness to learn','creativity to build digital solutions']; $$('#experiencia li').forEach((el,i)=>{if(exp[i])el.textContent=exp[i];}); $$('.project-card .case-columns div:first-child b').forEach(el=>el.textContent='my role'); $$('.project-card .case-columns div:nth-child(2) b').forEach(el=>el.textContent='what I practiced'); const labels=['PERSONAL / WEB','ACADEMIC / WEB','WEB / REACT','ACADEMIC / TCC','WEB / INTERACTION','FIGMA / MOBILE','FIGMA / UI']; $$('.project-card .label').forEach((el,i)=>{if(labels[i])el.textContent=labels[i];}); setText('.frame i','in motion');
    } else { const about=['Tenho conhecimentos em Desenvolvimento de Sistemas, principalmente em HTML, CSS, JavaScript, PHP, React e React Native. Também trabalho com Firebase e SQL em nível intermediário, autenticação, CRUD, integração com banco de dados e interfaces responsivas.','Na área de design, tenho facilidade com Canva e experiência com Figma para layouts e protótipos. Também já utilizei InDesign, tenho conhecimentos básicos em Photoshop e outras ferramentas da Adobe, além de usar CapCut para edição de vídeos e conteúdos.','Além dos projetos acadêmicos, desenvolvo projetos próprios para praticar e aprender tecnologias novas. Sou curiosa, tenho facilidade para aprender e gosto de buscar soluções quando encontro algo que ainda não sei fazer.']; $$('.manifesto-text>p').forEach((el,i)=>{if(about[i])el.textContent=about[i];}); set('.signature','feito com<br><em>curiosidade + cuidado</em> <span>✦</span>'); setText('#skills .skills-intro>p','Minha caixa de ferramentas acompanha o caminho inteiro de um projeto: começo entendendo a ideia, organizo a interface, construo a lógica, conecto os dados e cuido da entrega.'); const tools=[['CONSTRUIR','Do primeiro elemento<br>ao produto responsivo.','Uso HTML, CSS e JavaScript para criar páginas e interações. Com React e React Native, organizo telas em componentes e penso nos diferentes tamanhos de tela desde o começo.','aplico em: landing pages, dashboards, aplicações e interfaces mobile.'],['CONECTAR','Dados que sustentam<br>uma boa experiência.','Tenho experiência intermediária com Firebase, Firestore e SQL. Também estudo autenticação, CRUD e integração com banco para criar produtos que vão além da aparência.','aplico em: login, cadastros, permissões, listas, progresso e persistência.'],['DESENHAR','Antes do código,<br>eu organizo a ideia.','Uso Figma e Canva para criar layouts, protótipos e direções visuais. Também tenho contato com InDesign, Photoshop básico e ferramentas Adobe para composição e diagramação.','aplico em: wireframes, protótipos, identidades, apresentações e fluxos.'],['ENTREGAR','Organização para<br>tirar do computador.','Uso Git e GitHub para acompanhar versões e Vercel para publicar projetos. Também uso CapCut na edição de vídeos e conteúdos que ajudam a apresentar uma ideia.','aplico em: documentação, publicação, portfólio e apresentação de produto.']]; $$('.tool-panel').forEach((el,i)=>{const d=tools[i];if(!d)return;el.querySelector('.tool-top .mono').textContent=d[0];el.querySelector('h3').innerHTML=d[1];el.querySelector('p').textContent=d[2];el.querySelector('.tool-note').textContent=d[3];}); setText('.project-overview .overview-note .mono','EM CADA PROJETO'); setText('.project-overview .overview-note p','uma pergunta, uma escolha e uma habilidade nova.'); setText('.project-overview>div:nth-child(1) span','projetos\npublicados'); setText('.project-overview>div:nth-child(2) span','experiências\nweb'); setText('.project-overview>div:nth-child(3) span','estudos\nde interface'); setText('.filter-row>span','ENCONTRAR POR ÁREA'); const exp=['raciocínio lógico e resolução de problemas','organização e atenção aos detalhes','proatividade e facilidade para aprender','criatividade para criar soluções digitais']; $$('#experiencia li').forEach((el,i)=>{if(exp[i])el.textContent=exp[i];}); $$('.project-card .case-columns div:first-child b').forEach(el=>el.textContent='meu papel'); $$('.project-card .case-columns div:nth-child(2) b').forEach(el=>el.textContent='o que pratiquei'); const labels=['PESSOAL / WEB','ACADÊMICO / WEB','WEB / REACT','ACADÊMICO / TCC','WEB / INTERAÇÃO','FIGMA / MOBILE','FIGMA / UI']; $$('.project-card .label').forEach((el,i)=>{if(labels[i])el.textContent=labels[i];}); setText('.frame i','em movimento'); }
    const filters=$$('.filter-button'); filters.forEach((b,i)=>{if(t.filters[i]) b.childNodes[0].textContent=t.filters[i]+' ';});
    if(lang==='en') $$('.project-card').forEach(card=>{const d=projectCopy[card.dataset.project]; if(!d)return; const kind=card.querySelector('.project-kind'); const desc=card.querySelector('.project-info>div>p'); if(kind) kind.textContent=d.kind; if(desc) desc.textContent=d.desc; const cols=card.querySelectorAll('.case-columns div'); if(cols[0]) cols[0].querySelector('span').textContent=d.role; if(cols[1]) cols[1].querySelector('span').textContent=d.practice; const detail=card.querySelectorAll('.detail-grid>div'); d.details.forEach((item,i)=>{if(detail[i]){detail[i].querySelector('b').textContent=item[0];detail[i].querySelector('p').textContent=item[1];}}); const more=card.querySelector('.project-more>a'); if(more) more.textContent=d.link+' ↗'; const button=card.querySelector('.project-expand'); if(button && !card.classList.contains('is-expanded')) button.childNodes[0].textContent='open case study ';});
    const labels=$$('.case-body .case-grid>div>.mono'); t.modalLabels.forEach((v,i)=>{if(labels[i])labels[i].textContent=v;}); setText('.case-statement>.mono',t.modalLabels[0]); const live=$('#case-live'), code=$('#case-github'); if(live) live.textContent=lang==='en'?'view live project ↗':'ver projeto ao vivo ↗'; if(code) code.textContent=lang==='en'?'view code ↗':'ver código ↗';
    toggle.querySelector('.language-active').textContent=lang.toUpperCase(); toggle.querySelectorAll('span')[1].textContent=lang==='en'?'PT':'EN'; toggle.setAttribute('aria-label',lang==='en'?'Switch to Portuguese':'Mudar para inglês'); document.body.dataset.language=lang; localStorage.setItem('portfolio-language',lang);
  };
  toggle.addEventListener('click',()=>{lang=lang==='pt'?'en':'pt'; localStorage.setItem('portfolio-language',lang); if(lang==='pt') window.location.reload(); else apply();}); window.setPortfolioLanguage=()=>lang; apply();
})();
