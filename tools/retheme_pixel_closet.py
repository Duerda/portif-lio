from pathlib import Path
import re

root = Path('/home/ubuntu/portif-lio')
index = root / 'index.html'
script = root / 'script.js'
style = root / 'style.css'

html = '''<section class="game-section pixel-closet-section" id="game"><div class="section-top"><span class="mono">04 / PLAYGROUND</span><span class="side-note mono">um pequeno<br>catálogo em JS.</span></div><div class="game-heading"><div><p class="eyebrow">PIXEL DRESS-UP / 2000s</p><h2>Pixel<br><em>Closet.</em></h2></div><p>Uma bonequinha, dezoito combinações e uma arara inteira de referências: vestidos de festa, saias rodadas, conjuntos, fantasias e looks com cara de joguinho antigo.</p></div><div class="game-card dressup-card pixel-closet-card"><div class="game-copy"><span class="game-badge">✦ catálogo aberto</span><p class="mono">ESCOLHA UMA PEÇA</p><h3>monte seu look</h3><p>O cenário mudou: agora é uma ficha de moda pixel art, com cores de sprite sheet e roupas inspiradas diretamente na coleção enviada.</p><div class="closet-meta"><span class="closet-number">18</span><div><b>looks no armário</b><small>vestidos · saias · fantasias · conjuntos</small></div><span class="closet-tag mono">DROP 01</span></div><div class="outfit-picker closet-grid" role="group" aria-label="Escolha uma roupa"><button class="outfit-button is-selected" type="button" data-look="basic"><span class="swatch swatch-basic"></span><span>básica</span></button><button class="outfit-button" type="button" data-look="princess"><span class="swatch swatch-princess"></span><span>princesa</span></button><button class="outfit-button" type="button" data-look="witch"><span class="swatch swatch-witch"></span><span>bruxinha</span></button><button class="outfit-button" type="button" data-look="black"><span class="swatch swatch-black"></span><span>pretinho</span></button><button class="outfit-button" type="button" data-look="denim"><span class="swatch swatch-denim"></span><span>jeans</span></button><button class="outfit-button" type="button" data-look="sailor"><span class="swatch swatch-sailor"></span><span>marinheira</span></button><button class="outfit-button" type="button" data-look="flower"><span class="swatch swatch-flower"></span><span>florido</span></button><button class="outfit-button" type="button" data-look="tutu"><span class="swatch swatch-tutu"></span><span>tutu</span></button><button class="outfit-button" type="button" data-look="lace"><span class="swatch swatch-lace"></span><span>renda</span></button><button class="outfit-button" type="button" data-look="royal"><span class="swatch swatch-royal"></span><span>real</span></button><button class="outfit-button" type="button" data-look="red"><span class="swatch swatch-red"></span><span>vermelho</span></button><button class="outfit-button" type="button" data-look="kimono"><span class="swatch swatch-kimono"></span><span>kawaii</span></button><button class="outfit-button" type="button" data-look="punk"><span class="swatch swatch-punk"></span><span>punk</span></button><button class="outfit-button" type="button" data-look="neon"><span class="swatch swatch-neon"></span><span>neon</span></button><button class="outfit-button" type="button" data-look="cape"><span class="swatch swatch-cape"></span><span>capa</span></button><button class="outfit-button" type="button" data-look="bridal"><span class="swatch swatch-bridal"></span><span>noiva</span></button><button class="outfit-button" type="button" data-look="cowgirl"><span class="swatch swatch-cowgirl"></span><span>cowgirl</span></button><button class="outfit-button" type="button" data-look="retro"><span class="swatch swatch-retro"></span><span>retrô</span></button></div><p id="game-message" class="game-message">comece pela básica e abra o catálogo de peças.</p><div class="game-stats"><span>peça <b id="game-look">básica</b></span><span>catálogo <b>18/18</b></span></div></div><div class="game-board dressup-board"><div class="pixel-stage closet-stage"><span class="stage-sticker sticker-heart">♥</span><span class="stage-sticker sticker-sparkle">✦</span><span class="stage-star star-one">✧</span><span class="stage-star star-two">✦</span><span class="hanger hanger-one"></span><span class="hanger hanger-two"></span><canvas id="dressup-canvas" width="160" height="200" aria-label="Bonequinha pixel art com roupa básica"></canvas><span class="stage-ground"></span><span class="stage-label mono">DRESS-UP FILE <b id="stage-look">01</b> / 18</span></div></div></div></section>'''
s = index.read_text()
a = s.find('<section class="game-section"')
b = s.find('</section>', a) + len('</section>')
assert a != -1 and b > a
index.write_text(s[:a] + html + s[b:])

