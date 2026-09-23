from pathlib import Path
p=Path('/home/ubuntu/portif-lio/script.js')
s=p.read_text()
start=s.find('/* CORINHA')
if start == -1:
    start=s.find('/* SNAKE')
if start >= 0:
    s=s[:start]
logic=r'''

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
'''
p.write_text(s+logic)
css=Path('/home/ubuntu/portif-lio/style.css')
t=css.read_text().replace('.corinha-section','.snake-section').replace('.corinha-heading','.snake-heading').replace('.corinha-game-card','.snake-game-card').replace('#corinha-canvas','#snake-canvas')
css.write_text(t)
print('snake game installed')
