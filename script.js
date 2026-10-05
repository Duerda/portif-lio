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




/* DRESS UP — Vista a Dev, mini game de portfolio */
(() => {
  const canvas = document.querySelector('#dressup-canvas');
  const buttons = [...document.querySelectorAll('.outfit-button')];
  if (!canvas || !buttons.length) return;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const stageLookEl = document.querySelector('#stage-look');
  const messageEl = document.querySelector('#game-message');
  let look = 'basic'; let frame = 0;
  const looks = {
    basic:{name:'básica',top:'#fffdf8',shadow:'#d8e9e7',bottom:'#d9edf0',accent:'#3e8ba8',hair:'#3b2b3e',style:'basic',message:'branquinha, simples e pronta para criar.'},
    cupcake:{name:'cupcake',top:'#f7b5cb',shadow:'#da769c',bottom:'#fff2d9',accent:'#a94c79',hair:'#5d3a45',style:'dress',message:'doce, rosinha e com uma pitada de festa.'},
    garden:{name:'jardim',top:'#9bd6ad',shadow:'#5da27b',bottom:'#fff3c6',accent:'#ef8d9f',hair:'#5a3d2f',style:'floral',message:'um passeio no jardim, com flores e leveza.'},
    sailor:{name:'marinheira',top:'#fffdf8',shadow:'#b6c9dd',bottom:'#6d9bc5',accent:'#d95e83',hair:'#2f354d',style:'sailor',message:'pronta para navegar por uma ideia nova.'},
    lilac:{name:'lilás',top:'#d8b9e8',shadow:'#a26ac4',bottom:'#f5d9ed',accent:'#78509a',hair:'#71447c',style:'dress',message:'delicada, criativa e com um toque de magia.'},
    dots:{name:'poá',top:'#fff1f6',shadow:'#e4a6c2',bottom:'#d7a5d9',accent:'#bf527d',hair:'#3a2936',style:'dots',message:'um clássico fofo para dias de inspiração.'},
    party:{name:'festa',top:'#ef75ad',shadow:'#b93579',bottom:'#c8b7ed',accent:'#ffe17c',hair:'#57264c',style:'party',message:'um look brilhante para comemorar cada conquista.'},
    gamer:{name:'gamer',top:'#29334d',shadow:'#151b31',bottom:'#8f76c7',accent:'#7ff0d2',hair:'#20263a',style:'gamer',message:'modo criação ativado: pronta para testar tudo.'},
    fairy:{name:'fada',top:'#b7e9df',shadow:'#69bda9',bottom:'#e9c6f2',accent:'#fff1a8',hair:'#684a83',style:'fairy',message:'asas imaginárias e muita ideia no ar.'},
    winter:{name:'inverno',top:'#b9d8f1',shadow:'#7099c7',bottom:'#f7fbff',accent:'#527ab1',hair:'#7a5369',style:'winter',message:'quentinha, calma e pronta para uma tarde de estudo.'},
    sun:{name:'sol',top:'#f6d67d',shadow:'#d9aa3e',bottom:'#fff3c4',accent:'#be8125',hair:'#8b542f',style:'sun',message:'energia de quem aprende fazendo.'},
    violet:{name:'violeta',top:'#8746c7',shadow:'#54258e',bottom:'#f0c5e8',accent:'#f6cf65',hair:'#39205c',style:'violet',message:'dramática na medida e absolutamente encantadora.'}
  };
  const rect=(x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(x,y,w,h)};
  const draw=()=>{
    const o=looks[look], t=frame/18, bob=Math.round(Math.sin(t)*2), blink=Math.floor(frame%180)>174;
    ctx.clearRect(0,0,160,200); rect(0,0,160,200,'#f4d8f2');
    rect(18,28,2,2,'#fff');rect(137,48,2,2,'#fff');rect(25,132,3,3,'#e5b7df');rect(126,118,2,2,'#e0b0df');
    rect(49,181,61,3,'#c38fc4');rect(57,184,46,2,'#dfb7dd');
    // cabelo comprido da única personagem
    rect(57,35+bob,46,5,o.hair);rect(51,42+bob,58,25,o.hair);rect(47,51+bob,9,25,o.hair);rect(104,49+bob,10,33,o.hair);rect(54,69+bob,7,14,o.hair);rect(101,72+bob,8,14,o.hair);rect(59,31+bob,37,5,o.hair);rect(50,45+bob,6,12,o.hair);rect(106,44+bob,5,18,o.hair);
    // rosto e características preservadas
    rect(61,44+bob,39,30,'#f5c9a7');rect(57,51+bob,45,15,'#f5c9a7');rect(66,70+bob,27,9,'#f5c9a7');
    rect(58,43+bob,10,10,o.hair);rect(65,39+bob,16,7,o.hair);rect(78,39+bob,13,6,o.hair);rect(90,43+bob,11,11,o.hair);rect(97,49+bob,6,9,o.hair);
    if(blink){rect(68,57+bob,6,2,'#5b5634');rect(87,57+bob,6,2,'#5b5634')}else{rect(69,56+bob,5,5,'#6d743d');rect(88,56+bob,5,5,'#6d743d');rect(71,57+bob,2,2,'#3d332d');rect(90,57+bob,2,2,'#3d332d')}
    rect(79,66+bob,5,2,'#d18d7f');rect(76,72+bob,11,2,'#c87979');rect(74,77+bob,14,9,'#f5c9a7');
    // parte de cima e mangas
    rect(58,84+bob,47,30,o.top);rect(53,91+bob,57,24,o.top);rect(58,108+bob,47,8,o.shadow);rect(48,92+bob,9,28,'#f5c9a7');rect(104,92+bob,9,28,'#f5c9a7');rect(46,116+bob,12,7,'#f5c9a7');rect(104,116+bob,12,7,'#f5c9a7');
    if(o.style==='sailor'){rect(60,85+bob,43,4,'#d95e83');rect(69,90+bob,25,3,o.shadow)}
    if(o.style==='dots'){[64,78,92].forEach(x=>rect(x,96+bob,3,3,o.accent));[69,85,98].forEach(x=>rect(x,106+bob,3,3,o.accent))}
    if(o.style==='floral'){rect(65,95+bob,4,4,o.accent);rect(78,101+bob,4,4,'#fff');rect(91,94+bob,4,4,o.accent)}
    if(o.style==='gamer'){rect(68,96+bob,28,3,o.accent);rect(76,101+bob,12,5,o.accent);rect(80,102+bob,4,3,o.shadow)}
    if(o.style==='fairy'){rect(47,95+bob,8,14,'#fff9dc');rect(105,95+bob,8,14,'#fff9dc')}
    if(o.style==='winter'){rect(59,84+bob,45,8,'#fff');rect(70,88+bob,21,4,o.accent)}
    // saia, vestido e calçados
    rect(52,114+bob,55,10,o.bottom);rect(48,121+bob,63,23,o.bottom);rect(53,143+bob,53,6,o.shadow);
    if(o.style==='dress'||o.style==='party'||o.style==='fairy'){rect(48,116+bob,63,10,o.top);rect(44,124+bob,71,20,o.bottom);rect(51,140+bob,57,8,o.shadow)}
    if(o.style==='sun'){rect(48,123+bob,63,4,o.accent)}
    if(o.style==='gamer'){rect(52,125+bob,55,4,o.accent)}
    rect(62,146+bob,13,29,'#f5c9a7');rect(86,146+bob,13,29,'#f5c9a7');rect(58,173+bob,21,8,o.hair);rect(83,173+bob,21,8,o.hair);rect(62,173+bob,13,3,'#fff');rect(87,173+bob,12,3,'#fff');
    // pequenos acessórios
    if(o.style==='fairy'){rect(43,82+bob,3,3,'#fff1a8');rect(114,75+bob,3,3,'#fff1a8')}
    if(o.style==='party'||o.style==='violet'){rect(73,29+bob,14,4,'#f6cf65');rect(78,25+bob,4,4,'#f6cf65')}
    if(o.style==='winter'){rect(55,76+bob,52,5,'#fff');rect(52,79+bob,8,7,'#fff')}
  };
  const selectLook=(button)=>{look=button.dataset.look;buttons.forEach(item=>item.classList.toggle('is-selected',item===button));const o=looks[look];document.querySelector('#game-look').textContent=o.name;messageEl.textContent=o.message;stageLookEl.textContent=String(buttons.indexOf(button)+1).padStart(2,'0');canvas.setAttribute('aria-label',`Bonequinha pixel art com look ${o.name}`)};
  buttons.forEach(button=>button.addEventListener('click',()=>selectLook(button)));
  const animate=()=>{frame+=1;draw();requestAnimationFrame(animate)}; draw(); animate();
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
    en:{nav:['about','skills','projects','play','contact'],heroEyebrow:'PORTFOLIO / EDUARDA DE SOUZA TEIXEIRA',hero:'I turn<br><em>curiosity</em><br>into products.',intro:'Developer in training, Systems Development student and creator of digital experiences that mix code, design and the joy of discovering.',projectsButton:'view my projects',aboutLabel:'01 / ABOUT ME',aboutNote:'still learning,<br>already creating.',aboutEyebrow:'NICE TO MEET YOU, I AM EDUARDA',aboutTitle:'A <em>curious</em><br>mind.',skillsLabel:'02 / TOOLS',projectsLabel:'03 / PROJECTS',gameLabel:'04 / PLAYGROUND',experienceLabel:'05 / PRACTICAL EXPERIENCE',contactLabel:'06 / CONTACT',projectSide:'what I created<br>to learn by doing.',projectIntro:'Every project shows part of my process: the problem I found, the decisions I made, what I built and what I still want to improve.',filters:['all','web','mobile','academic','personal'],gameTitle:'Dress up<br><em>the Dev.</em>',gameIntro:'A small pixel art character for you to style while getting to know my creative universe.',gameBadge:'✦ play',gameControls:'CHOOSE A LOOK',gameName:'dress up the dev',gameDesc:'A tiny JavaScript dress-up game with the same soft atmosphere as my portfolio.',start:'choose your look',stars:'look',time:'animation',gameReady:'start with the basic look and make it yours.',experienceTitle:'Learning<br>by doing.',experienceText:'I am building my first formal professional experience, but I have already developed complete systems and interfaces from concept to implementation.',contactTitle:'Let’s create<br>something <em>beautiful?</em>',contactText:'I am looking for an internship or first opportunity in technology, systems development or digital media.',email:'send an email',modalLabels:['WHAT THIS PROJECT SOLVES','MY CONTRIBUTION','HOW I THOUGHT ABOUT IT','WHAT WAS BUILT','TECHNOLOGIES','WHAT I LEARNED','NEXT STEP']},
    pt:{nav:['sobre','skills','projetos','play','contato'],heroEyebrow:'PORTFÓLIO / EDUARDA DE SOUZA TEIXEIRA',hero:'Eu transformo<br><em>curiosidade</em><br>em produto.',intro:'Desenvolvedora em formação, estudante de Desenvolvimento de Sistemas e criadora de experiências digitais que misturam código, design e vontade de descobrir.',projectsButton:'ver meus projetos',aboutLabel:'01 / QUEM ESTÁ POR TRÁS',aboutNote:'ainda aprendendo,<br>já fazendo.',aboutEyebrow:'PRAZER, EU SOU A EDUARDA',aboutTitle:'Uma mente<br><em>curiosa.</em>',skillsLabel:'02 / FERRAMENTAS',projectsLabel:'03 / PROJETOS',gameLabel:'04 / PLAYGROUND',experienceLabel:'05 / EXPERIÊNCIA PRÁTICA',contactLabel:'06 / CONTATO',projectSide:'o que eu criei<br>para aprender fazendo.',projectIntro:'Cada projeto mostra uma parte do meu processo: o problema que encontrei, as decisões que tomei, o que eu construí e o que ainda quero melhorar.',filters:['todos','web','mobile','acadêmicos','pessoais'],gameTitle:'Vista a<br><em>Dev.</em>',gameIntro:'Uma pequena personagem pixel art para você montar looks fofos enquanto conhece um pouco mais do meu universo.',gameBadge:'✦ jogar',gameControls:'ESCOLHA UM LOOK',gameName:'vista a dev',gameDesc:'Um pequeno jogo de vestir feito em JavaScript, com a mesma atmosfera macia do meu portfólio.',start:'escolha seu look',stars:'look',time:'animação',gameReady:'comece pela básica e monte seu look favorito.',experienceTitle:'Aprender<br>fazendo.',experienceText:'Ainda estou construindo minha primeira experiência profissional formal, mas já desenvolvi sistemas e interfaces completos do conceito à implementação.',contactTitle:'Vamos criar<br>algo <em>bonito?</em>',contactText:'Estou buscando uma oportunidade de estágio ou primeira experiência em tecnologia, desenvolvimento de sistemas ou meios digitais.',email:'enviar e-mail',modalLabels:['O QUE ESTE PROJETO RESOLVE','MINHA CONTRIBUIÇÃO','COMO PENSEI','O QUE FOI CONSTRUÍDO','TECNOLOGIAS','O QUE APRENDI','PRÓXIMO PASSO']}
  };
  const apply = () => {
    const t = text[lang]; document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.title = lang === 'en' ? 'Eduarda Teixeira — portfolio' : 'Eduarda Teixeira — portfólio';
    $$('nav a').forEach((a,i) => { if(t.nav[i]) a.textContent=t.nav[i]; });
    set('.hero .eyebrow',t.heroEyebrow); set('.hero h1',t.hero); setText('.hero-intro',t.intro); setText('.hero-cta .btn.solid',t.projectsButton+' ↓');
    setText('#sobre .section-top>span:first-child',t.aboutLabel); set('#sobre .side-note',t.aboutNote); setText('#sobre .eyebrow',t.aboutEyebrow); set('#sobre h2',t.aboutTitle);
    setText('#skills .section-top>span:first-child',t.skillsLabel); setText('#projetos .section-top>span:first-child',t.projectsLabel); setText('#game .section-top>span:first-child',t.gameLabel); setText('#experiencia .section-top>span:first-child',t.experienceLabel); setText('#contato .contact-paper>.mono',t.contactLabel);
    setText('.projects .side-note',t.projectSide); setText('.projects-intro>p',t.projectIntro); set('#game h2',t.gameTitle); setText('.game-heading>p',t.gameIntro); setText('.game-badge',t.gameBadge); setText('.game-copy>.mono',t.gameControls); setText('.game-copy h3',t.gameName); setText('.game-copy>p:not(.mono):not(.game-message)',t.gameDesc); setText('.game-start',t.start+' ↗'); set('.game-stats span:first-child',`${t.stars} <b id="game-look">básica</b>`); set('.game-stats span:nth-child(2)',`${t.time} <b>ativa</b>`); setText('#game-message',t.gameReady);
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