new_game = r'''/* PIXEL CLOSET — dress-up inspirado no catálogo de roupas enviado */
(() => {
  const canvas = document.querySelector('#dressup-canvas');
  const buttons = [...document.querySelectorAll('.outfit-button')];
  if (!canvas || !buttons.length) return;
  const ctx = canvas.getContext('2d'); ctx.imageSmoothingEnabled = false;
  const messageEl = document.querySelector('#game-message'); const stageLookEl = document.querySelector('#stage-look');
  let look='basic', frame=0;
  const looks={
    basic:{name:'básica',top:'#fffdf8',shadow:'#d9d6d0',bottom:'#ece8e0',accent:'#b47a63',hair:'#4b3040',style:'basic',message:'a base perfeita para começar a brincar.'},
    princess:{name:'princesa',top:'#f0b6c8',shadow:'#b66a8c',bottom:'#e5a1c3',accent:'#f7df7b',hair:'#8d5b3f',style:'princess',message:'volume, brilho e uma saia de conto de fadas.'},
    witch:{name:'bruxinha',top:'#5b3f78',shadow:'#352443',bottom:'#24202e',accent:'#e5b54e',hair:'#b487d0',style:'witch',message:'um pouco de magia pixelada para o armário.'},
    black:{name:'pretinho',top:'#24262e',shadow:'#101116',bottom:'#3a3c47',accent:'#d49cae',hair:'#24212b',style:'black',message:'clássico, dramático e pronto para a noite.'},
    denim:{name:'jeans',top:'#4b91bd',shadow:'#245476',bottom:'#7ab0c9',accent:'#f4c96b',hair:'#6e4432',style:'denim',message:'casual com cara de sprite favorito.'},
    sailor:{name:'marinheira',top:'#fffdf8',shadow:'#b6c9dd',bottom:'#568dbb',accent:'#d95e83',hair:'#2f354d',style:'sailor',message:'pronta para navegar por uma ideia nova.'},
    flower:{name:'florido',top:'#fff0dd',shadow:'#e1a6a3',bottom:'#f3a4a5',accent:'#65a86e',hair:'#5a3d2f',style:'flower',message:'uma estampa alegre, leve e cheia de cor.'},
    tutu:{name:'tutu',top:'#f6b7d5',shadow:'#d879ae',bottom:'#f9e5f3',accent:'#a88ac5',hair:'#70466e',style:'tutu',message:'camadas macias para dançar pelo catálogo.'},
    lace:{name:'renda',top:'#fffdf5',shadow:'#d8c2b8',bottom:'#f4ddd5',accent:'#bf817b',hair:'#b36d58',style:'lace',message:'delicada como uma peça de coleção.'},
    royal:{name:'real',top:'#f5d66c',shadow:'#bd8d2d',bottom:'#6e86bd',accent:'#fff5b4',hair:'#7b5136',style:'royal',message:'uma silhueta dourada para ocasiões especiais.'},
    red:{name:'vermelho',top:'#d94348',shadow:'#8c202d',bottom:'#f05e66',accent:'#ffd37e',hair:'#3a2526',style:'red',message:'a protagonista chegou: cor forte e volume.'},
    kimono:{name:'kawaii',top:'#f39bb7',shadow:'#b64e78',bottom:'#8fc7bd',accent:'#fff0a8',hair:'#4e314a',style:'kimono',message:'fofa, gráfica e com um laço gigante.'},
    punk:{name:'punk',top:'#2c3039',shadow:'#101219',bottom:'#292d38',accent:'#d94a71',hair:'#202634',style:'punk',message:'listras, atitude e zero medo de misturar.'},
    neon:{name:'neon',top:'#57bdaf',shadow:'#217b7c',bottom:'#e8d34f',accent:'#ff6b92',hair:'#2e3448',style:'neon',message:'uma explosão colorida direto dos sprites.'},
    cape:{name:'capa',top:'#a94364',shadow:'#63213d',bottom:'#363b74',accent:'#eccb62',hair:'#4b2c3a',style:'cape',message:'heroína pixel art em missão criativa.'},
    bridal:{name:'noiva',top:'#fffefa',shadow:'#d9e1e8',bottom:'#f6f8fa',accent:'#a5c6d0',hair:'#a56d51',style:'bridal',message:'leve, brilhante e cheia de pequenos detalhes.'},
    cowgirl:{name:'cowgirl',top:'#e7a35d',shadow:'#a65c39',bottom:'#6b9b67',accent:'#f5d381',hair:'#6b3d29',style:'cowgirl',message:'um look de aventura com toque country.'},
    retro:{name:'retrô',top:'#e96f58',shadow:'#a83935',bottom:'#f6cc85',accent:'#4f7195',hair:'#5e3d30',style:'retro',message:'parece ter saído de uma revista de pixels.'}
  };
  const rect=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
  const draw=()=>{
    const o=looks[look], bob=Math.round(Math.sin(frame/18)*2), blink=Math.floor(frame%180)>174;
    ctx.clearRect(0,0,160,200);rect(0,0,160,200,'#fffdf7');
    // textura de papel e moldura de sprite sheet
    rect(12,18,3,3,'#e8c8b2');rect(140,28,2,2,'#d5a5a5');rect(22,154,2,2,'#eed0b7');rect(130,142,3,3,'#e5c19e');
    rect(49,181,61,3,'#d7b09b');rect(57,184,46,2,'#ead1bd');
    // cabelo da única bonequinha
    rect(57,35+bob,46,5,o.hair);rect(51,42+bob,58,25,o.hair);rect(47,51+bob,9,25,o.hair);rect(104,49+bob,10,33,o.hair);rect(54,69+bob,7,14,o.hair);rect(101,72+bob,8,14,o.hair);rect(59,31+bob,37,5,o.hair);rect(50,45+bob,6,12,o.hair);rect(106,44+bob,5,18,o.hair);
    // rosto, olhos verde-amarronzados e franja
    rect(61,44+bob,39,30,'#f5c9a7');rect(57,51+bob,45,15,'#f5c9a7');rect(66,70+bob,27,9,'#f5c9a7');rect(58,43+bob,10,10,o.hair);rect(65,39+bob,16,7,o.hair);rect(78,39+bob,13,6,o.hair);rect(90,43+bob,11,11,o.hair);rect(97,49+bob,6,9,o.hair);
    if(blink){rect(68,57+bob,6,2,'#5b5634');rect(87,57+bob,6,2,'#5b5634')}else{rect(69,56+bob,5,5,'#6d743d');rect(88,56+bob,5,5,'#6d743d');rect(71,57+bob,2,2,'#3d332d');rect(90,57+bob,2,2,'#3d332d')}rect(79,66+bob,5,2,'#d18d7f');rect(76,72+bob,11,2,'#c87979');rect(74,77+bob,14,9,'#f5c9a7');
    // corpinho e mangas
    rect(58,84+bob,47,30,o.top);rect(53,91+bob,57,24,o.top);rect(58,108+bob,47,8,o.shadow);rect(48,92+bob,9,28,'#f5c9a7');rect(104,92+bob,9,28,'#f5c9a7');rect(46,116+bob,12,7,'#f5c9a7');rect(104,116+bob,12,7,'#f5c9a7');
    // detalhes inspirados nos sprites enviados
    if(o.style==='sailor'){rect(60,85+bob,43,4,'#d95e83');rect(69,90+bob,25,3,o.shadow)}
    if(o.style==='denim'){rect(72,86+bob,20,26,o.shadow);rect(76,88+bob,12,4,o.accent);rect(64,102+bob,4,4,o.accent);rect(92,102+bob,4,4,o.accent)}
    if(o.style==='flower'||o.style==='retro'){[64,78,92].forEach((x,i)=>{rect(x,96+bob,4,4,o.accent);rect(x+2,94+bob,2,2,'#fff')})}
    if(o.style==='punk'){rect(64,93+bob,33,3,o.accent);rect(69,103+bob,4,4,o.accent);rect(86,103+bob,4,4,o.accent)}
    if(o.style==='neon'){rect(68,96+bob,28,3,o.accent);rect(76,102+bob,12,3,o.accent)}
    if(o.style==='kimono'){rect(62,85+bob,39,4,o.accent);rect(78,94+bob,6,8,o.accent)}
    if(o.style==='lace'||o.style==='bridal'){rect(70,87+bob,23,3,'#fff');rect(72,99+bob,4,4,o.accent);rect(85,99+bob,4,4,o.accent)}
    if(o.style==='witch'||o.style==='royal'){rect(71,88+bob,21,4,o.accent);rect(79,97+bob,5,5,o.accent)}
    // saias e vestidos com silhuetas variadas
    rect(52,114+bob,55,10,o.bottom);rect(48,121+bob,63,23,o.bottom);rect(53,143+bob,53,6,o.shadow);
    if(['princess','witch','black','flower','tutu','lace','royal','red','kimono','cape','bridal','retro'].includes(o.style)){rect(48,116+bob,63,10,o.top);rect(44,124+bob,71,20,o.bottom);rect(51,140+bob,57,8,o.shadow)}
    if(o.style==='tutu'){rect(42,127+bob,75,4,'#fff');rect(46,134+bob,67,3,'#fff')}
    if(o.style==='princess'||o.style==='royal'){rect(44,126+bob,71,3,o.accent)}
    if(o.style==='witch'||o.style==='cape'){rect(42,116+bob,8,34,o.top);rect(110,116+bob,8,34,o.top)}
    if(o.style==='red'||o.style==='retro'){rect(51,128+bob,57,4,o.accent)}
    if(o.style==='cowgirl'){rect(49,127+bob,61,3,o.accent)}
    // pernas e sapatos
    rect(62,146+bob,13,29,'#f5c9a7');rect(86,146+bob,13,29,'#f5c9a7');rect(58,173+bob,21,8,o.hair);rect(83,173+bob,21,8,o.hair);rect(62,173+bob,13,3,'#fff');rect(87,173+bob,12,3,'#fff');
    if(o.style==='witch'||o.style==='royal'){rect(73,29+bob,14,4,o.accent);rect(78,25+bob,4,4,o.accent)}
    if(o.style==='kimono'){rect(73,29+bob,14,4,o.accent)}
    if(o.style==='cowgirl'){rect(53,31+bob,55,4,o.accent);rect(47,34+bob,10,3,o.accent);rect(104,34+bob,10,3,o.accent)}
    if(o.style==='bridal'){rect(58,31+bob,6,20,'#fff');rect(96,31+bob,6,20,'#fff')}
    if(o.style==='princess'||o.style==='tutu'){rect(73,29+bob,14,4,o.accent)}
  };
  const selectLook=(button)=>{look=button.dataset.look;buttons.forEach(item=>item.classList.toggle('is-selected',item===button));const o=looks[look];document.querySelector('#game-look').textContent=o.name;messageEl.textContent=o.message;stageLookEl.textContent=String(buttons.indexOf(button)+1).padStart(2,'0');canvas.setAttribute('aria-label',`Bonequinha pixel art com look ${o.name}`)};
  buttons.forEach(button=>button.addEventListener('click',()=>selectLook(button)));
  const animate=()=>{frame+=1;draw();requestAnimationFrame(animate)};draw();animate();
})();'''
ss = script.read_text()
a = ss.find('/* PIXEL CLOSET')
if a == -1: a = ss.find('/* DRESS UP — Vista a Dev')
b = ss.find('/* LANGUAGE SWITCHER', a)
assert a != -1 and b > a
ss = ss[:a] + new_game + '\n' + ss[b:]
repls = {
    'gameTitle': {'en':'Pixel<br><em>Closet.</em>','pt':'Pixel<br><em>Closet.</em>'},
    'gameIntro': {'en':'One pixel art doll, eighteen combinations and a full rack inspired by classic dress-up sprite sheets.','pt':'Uma bonequinha pixel art, dezoito combinações e uma arara inspirada nos catálogos clássicos de vestir.'},
    'gameBadge': {'en':'✦ catalog open','pt':'✦ catálogo aberto'},
    'gameControls': {'en':'CHOOSE A PIECE','pt':'ESCOLHA UMA PEÇA'},
    'gameName': {'en':'build your look','pt':'monte seu look'},
    'gameDesc': {'en':'A tiny JavaScript dress-up game with retro sprite-sheet energy and a whole rack of new clothes.','pt':'Um pequeno jogo de vestir em JavaScript com energia de sprite sheet antigo e um armário cheio de roupas novas.'},
    'gameReady': {'en':'start with the basic look and open the catalog.','pt':'comece pela básica e abra o catálogo de peças.'},
    'stars': {'en':'piece','pt':'peça'},
    'time': {'en':'catalog','pt':'catálogo'}
}
for key, vals in repls.items():
    if key in ('stars','time'):
        ss = re.sub(rf"{key}:'[^']*'", f"{key}:'{vals['en']}'", ss, count=1)
        ss = re.sub(rf"{key}:'[^']*'", f"{key}:'{vals['pt']}'", ss, count=1)
    else:
        # replace first occurrence in en and second in pt
        pattern = rf"{key}:'[^']*'"
        ss, n1 = re.subn(pattern, f"{key}:'{vals['en']}'", ss, count=1)
        ss, n2 = re.subn(pattern, f"{key}:'{vals['pt']}'", ss, count=1)
        assert n1 == 1 and n2 == 1, (key,n1,n2)
