from pathlib import Path

path = Path('/home/ubuntu/portif-lio/index.html')
html = path.read_text()
replacements = {
    'ESTUDANTE DE TECNOLOGIA <b>·</b> ITU, SP': 'DESENVOLVIMENTO & DESIGN <b>·</b> ITU, SP',
    'Oi, eu sou a Eduarda. Estudo Desenvolvimento de Sistemas e transformo perguntas em interfaces, produtos e experiências digitais com identidade própria.': 'Oi, eu sou a Eduarda. Estudo Desenvolvimento de Sistemas e transformo problemas reais em interfaces claras, produtos úteis e experiências digitais com identidade própria.',
    'Uma pessoa curiosa, construindo seu lugar na <em>tecnologia.</em>': 'Curiosidade para começar. <em>Intenção para entregar.</em>',
    'Estou estudando Desenvolvimento de Sistemas e explorando diferentes caminhos dentro da tecnologia — do front-end ao design de interfaces.': 'Sou estudante de Desenvolvimento de Sistemas e atuo na interseção entre código, produto e direção visual — do front-end ao design de interfaces.',
    'Gosto de aprender fazendo: testar ideias, resolver problemas e criar projetos que tornam cada etapa do aprendizado visível.': 'Gosto de aprender fazendo: entender o problema, organizar a experiência, testar ideias e transformar cada etapa em algo que as pessoas conseguem usar e lembrar.',
    'Se quiser conhecer melhor meu trabalho ou trocar uma ideia, meu GitHub e meu e-mail estão aqui.': 'Se você procura alguém curiosa, cuidadosa e pronta para construir uma boa experiência do zero, vamos conversar sobre o seu próximo projeto.',
    'Vamos criar algo<br><em>legal juntos?</em>': 'Vamos transformar uma ideia em<br><em>uma boa experiência?</em>',
    'Ver meus projetos <span>↓</span>': 'Conhecer meu trabalho <span>↓</span>',
    'Vamos conversar <span>↗</span>': 'Falar sobre um projeto <span>↗</span>',
}
for old, new in replacements.items():
    if old not in html:
        print('missing:', old[:90])
    html = html.replace(old, new)
path.write_text(html)
print('professional positioning applied')
