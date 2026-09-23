const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

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

const pageProgress = document.querySelector('.page-progress');
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

document.querySelectorAll('.project-expand').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.project-card');
  const expanded = card.classList.toggle('is-expanded');
  button.setAttribute('aria-expanded', String(expanded));
  button.firstChild.textContent = expanded ? 'Fechar detalhes ' : 'Ver detalhes ';
}));
const caseData = {
  universyn:{eyebrow:'01 / PROJETO PESSOAL · WEB', live:'https://4173-i3ws3dt405s5p5uopkcmo-edeb783b.us4.manus.computer/', problem:'Como criar um espaço de estudos que ajude a manter o foco sem parecer uma plataforma pesada, fria ou cheia de distrações, reunindo várias necessidades em uma experiência simples?', role:'Concepção visual, estrutura de interface, organização das ferramentas e implementação da experiência responsiva.', solution:'Uma landing page apresenta o produto e leva para um workspace reunido no mesmo universo visual. A pessoa encontra tarefas, notas, Pomodoro, calculadora, cronômetro e flashcards em uma navegação direta, com foco em organização e continuidade.', features:['Landing page de apresentação','Workspace responsivo de estudo','Tarefas, notas e Pomodoro','Notas, flashcards e calculadora','Cronômetro para apoiar a rotina'], learning:'Transformar uma ideia ampla em um produto com começo, navegação clara e ações que fazem sentido para quem usa.', next:'Conectar as ferramentas a persistência de dados e evoluir o workspace para diferentes rotinas de estudo.', tech:['HTML','CSS','JavaScript','Local storage'], image:'assets/project-previews/universyn.webp'},
  cafeteria:{eyebrow:'02 / PROJETO ACADÊMICO · WEB', live:'https://landingpage-one-khaki.vercel.app/', problem:'Como apresentar uma cafeteria fictícia de forma convidativa, traduzindo a personalidade da marca em uma página que organize produtos, ambiente, localização e contato?', role:'Estrutura do site, hierarquia de informações e implementação das interações entre seções com Bootstrap e JavaScript.', solution:'Uma landing page responsiva com narrativa de marca, navegação por seções, cards de produtos, carrossel de imagens, formulário de contato, mapa e apresentação da equipe. O conteúdo foi organizado para conduzir a pessoa do primeiro contato até a ação.', features:['Hero e narrativa de marca','Cards de cafés e doces','Carrossel e ambientação visual','Formulário e mapa de localização','Apresentação da equipe'], learning:'Transformar uma identidade de marca em uma página com narrativa, pontos de contato e chamadas para ação.', next:'Aprimorar acessibilidade, validar o formulário e evoluir o conteúdo para um sistema de cardápio real.', tech:['HTML','CSS','Bootstrap','JavaScript'], image:'assets/project-previews/cafeteria.webp'},
  siimpla:{eyebrow:'03 / PROJETO WEB · APLICAÇÃO', live:'https://siimpla.vercel.app/', problem:'Como reunir pequenas ferramentas úteis em um mesmo produto sem criar uma navegação confusa para quem só quer resolver uma tarefa?', role:'Interface, componentização, rotas, estado com Context API e organização das páginas para desktop e mobile.', solution:'Uma aplicação React com login, dashboard e rotas protegidas. A estrutura usa componentes e Context API para organizar lista de tarefas, conversor de moedas, QR Code, remoção de fundo e outras utilidades dentro de um mesmo sistema.', features:['Login e dashboard','Rotas protegidas','Componentes e Context API','Lista de tarefas','Conversor, QR Code e remoção de fundo'], learning:'Separar responsabilidades entre componentes e perceber como pequenos detalhes de fluxo impactam a usabilidade.', next:'Conectar as ferramentas a uma conta persistente e criar uma camada mais forte de feedback e estados de erro.', tech:['React','React Router','Context API','CSS'], image:'assets/project-previews/siimpla.png'},
  tcchat:{eyebrow:'04 / PROJETO DE TCC · COLABORATIVO', live:'https://duerda.github.io/tcchat/', problem:'Como organizar o acompanhamento de trabalhos de conclusão e aproximar alunos, orientadores e coordenação em um mesmo ambiente, respeitando necessidades diferentes de acesso?', role:'Construção da experiência visual e organização das telas, contribuindo para fluxos diferentes por perfil de usuário.', solution:'Uma plataforma colaborativa com autenticação, cadastros e fluxos por perfil. O sistema reúne grupos, fórum, biblioteca, avaliações, configurações e acompanhamento de progresso para apoiar o ciclo completo de um trabalho de conclusão.', features:['Autenticação e cadastro','Fluxos para aluno, orientador e coordenação','Grupos e fórum','Biblioteca de referências','Avaliações e progresso'], learning:'Pensar produto para diferentes perfis, documentar fluxos e equilibrar muita informação sem perder a clareza.', next:'Validar os fluxos com usuários reais e estabilizar o deploy e a integração completa com Firebase.', tech:['HTML','CSS','JavaScript','Firebase'], image:'assets/project-previews/tcchat.webp'},
  checknet:{eyebrow:'05 / PROJETO WEB · INTERAÇÃO', live:'https://checknet.vercel.app/', problem:'Como transformar dados técnicos de conexão em uma resposta fácil de entender, sem exigir que a pessoa conheça termos de rede?', role:'HTML, identidade visual em CSS e interação em JavaScript, incluindo atualização quando a conexão muda.', solution:'Uma tela objetiva com ação principal, estado de carregamento e leitura da Network Information API. O resultado apresenta tipo de conexão e downlink estimado em uma linguagem mais próxima do uso cotidiano.', features:['Leitura da conexão do navegador','Downlink estimado','Estado de carregamento','Atualização quando a conexão muda','Resultado em linguagem simples'], learning:'Uma interface minimalista pode comunicar uma funcionalidade técnica com poucos elementos e uma resposta imediata.', next:'Adicionar histórico de testes, comparação de resultados e uma explicação mais acessível sobre cada métrica.', tech:['HTML','CSS','JavaScript','Web API'], image:'assets/project-previews/checknet.webp'},
  nutrify:{eyebrow:'06 / PROJETO DE DESIGN · UI', live:'https://www.figma.com/design/ZNFLzqj60k23kZNzNXCW7D/nutrify?node-id=0-1', problem:'Como falar sobre alimentação e bem-estar de um jeito acolhedor, claro e sem excesso de informação, ajudando a pessoa a encontrar o que precisa?', role:'Conceito visual no Figma, composição, paleta, estrutura de telas e consistência entre os elementos.', solution:'Um conceito mobile com cadastro, onboarding orientado por objetivos, categorias de alimentos, detalhes nutricionais e favoritos. A direção combina hierarquia, componentes e uma linguagem visual cuidadosa.', features:['Cadastro e entrada','Onboarding de objetivos','Categorias de alimentos','Detalhes nutricionais','Cards e favoritos'], learning:'Decisões visuais ajudam a comunicar o posicionamento de um produto antes mesmo de o usuário ler todo o conteúdo.', next:'Transformar o conceito visual em protótipo navegável e validar os fluxos com pessoas usuárias.', tech:['Figma','UI Design','Produto','Prototipação'], image:''},
  'tcchat-design':{eyebrow:'07 / DESIGN DO TCCCHAT · UI', live:'https://www.figma.com/site/St5fOKsXxBWARv4lobeiZh/Sem-t%C3%ADtulo?node-id=0-1', problem:'Como dar direção visual ao TCCChat e organizar as principais telas antes da implementação, reduzindo incertezas para quem desenvolveria o produto?', role:'Contribuição nos fluxos e na definição de uma linguagem visual para alunos, professores e coordenação.', solution:'Um estudo de interface que organiza navegação, dashboards por perfil, perfis de usuário, cards de progresso, grupos e estados importantes da plataforma antes da implementação.', features:['Arquitetura de telas','Dashboards por perfil','Perfis e permissões','Cards de progresso','Fluxos e estados de interface'], learning:'O design funciona como ponte entre regras de negócio, necessidades de usuário e desenvolvimento.', next:'Consolidar o design system e aproximar os frames do protótipo navegável e do produto implementado.', tech:['Figma','Fluxos','Identidade','UI Design'], image:''}
};
const modal = document.querySelector('#case-modal');
const closeCase = () => { modal?.classList.remove('is-open'); modal?.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); };
const openCase = (card) => {
  if (!modal) return;
  const key = card.dataset.project; const data = caseData[key]; if (!data) return;
  const text = (id, value) => { const el = document.querySelector(id); if (el) el.textContent = value; };
  text('#case-eyebrow', data.eyebrow); text('#case-title', card.querySelector('h3')?.textContent || data.eyebrow); text('#case-summary', card.querySelector('.project-details p')?.textContent || '');
  text('#case-problem', data.problem); text('#case-role', data.role); text('#case-solution', data.solution); text('#case-learning', data.learning); text('#case-next', data.next);
  const image = document.querySelector('#case-image'); if (image) { image.src = data.image || ''; image.alt = `${card.querySelector('h3')?.textContent || 'Projeto'} — preview`; image.parentElement.classList.toggle('is-empty', !data.image); }
  const list = document.querySelector('#case-features'); if (list) list.innerHTML = data.features.map(item => `<li>${item}</li>`).join('');
  const tech = document.querySelector('#case-tech'); if (tech) tech.innerHTML = data.tech.map(item => `<span>${item}</span>`).join('');
  const github = card.querySelector('.project-details>a')?.href; const githubLink = document.querySelector('#case-github'); if (githubLink) { githubLink.href = github || data.live; githubLink.textContent = github ? 'Ver código ↗' : 'Ver design ↗'; }
  const live = document.querySelector('#case-live'); if (live) { live.href = data.live; live.textContent = key === 'nutrify' || key === 'tcchat-design' ? 'Abrir design ↗' : 'Ver projeto ao vivo ↗'; }
  modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); modal.querySelector('.case-close')?.focus();
};
document.querySelectorAll('.project-expand').forEach(button => button.addEventListener('click', () => openCase(button.closest('.project-card'))));
modal?.querySelectorAll('[data-case-close]').forEach(item => item.addEventListener('click', closeCase));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeCase(); });




