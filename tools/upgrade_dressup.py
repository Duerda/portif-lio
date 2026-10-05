from pathlib import Path

root = Path('/home/ubuntu/portif-lio')
index = root / 'index.html'
script = root / 'script.js'
css = root / 'style.css'

html = '''<section class="game-section" id="game"><div class="section-top"><span class="mono">04 / PLAYGROUND</span><span class="side-note mono">um pequeno<br>presente em JS.</span></div><div class="game-heading"><div><p class="eyebrow">MINI JOGO AUTORAL</p><h2>Vista a<br><em>Dev.</em></h2></div><p>Uma única bonequinha pixel art para você combinar vestidos, saias, conjuntos e acessórios em uma coleção inspirada no moodboard lilás da referência.</p></div><div class="game-card dressup-card"><div class="game-copy"><span class="game-badge">✦ closet aberto</span><p class="mono">ESCOLHA UMA COMBINAÇÃO</p><h3>um look por vez</h3><p>Ela continua sendo a mesma personagem — só muda de roupa, cabelo e detalhe. Clique em qualquer cartão para montar uma nova versão.</p><div class="wardrobe-note"><span>12</span><div><b>peças para testar</b><small>vestidos · saias · conjuntos · acessórios</small></div></div><div class="outfit-picker" role="group" aria-label="Escolha uma combinação de roupa"><button class="outfit-button is-selected" type="button" data-look="basic"><span class="swatch swatch-basic"></span><span>básica</span></button><button class="outfit-button" type="button" data-look="cupcake"><span class="swatch swatch-cupcake"></span><span>cupcake</span></button><button class="outfit-button" type="button" data-look="garden"><span class="swatch swatch-garden"></span><span>jardim</span></button><button class="outfit-button" type="button" data-look="sailor"><span class="swatch swatch-sailor"></span><span>marinheira</span></button><button class="outfit-button" type="button" data-look="lilac"><span class="swatch swatch-lilac"></span><span>lilás</span></button><button class="outfit-button" type="button" data-look="dots"><span class="swatch swatch-dots"></span><span>poá</span></button><button class="outfit-button" type="button" data-look="party"><span class="swatch swatch-party"></span><span>festa</span></button><button class="outfit-button" type="button" data-look="gamer"><span class="swatch swatch-gamer"></span><span>gamer</span></button><button class="outfit-button" type="button" data-look="fairy"><span class="swatch swatch-fairy"></span><span>fada</span></button><button class="outfit-button" type="button" data-look="winter"><span class="swatch swatch-winter"></span><span>inverno</span></button><button class="outfit-button" type="button" data-look="sun"><span class="swatch swatch-sun"></span><span>sol</span></button><button class="outfit-button" type="button" data-look="violet"><span class="swatch swatch-violet"></span><span>violeta</span></button></div><p id="game-message" class="game-message">comece pela básica e monte seu look favorito.</p><div class="game-stats"><span>look <b id="game-look">básica</b></span><span>animação <b>ativa</b></span></div></div><div class="game-board dressup-board"><div class="pixel-stage"><span class="stage-sticker sticker-heart">♥</span><span class="stage-sticker sticker-sparkle">✦</span><span class="stage-star star-one">✧</span><span class="stage-star star-two">✦</span><canvas id="dressup-canvas" width="160" height="200" aria-label="Bonequinha pixel art com roupa básica"></canvas><span class="stage-ground"></span><span class="stage-label mono">LOOK <b id="stage-look">01</b> / 12</span></div></div></div></section>'''
s = index.read_text()
a = s.find('<section class="game-section"')
b = s.find('</section>', a) + len('</section>')
assert a != -1 and b > a
index.write_text(s[:a] + html + s[b:])

new_game = r'''/* DRESS UP — Vista a Dev, mini game de portfolio */
(() => {
  const canvas = document.querySelector('#dressup-canvas');
  const buttons = [...document.querySelectorAll('.outfit-button')];
  if (!canvas || !buttons.length) return;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const lookEl = document.querySelector('#game-look');
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
  const selectLook=(button)=>{look=button.dataset.look;buttons.forEach(item=>item.classList.toggle('is-selected',item===button));const o=looks[look];lookEl.textContent=o.name;messageEl.textContent=o.message;stageLookEl.textContent=String(buttons.indexOf(button)+1).padStart(2,'0');canvas.setAttribute('aria-label',`Bonequinha pixel art com look ${o.name}`)};
  buttons.forEach(button=>button.addEventListener('click',()=>selectLook(button)));
  const animate=()=>{frame+=1;draw();requestAnimationFrame(animate)}; draw(); animate();
})();'''
ss = script.read_text()
a = ss.find('/* DRESS UP — Vista a Dev, mini game de portfolio */')
b = ss.find('/* LANGUAGE SWITCHER', a)
assert a != -1 and b > a
script.write_text(ss[:a] + new_game + '\n' + ss[b:])

css_add = '''
/* CLOSET PIXEL ART — expansão autoral inspirada no moodboard enviado */
.wardrobe-note{display:flex;align-items:center;gap:10px;margin-top:20px;padding:10px 12px;background:#fff3fb;border:1px dashed #d6a8cf;color:#6d4774}.wardrobe-note>span{display:grid;place-items:center;width:30px;height:30px;background:#a86bc1;color:#fff;font:700 13px var(--mono);border-radius:50%}.wardrobe-note b,.wardrobe-note small{display:block}.wardrobe-note b{font:500 10px var(--mono);text-transform:uppercase}.wardrobe-note small{margin-top:2px;color:#a172a5;font-size:10px}.outfit-picker{grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.outfit-button{min-height:47px;background:#fffaff;border-color:#e2c7df;color:#633e6d}.outfit-button:hover,.outfit-button.is-selected{border-color:#9c5db5;background:#f9eafb;box-shadow:3px 3px 0 #d6a2d2;color:#5b2e6b}.swatch{border-radius:4px}.swatch-cupcake{background:#f7b5cb}.swatch-garden{background:#9bd6ad}.swatch-sailor{background:linear-gradient(#fff 50%,#6d9bc5 50%)}.swatch-dots{background:#fff1f6;border-color:#bf527d}.swatch-gamer{background:#29334d}.swatch-fairy{background:#b7e9df}.swatch-winter{background:#b9d8f1}.swatch-violet{background:#8746c7}.dressup-board{background:#c68ec5}.pixel-stage{background:linear-gradient(145deg,#f2c8ed 0%,#c494d2 100%)}.pixel-stage:before{background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);opacity:.23}.pixel-stage canvas{filter:drop-shadow(8px 10px 0 #9d67ac)}.stage-ground{background:#a66ead}.stage-star{color:#fff1a8;text-shadow:2px 2px 0 #a86bc1}.stage-sticker{position:absolute;z-index:2;color:#fff5ad;font:700 27px var(--serif);text-shadow:2px 2px 0 #a86bc1;animation:float-star 2.6s ease-in-out infinite}.sticker-heart{left:16%;bottom:25%;transform:rotate(-12deg)}.sticker-sparkle{right:15%;bottom:17%;animation-delay:-.8s}.stage-label{position:absolute;z-index:3;right:16px;bottom:14px;color:#fff;background:#7d4d91;padding:6px 9px;font-size:9px}.stage-label b{color:#ffeaa0}@media(max-width:900px){.outfit-picker{grid-template-columns:repeat(3,1fr)}.wardrobe-note{margin-top:16px}.stage-label{right:10px;bottom:10px}}
'''
css.write_text(css.read_text() + css_add)

print('dress-up upgraded')
