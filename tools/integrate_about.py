from pathlib import Path

path = Path('/home/ubuntu/portif-lio/index.html')
html = path.read_text()
replacements = {
    '<span><b>2DS</b> Etec</span>': '<span><b>3DS</b> Etec</span>',
    'Sou estudante de Desenvolvimento de Sistemas e atuo na interseção entre código, produto e direção visual — do front-end ao design de interfaces.': 'Sou estudante do 3º ano de Desenvolvimento de Sistemas e estou buscando minha primeira oportunidade profissional em tecnologia. Atuo na interseção entre código, produto e direção visual — do front-end ao design de interfaces.',
    'Gosto de aprender fazendo: entender o problema, organizar a experiência, testar ideias e transformar cada etapa em algo que as pessoas conseguem usar e lembrar.': 'Tenho conhecimentos em HTML, CSS, JavaScript, PHP, React, React Native, Firebase e SQL. Gosto de aprender fazendo: já desenvolvi projetos próprios e acadêmicos com autenticação, CRUD, banco de dados, interfaces responsivas e outras funcionalidades reais.',
    '<a class="arrow-link" href="mailto:eduardasouzateixeira68@gmail.com">Fale comigo <span>→</span></a>': '<div class="about-signals"><span>● Disponível para primeira oportunidade</span><span>● Dedicada, responsável e pronta para aprender</span></div><a class="arrow-link" href="mailto:eduardasouzateixeira68@gmail.com">Fale comigo <span>→</span></a>',
}
for old, new in replacements.items():
    if old not in html:
        print('missing:', old[:90])
    html = html.replace(old, new)
path.write_text(html)
print('about section integrated')
