from pathlib import Path
path = Path('/home/ubuntu/portif-lio/index.html')
html = path.read_text()
html = html.replace('Abrir estudo de caso <span>↗</span>', 'Ver estudo completo <span>↗</span>')
path.write_text(html)
print('Project detail labels updated')
