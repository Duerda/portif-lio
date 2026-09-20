from pathlib import Path
import re

path = Path('/home/ubuntu/portif-lio/index.html')
html = path.read_text()

main_start = html.index('<main>') + len('<main>')
main_end = html.index('</main>')
main_body = html[main_start:main_end]

starts = list(re.finditer(r'<section\b[^>]*\bid="([^"]+)"[^>]*>', main_body))
sections = {}
for match in starts:
    section_id = match.group(1)
    depth = 1
    cursor = match.end()
    while depth:
        next_open = main_body.find('<section', cursor)
        next_close = main_body.find('</section>', cursor)
        if next_close == -1:
            raise RuntimeError(f'Unclosed section: {section_id}')
        if next_open != -1 and next_open < next_close:
            depth += 1
            cursor = next_open + 8
        else:
            depth -= 1
            cursor = next_close + len('</section>')
    sections[section_id] = main_body[match.start():cursor]

order = ['inicio', 'projetos', 'sobre', 'processo', 'ferramentas', 'contato']
missing = [item for item in order if item not in sections]
if missing:
    raise RuntimeError(f'Missing sections: {missing}')

new_body = '\n'.join(sections[item] for item in order)
html = html[:main_start] + '\n' + new_body + '\n  ' + html[main_end:]
html = html.replace('<a href="#sobre">Sobre mim</a><a href="#processo">Processo</a><a href="#projetos">Projetos</a><a href="#contato">Contato</a>', '<a href="#projetos">Projetos</a><a href="#sobre">Sobre mim</a><a href="#processo">Processo</a><a href="#contato">Contato</a>')
html = html.replace('BLUE LOVE ARCHIVE <b>·</b> ITU, SP', 'PORTFOLIO / DESENVOLVIMENTO & DESIGN <b>·</b> ITU, SP')
html = html.replace('Um arquivo azul de <em>ideias.</em>', 'Interfaces com <em>intenção.</em>')
html = html.replace('Oi, eu sou a Eduarda. Entre código, colagem e curiosidade, construo interfaces claras — mas nunca sem alma.', 'Sou Eduarda, estudante de Desenvolvimento de Sistemas. Transformo problemas reais em produtos digitais claros, sensíveis e prontos para funcionar.')
html = html.replace('Código com sentimento e <em>projetos que ficam.</em>', 'Projetos que mostram <em>como eu penso.</em>')
html = html.replace('Um arquivo de sites, aplicações e estudos visuais: cada projeto tem uma história, uma textura e um jeito próprio de funcionar.', 'Uma seleção de experiências em web, produto e interface. Cada projeto revela uma decisão, uma habilidade e um próximo passo.')
html = html.replace('Curiosidade para começar. <em>Intenção para deixar marca.</em>', 'Curiosidade para começar. <em>Clareza para entregar.</em>')
html = html.replace('Do sentimento à <em>interface.</em>', 'Do problema à <em>experiência.</em>')
html = html.replace('BLUE<br><strong>LOVE</strong>', 'SELECTED<br><strong>WORKS</strong>')
path.write_text(html)
print('Professional portfolio structure rebuilt:', ' → '.join(order))
