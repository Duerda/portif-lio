const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
menuButton?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(Boolean(open)))});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));

const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('nav a[href^="#"]')];
if('IntersectionObserver' in window){
  const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>link.classList.toggle('current',link.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -55% 0px'});
  sections.forEach(section=>activeObserver.observe(section));
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(item=>revealObserver.observe(item));
}else{document.querySelectorAll('.reveal').forEach(item=>item.classList.add('visible'))}

const pageProgress=document.querySelector('.page-progress');
const backTop=document.querySelector('.back-top');
function updateScroll(){const max=document.documentElement.scrollHeight-window.innerHeight;if(pageProgress)pageProgress.style.width=`${max>0?(window.scrollY/max)*100:0}%`;backTop?.classList.toggle('show',window.scrollY>650)}
window.addEventListener('scroll',updateScroll,{passive:true});
backTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
updateScroll();

const tilt=document.querySelector('.tilt-card');
if(tilt&&window.matchMedia('(pointer:fine)').matches){tilt.addEventListener('pointermove',event=>{const rect=tilt.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;tilt.style.transform=`rotateX(${-y*6}deg) rotateY(${x*6}deg) rotate(4deg) scale(1.02)`});tilt.addEventListener('pointerleave',()=>tilt.style.transform='rotate(4deg)')}
