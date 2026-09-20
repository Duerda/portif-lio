from pathlib import Path

path = Path('/home/ubuntu/portif-lio/index.html')
html = path.read_text()
html = html.replace('Ver detalhes <span>＋</span>', 'Abrir estudo de caso <span>↗</span>')
marker = '  </main>\n'
modal = '''  <div class="case-modal" id="case-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="case-title">
    <div class="case-backdrop" data-case-close></div>
    <article class="case-panel">
      <button class="case-close" type="button" aria-label="Fechar estudo de caso" data-case-close>×</button>
      <div class="case-hero"><div class="case-hero-image"><img id="case-image" src="" alt=""></div><div class="case-hero-copy"><p class="case-eyebrow" id="case-eyebrow"></p><h2 id="case-title"></h2><p id="case-summary"></p><div class="case-actions"><a id="case-live" class="button button-dark" href="#" target="_blank" rel="noreferrer">Ver projeto ao vivo ↗</a><a id="case-github" class="button button-light" href="#" target="_blank" rel="noreferrer">Ver código ↗</a></div></div></div>
      <div class="case-body"><div class="case-statement"><span>O que este projeto resolve</span><p id="case-problem"></p></div><div class="case-grid"><section><span>MINHA CONTRIBUIÇÃO</span><p id="case-role"></p></section><section><span>COMO PENSEI A SOLUÇÃO</span><p id="case-solution"></p></section><section><span>O QUE FOI CONSTRUÍDO</span><ul id="case-features"></ul></section><section><span>TECNOLOGIAS</span><div id="case-tech" class="case-tags"></div></section></div><div class="case-bottom"><div><span>O QUE APRENDI</span><p id="case-learning"></p></div><div><span>PRÓXIMO PASSO</span><p id="case-next"></p></div></div></div>
    </article>
  </div>
'''
if marker not in html:
    raise SystemExit('main marker missing')
html = html.replace(marker, marker + modal, 1)
path.write_text(html)
print('case study modal added')
