from pathlib import Path
p=Path('/home/ubuntu/portif-lio/script.js')
s=p.read_text()
if 'corinha-canvas' in s:
    print('game logic already present')
    raise SystemExit
s += r'''

/* CORINHA — mini game de portfolio */
(() => {
  const canvas = document.querySelector('#corinha-canvas');
  const start = document.querySelector('.game-start');
  if (!canvas || !start) return;
  const ctx = canvas.getContext('2d');
  const scoreEl = document.querySelector('#game-score');
  const timeEl = document.querySelector('#game-time');
  const messageEl = document.querySelector('#game-message');
  const words = ['curiosa', 'criativa', 'dedicada', 'atenta', 'aprendiz', 'autoral', 'corajosa', 'em movimento'];
  const keys = {};
  let player, stars, score = 0, time = 30, running = false, timer, frame;
  const resizeCanvas = () => { const ratio = canvas.clientWidth / 720; canvas.style.height = `${Math.round(canvas.clientWidth * 400 / 720)}px`; canvas.dataset.ratio = ratio; };
  window.addEventListener('resize', resizeCanvas); resizeCanvas();
  const makeStars = () => Array.from({length: 8}, (_, i) => ({ x: 65 + Math.random() * 590, y: 45 + Math.random() * 305, r: 9, word: words[i], taken: false, pulse: Math.random() * 7 }));
  const drawCloud = (x, y, scale) => { ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale); ctx.fillStyle = '#ffffffaa'; ctx.beginPath(); ctx.arc(0, 12, 18, 0, Math.PI*2); ctx.arc(22, 0, 25, 0, Math.PI*2); ctx.arc(52, 12, 18, 0, Math.PI*2); ctx.fill(); ctx.restore(); };
  const draw = () => {
    ctx.clearRect(0, 0, 720, 400);
    const grad = ctx.createLinearGradient(0, 0, 720, 400); grad.addColorStop(0, '#d9f1f2'); grad.addColorStop(1, '#8fc9d6'); ctx.fillStyle = grad; ctx.fillRect(0, 0, 720, 400);
    ctx.fillStyle = '#ffffff66'; for (let x=20;x<720;x+=48) for(let y=20;y<400;y+=48) ctx.fillRect(x,y,1,1);
    drawCloud(90, 60, .7); drawCloud(535, 280, .55);
    stars.forEach(star => { if (star.taken) return; star.pulse += .08; const glow = 3 + Math.sin(star.pulse) * 2; ctx.shadowColor = '#fff5a6'; ctx.shadowBlur = 12 + glow; ctx.fillStyle = '#fff4a8'; ctx.beginPath(); for (let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5; const r=i%2?star.r*.42:star.r; const px=star.x+Math.cos(a)*r, py=star.y+Math.sin(a)*r; i?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.closePath(); ctx.fill(); ctx.shadowBlur=0; });
    ctx.save(); ctx.translate(player.x, player.y); ctx.rotate(Math.sin(Date.now()/180)*.05); ctx.fillStyle='#fdfbf3'; ctx.strokeStyle='#1d5688'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(0,0,18,0,Math.PI*2); ctx.fill(); ctx.stroke(); ctx.fillStyle='#9ecfd8'; ctx.beginPath(); ctx.arc(-5,-3,3,0,Math.PI*2); ctx.arc(5,-3,3,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='#1d5688'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,3,7,0,Math.PI); ctx.stroke(); ctx.fillStyle='#e7d37c'; ctx.fillRect(-16,-23,32,5); ctx.restore();
    if (running) frame = requestAnimationFrame(draw);
  };
  const update = () => { if (!running) return; const speed=3.5; if(keys.ArrowLeft||keys.a) player.x-=speed; if(keys.ArrowRight||keys.d) player.x+=speed; if(keys.ArrowUp||keys.w) player.y-=speed; if(keys.ArrowDown||keys.s) player.y+=speed; player.x=Math.max(22,Math.min(698,player.x)); player.y=Math.max(22,Math.min(378,player.y)); stars.forEach(star=>{if(!star.taken && Math.hypot(player.x-star.x,player.y-star.y)<27){star.taken=true;score++;scoreEl.textContent=`${score} / 8`;messageEl.textContent=`${star.word} — mais uma palavra para o seu arquivo.`;if(score===8) finish(true);}}); if(running) setTimeout(update,16); };
  const finish = won => { running=false; clearInterval(timer); cancelAnimationFrame(frame); messageEl.textContent=won?'você encontrou todas — obrigada por brincar comigo.':'o céu ficou esperando. tente mais uma vez?'; start.textContent=won?'jogar de novo ↗':'tentar novamente ↗'; draw(); };
  const begin = () => { clearInterval(timer); score=0;time=30;running=true;player={x:360,y:200};stars=makeStars();scoreEl.textContent='0 / 8';timeEl.textContent='30s';messageEl.textContent='vai, Corinha — as estrelinhas estão por aí.';start.textContent='reiniciar partida ↗';timer=setInterval(()=>{time--;timeEl.textContent=`${time}s`;if(time<=0)finish(false);},1000);draw();update(); };
  start.addEventListener('click', begin); window.addEventListener('keydown', e=>{keys[e.key]=true;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))e.preventDefault();}); window.addEventListener('keyup',e=>{keys[e.key]=false;});
  player={x:360,y:200};stars=makeStars();draw();
})();
'''
p.write_text(s)
print('corinha logic added')
