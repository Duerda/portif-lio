from pathlib import Path

path = Path('/home/ubuntu/portif-lio/index.html')
html = path.read_text()
old_nav = '<a href="#sobre">Sobre mim</a><a href="#ferramentas">Stack</a><a href="#projetos">Projetos</a><a href="#contato">Contato</a>'
new_nav = '<a href="#sobre">Sobre mim</a><a href="#processo">Processo</a><a href="#projetos">Projetos</a><a href="#contato">Contato</a>'
html = html.replace(old_nav, new_nav)
marker = '    <section class="projects-section" id="projetos">'
section = '''    <section class="process-section" id="processo">
      <div class="section-head process-heading"><div><div class="section-kicker">03 <span>/</span> PROCESSO</div><h2>Do problema à <em>experiência.</em></h2></div><p>Não começo pelo efeito. Começo entendendo o que precisa funcionar — e só depois escolho a forma.</p></div>
      <div class="process-grid">
        <article class="process-card"><div class="process-number">01</div><span>ENTENDER</span><h3>Ouvir antes de construir.</h3><p>Organizo o problema, o contexto e as pessoas envolvidas para descobrir o que realmente precisa ser resolvido.</p></article>
        <article class="process-card"><div class="process-number">02</div><span>ESTRUTURAR</span><h3>Dar forma à ideia.</h3><p>Transformo referências e requisitos em fluxos, hierarquia, identidade visual e uma interface que faz sentido.</p></article>
        <article class="process-card process-card-dark"><div class="process-number">03</div><span>ENTREGAR</span><h3>Fazer funcionar e lembrar.</h3><p>Implemento, testo e refino cada detalhe para entregar uma experiência clara, responsiva e com personalidade.</p></article>
      </div>
      <div class="process-proof"><span class="proof-dot"></span><strong>O resultado:</strong> uma solução bonita porque é clara, e clara porque foi pensada.</div>
    </section>
'''
if marker not in html:
    raise SystemExit('projects marker not found')
html = html.replace(marker, section + marker, 1)
html = html.replace('<div class="section-kicker">03 <span>/</span> PROJETOS</div>', '<div class="section-kicker">04 <span>/</span> PROJETOS</div>', 1)
html = html.replace('<section class="contact-section" id="contato"><div class="contact-card"><div class="contact-orbit">✦</div><div class="section-kicker">04 <span>/</span> CONTATO</div>', '<section class="contact-section" id="contato"><div class="contact-card"><div class="contact-orbit">✦</div><div class="section-kicker">05 <span>/</span> CONTATO</div>', 1)
path.write_text(html)
print('process section added')