/* SNAKE — mini game de portfolio */
(() => {
  const canvas = document.querySelector('#snake-canvas');
  const start = document.querySelector('.game-start');
  if (!canvas || !start) return;
  const ctx = canvas.getContext('2d');
  const scoreEl = document.querySelector('#game-score');
  const timeEl = document.querySelector('#game-time');
  const messageEl = document.querySelector('#game-message');
  const cell = 20, cols = 36, rows = 20;
  let snake, food, direction, nextDirection, score, running, timer, loop;
  const words=['curiosa','criativa','dedicada','atenta','aprendiz','autoral','corajosa','em movimento'];
  const placeFood=()=>{let p; do {p={x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)};} while(snake.some(part=>part.x===p.x&&part.y===p.y)); return p;};
  const drawStar=(x,y)=>{ctx.save();ctx.translate(x*cell+cell/2,y*cell+cell/2);ctx.fillStyle='#fff1a4';ctx.shadowColor='#fff';ctx.shadowBlur=9;ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?5:9;const px=Math.cos(a)*r,py=Math.sin(a)*r;i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.closePath();ctx.fill();ctx.restore();};
  const draw=()=>{const g=ctx.createLinearGradient(0,0,720,400);g.addColorStop(0,'#d9f1f2');g.addColorStop(1,'#8fc9d6');ctx.fillStyle=g;ctx.fillRect(0,0,720,400);ctx.strokeStyle='#ffffff26';ctx.lineWidth=1;for(let x=0;x<=720;x+=cell){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,400);ctx.stroke();}for(let y=0;y<=400;y+=cell){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(720,y);ctx.stroke();}drawStar(food.x,food.y);snake.forEach((part,i)=>{ctx.fillStyle=i===0?'#1d5688':'#4b91a8';ctx.beginPath();ctx.roundRect(part.x*cell+2,part.y*cell+2,cell-4,cell-4,i===0?7:5);ctx.fill();if(i===0){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(part.x*cell+7,part.y*cell+7,2,0,Math.PI*2);ctx.arc(part.x*cell+13,part.y*cell+7,2,0,Math.PI*2);ctx.fill();}});};
  const finish=won=>{running=false;clearInterval(timer);cancelAnimationFrame(loop);messageEl.textContent=won?'recorde! a cobrinha encontrou todas as palavras.':'a cobrinha bateu — tente de novo e supere seu recorde.';start.textContent=won?'jogar novamente ↗':'tentar novamente ↗';draw();};
  const tick=()=>{if(!running)return;direction=nextDirection;const head={x:snake[0].x+direction.x,y:snake[0].y+direction.y};if(head.x<0||head.y<0||head.x>=cols||head.y>=rows||snake.some((p,i)=>i>0&&p.x===head.x&&p.y===head.y)){finish(false);return;}snake.unshift(head);if(head.x===food.x&&head.y===food.y){score++;scoreEl.textContent=`${score} / 8`;messageEl.textContent=`${words[Math.min(score-1,words.length-1)]} — essa também combina com você.`;if(score>=8){finish(true);return;}food=placeFood();}else snake.pop();draw();loop=requestAnimationFrame(()=>setTimeout(tick,105));};
  const begin=()=>{clearInterval(timer);snake=[{x:18,y:10},{x:17,y:10},{x:16,y:10}];food=placeFood();direction={x:1,y:0};nextDirection={x:1,y:0};score=0;running=true;scoreEl.textContent='0 / 8';timeEl.textContent='30s';messageEl.textContent='colecione as estrelas e cuide das curvas.';start.textContent='reiniciar partida ↗';timer=setInterval(()=>{const n=parseInt(timeEl.textContent)-1;timeEl.textContent=`${n}s`;if(n<=0)finish(false);},1000);tick();};
  const setDirection=(x,y)=>{if(direction.x+x!==0||direction.y+y!==0)nextDirection={x,y};};
  start.addEventListener('click',begin);window.addEventListener('keydown',e=>{if(e.key==='ArrowUp'||e.key==='w')setDirection(0,-1);if(e.key==='ArrowDown'||e.key==='s')setDirection(0,1);if(e.key==='ArrowLeft'||e.key==='a')setDirection(-1,0);if(e.key==='ArrowRight'||e.key==='d')setDirection(1,0);});
  snake=[{x:18,y:10},{x:17,y:10},{x:16,y:10}];food={x:27,y:10};direction={x:1,y:0};draw();
})();
