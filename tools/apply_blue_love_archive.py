from pathlib import Path

root = Path('/home/ubuntu/portif-lio')
css = root / 'style.css'
text = css.read_text()
replacements = {
    "@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');": "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');",
    "--ink:#081b2b;--ink-2:#102f47;--paper:#f3f0e9;--paper-2:#fffdf8;--mist:#d8edf4;--sky:#8ed8ef;--cyan:#27bad7;--blue:#2567d7;--yellow:#f0d46b;--muted:#6c7c86;--line:#c8d9dc;--serif:'Space Grotesk',sans-serif;": "--ink:#102b50;--ink-2:#234a78;--paper:#f7f6f1;--paper-2:#fffefa;--mist:#dcecf3;--sky:#a9d8ea;--cyan:#7ba8e8;--blue:#356cc8;--yellow:#e9d36d;--muted:#71808a;--line:#c9dce5;--serif:'Cormorant Garamond',serif;",
    "background:linear-gradient(90deg,transparent 0 49.8%,rgba(8,27,43,.035) 50%,transparent 50.2%),repeating-linear-gradient(0deg,transparent 0 79px,rgba(8,27,43,.025) 80px);": "background:radial-gradient(circle at 12% 8%,#dcecf3aa 0 3%,transparent 18%),radial-gradient(circle at 87% 30%,#a9d8ea55 0 4%,transparent 20%),repeating-linear-gradient(0deg,transparent 0 79px,rgba(16,43,80,.024) 80px);",
    ".logo:before{content:'E/';display:grid;place-items:center;width:40px;height:40px;background:var(--ink);color:var(--sky);border:2px solid var(--cyan);font:700 16px var(--serif);letter-spacing:-2px;transform:rotate(-7deg);box-shadow:5px 5px 0 var(--yellow)}": ".logo:before{content:'E/';display:grid;place-items:center;width:42px;height:42px;background:var(--mist);color:var(--blue);border:1px solid var(--blue);font:700 18px var(--serif);letter-spacing:-2px;transform:rotate(-8deg);box-shadow:5px 5px 0 var(--sky)}",
    ".hero:after{content:'PORTFOLIO / 26';": ".hero:after{content:'BLUE LOVE / ARCHIVE';",
    ".hero h1{max-width:700px;margin:22px 0 24px;font:700 clamp(58px,8vw,108px)/.94 var(--serif);letter-spacing:-6px}": ".hero h1{max-width:700px;margin:22px 0 24px;font:700 clamp(64px,8.5vw,116px)/.84 var(--serif);letter-spacing:-5px}",
    ".y2k-grid{position:absolute;width:440px;height:430px;background-image:linear-gradient(#75cce522 1px,transparent 1px),linear-gradient(90deg,#75cce522 1px,transparent 1px);background-size:28px 28px;transform:perspective(500px) rotateX(48deg) rotateZ(-12deg);bottom:5px}": ".y2k-grid{position:absolute;width:440px;height:430px;background-image:linear-gradient(#356cc822 1px,transparent 1px),linear-gradient(90deg,#356cc822 1px,transparent 1px);background-size:31px 31px;transform:perspective(500px) rotateX(48deg) rotateZ(-12deg);bottom:5px;opacity:.65}",
    ".photo-frame{width:315px;height:425px;padding:10px;background:var(--ink);box-shadow:18px 20px 0 var(--yellow);": ".photo-frame{width:315px;height:425px;padding:10px;background:var(--paper-2);box-shadow:18px 20px 0 var(--sky);",
    ".photo-frame img{width:100%;height:100%;object-fit:cover;object-position:center top;filter:saturate(.72) contrast(1.08)}": ".photo-frame img{width:100%;height:100%;object-fit:cover;object-position:center top;filter:saturate(.6) contrast(1.04);mix-blend-mode:multiply}",
    ".photo-tag{position:absolute;left:-35px;bottom:28px;padding:12px 16px;background:var(--cyan);color:var(--ink);": ".photo-tag{position:absolute;left:-35px;bottom:28px;padding:12px 16px;background:var(--blue);color:#fff;",
    ".projects-section{order:2;max-width:1320px;width:100%;margin:auto;padding:100px 7% 125px;background:var(--ink);color:#fff;position:relative}": ".projects-section{order:2;max-width:1320px;width:100%;margin:auto;padding:100px 7% 125px;background:var(--mist);color:var(--ink);position:relative;border-block:1px solid var(--line)}",
    ".projects-section:before{content:'SELECTED WORK';position:absolute;right:7%;top:25px;color:#356078;": ".projects-section:before{content:'BLUE / ARCHIVE';position:absolute;right:7%;top:25px;color:#a9cddd;",
    ".projects-section .section-kicker,.projects-section .project-filter-label{color:var(--sky)}": ".projects-section .section-kicker,.projects-section .project-filter-label{color:var(--blue)}",
    ".projects-section .section-kicker span{color:#477386}": ".projects-section .section-kicker span{color:#8aaebd}",
    ".section-head h2,.intro-grid h2{font:700 clamp(39px,5.5vw,74px)/1.02 var(--serif);letter-spacing:-4px;color:var(--paper)}": ".section-head h2,.intro-grid h2{font:700 clamp(44px,5.5vw,78px)/.9 var(--serif);letter-spacing:-3px;color:var(--ink)}",
    ".section-head>p{max-width:380px;color:#aac0c8;": ".section-head>p{max-width:380px;color:var(--muted);",
    ".project-explorer{display:flex;align-items:center;justify-content:space-between;gap:24px;margin:-12px 0 32px;padding:15px 0;border-block:1px solid #28475a}": ".project-explorer{display:flex;align-items:center;justify-content:space-between;gap:24px;margin:-12px 0 32px;padding:15px 0;border-block:1px solid var(--line)}",
    ".filter-button{border:1px solid #426174;background:transparent;color:#aac0c8;": ".filter-button{border:1px solid #9ebdca;background:transparent;color:var(--ink-2);",
    ".filter-button:hover,.filter-button.is-active{border-color:var(--cyan);background:var(--cyan);color:var(--ink);": ".filter-button:hover,.filter-button.is-active{border-color:var(--blue);background:var(--blue);color:#fff;",
    ".project-card{overflow:hidden;background:var(--paper-2);color:var(--ink);border:1px solid #d5e4e4;border-radius:0;box-shadow:8px 8px 0 #173a50;": ".project-card{overflow:hidden;background:var(--paper-2);color:var(--ink);border:1px solid #c4dbe3;border-radius:3px 18px 3px 18px;box-shadow:8px 8px 0 #a9d8ea;",
    ".project-card:hover{transform:translate(-4px,-5px);box-shadow:13px 14px 0 var(--cyan)}": ".project-card:hover{transform:translate(-4px,-5px) rotate(-.4deg);box-shadow:13px 14px 0 var(--blue)}",
    ".project-card.featured{grid-row:span 2}": ".project-card.featured{grid-row:span 2;transform:rotate(-.7deg)}",
    ".preview-chip{position:absolute;left:17px;top:16px;padding:5px 8px;background:var(--ink);color:var(--sky);": ".preview-chip{position:absolute;left:17px;top:16px;padding:5px 8px;background:var(--blue);color:#fff;",
    ".contact-card{position:relative;overflow:hidden;padding:76px 45px;text-align:center;background:var(--cyan);": ".contact-card{position:relative;overflow:hidden;padding:76px 45px;text-align:center;background:var(--mist);",
    ".contact-card h2{position:relative;margin:18px 0 16px;font:700 clamp(40px,6vw,75px)/1.02 var(--serif);letter-spacing:-4px;color:var(--ink)}": ".contact-card h2{position:relative;margin:18px 0 16px;font:700 clamp(44px,6vw,78px)/.9 var(--serif);letter-spacing:-3px;color:var(--ink)}",
}
for old, new in replacements.items():
    if old not in text:
        raise SystemExit(f'missing replacement anchor: {old[:70]}')
    text = text.replace(old, new, 1)
css.write_text(text)

html = root / 'index.html'
page = html.read_text()
page = page.replace('Projetos com <em>intenção.</em>', 'Um arquivo azul de <em>ideias.</em>')
page = page.replace('Oi, eu sou a Eduarda. Estudo Desenvolvimento de Sistemas e transformo problemas reais em interfaces claras, produtos úteis e experiências digitais com identidade própria.', 'Oi, eu sou a Eduarda. Entre código, colagem e curiosidade, construo interfaces claras — mas nunca sem alma.')
page = page.replace('Ideias, interfaces e <em>aprendizados.</em>', 'Código com sentimento e <em>projetos que ficam.</em>')
page = page.replace('Sites, aplicações e estudos visuais separados por área — com desafio, solução, papel, aprendizados e um preview de cada experiência.', 'Um arquivo de sites, aplicações e estudos visuais: cada projeto tem uma história, uma textura e um jeito próprio de funcionar.')
page = page.replace('Curiosidade para começar. <em>Intenção para entregar.</em>', 'Curiosidade para começar. <em>Intenção para deixar marca.</em>')
html.write_text(page)

print('Blue Love Archive identity applied')