script.write_text(ss)

css_add = r'''
/* PIXEL CLOSET 2000s — novo universo visual inspirado no catálogo enviado */
.pixel-closet-section{background:#f4eee5;border-top-color:#caa995}.pixel-closet-section .section-top{color:#7c3d45;border-bottom-color:#d7bca9}.pixel-closet-section .section-top>span:first-child{background:#e9b95f;color:#4e2830}.pixel-closet-section .eyebrow,.pixel-closet-section .game-heading h2 em{color:#a7465b}.pixel-closet-section .game-heading>p{color:#755c5c}.pixel-closet-card{grid-template-columns:.8fr 1.2fr;background:#fffdf8;border:2px solid #56343e;box-shadow:12px 12px 0 #c86b63}.pixel-closet-card .game-copy{background:#fffdf8;padding:36px 34px}.pixel-closet-card .game-badge{background:#e15b55;color:#fff;transform:rotate(-2deg);box-shadow:3px 3px 0 #7f3543}.pixel-closet-card .game-copy>p.mono{color:#a7465b}.pixel-closet-card .game-copy h3{color:#56343e;font-family:var(--mono);font-size:22px;text-transform:uppercase;letter-spacing:-1px}.pixel-closet-card .game-copy>p:not(.mono):not(.game-message){color:#775f5e}.closet-meta{display:flex;align-items:center;gap:10px;margin:18px 0 14px;padding:10px;background:#f3dfc8;border:1px solid #d6aa83;color:#5d3439}.closet-number{display:grid;place-items:center;width:34px;height:34px;background:#56343e;color:#fff;font:700 14px var(--mono)}.closet-meta b,.closet-meta small{display:block}.closet-meta b{font:500 10px var(--mono);text-transform:uppercase}.closet-meta small{font-size:10px;color:#956b5d}.closet-tag{margin-left:auto;padding:4px 5px;background:#e15b55;color:#fff;font-size:8px}.closet-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:14px;max-height:325px;overflow:auto;padding:2px 4px 5px 1px}.pixel-closet-card .outfit-button{min-height:43px;background:#fff;border:1px solid #d6bbb1;color:#56343e;padding:6px;font-size:9px}.pixel-closet-card .outfit-button:hover,.pixel-closet-card .outfit-button.is-selected{border-color:#a7465b;background:#f8dedb;transform:translate(-2px,-2px);box-shadow:3px 3px 0 #d89d8c}.pixel-closet-card .swatch{width:17px;height:17px;border-radius:2px;box-shadow:0 0 0 1px #c5a79c}.swatch-princess{background:#efb2c6}.swatch-witch{background:#5b3f78}.swatch-black{background:#24262e}.swatch-denim{background:#4b91bd}.swatch-flower{background:#f3a4a5}.swatch-tutu{background:#f6b7d5}.swatch-lace{background:#fff4ea}.swatch-royal{background:#f5d66c}.swatch-red{background:#d94348}.swatch-kimono{background:#f39bb7}.swatch-punk{background:#2c3039}.swatch-neon{background:linear-gradient(135deg,#57bdaf 50%,#e8d34f 50%)}.swatch-cape{background:#a94364}.swatch-bridal{background:#fff}.swatch-cowgirl{background:#e7a35d}.swatch-retro{background:#e96f58}.pixel-closet-card .game-message{color:#a7465b;font-size:12px}.pixel-closet-card .game-stats{color:#a7465b;border-top:1px solid #dec6b8;padding-top:14px}.pixel-closet-card .game-stats b{color:#56343e}.pixel-closet-card .dressup-board{background:#d8a58d;min-height:500px}.pixel-closet-card .closet-stage{min-height:500px;background-color:#fffdf8;background-image:linear-gradient(45deg,#f1e5d9 25%,transparent 25%),linear-gradient(-45deg,#f1e5d9 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#f1e5d9 75%),linear-gradient(-45deg,transparent 75%,#f1e5d9 75%);background-size:28px 28px;background-position:0 0,0 14px,14px -14px,-14px 0}.pixel-closet-card .closet-stage:after{content:'PIXEL CLOSET / SPRITE SHEET';position:absolute;top:18px;left:20px;color:#a7465b;font:500 9px var(--mono);letter-spacing:1px}.pixel-closet-card .pixel-stage canvas{filter:drop-shadow(7px 9px 0 #c27e69)}.pixel-closet-card .stage-ground{background:#c27e69;bottom:64px}.pixel-closet-card .stage-star{color:#e15b55;text-shadow:2px 2px 0 #f2c36e}.pixel-closet-card .stage-sticker{color:#e15b55;text-shadow:2px 2px 0 #f2c36e}.pixel-closet-card .stage-label{right:20px;bottom:20px;background:#56343e;color:#fff;padding:7px 9px}.pixel-closet-card .stage-label b{color:#f2c36e}.hanger{position:absolute;z-index:0;width:48px;height:32px;border:2px solid #d9a061;border-top:0;transform:rotate(8deg);opacity:.7}.hanger:before{content:'';position:absolute;left:20px;top:-13px;width:7px;height:13px;border:2px solid #d9a061;border-bottom:0;border-radius:8px 8px 0 0}.hanger-one{top:22%;left:13%}.hanger-two{top:58%;right:13%;transform:rotate(-12deg)}@media(max-width:900px){.pixel-closet-card .game-copy{padding:30px}.closet-grid{max-height:none}.pixel-closet-card .dressup-board,.pixel-closet-card .closet-stage{min-height:420px}.pixel-closet-card .closet-stage:after{left:12px;top:12px;font-size:8px}.hanger-one{left:8%}.hanger-two{right:8%}}
'''
style.write_text(style.read_text() + css_add)
print('pixel closet rethemed')
