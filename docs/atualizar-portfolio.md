# Como atualizar o portfólio

Este site é estático: o conteúdo principal fica em `index.html`, os estilos em `style.css` e as interações e textos do seletor de idioma em `script.js`.

## Alterar textos

1. Abra o repositório `Duerda/portif-lio` no GitHub e entre em `index.html`.
2. Use o lápis para editar o texto da seção desejada. As seções principais estão identificadas por `id`, como `sobre`, `skills`, `projetos` e `contato`.
3. Se o texto também aparece em inglês, atualize a tradução correspondente nos objetos `text.en` e `text.pt` em `script.js`. O seletor de idioma reescreve alguns textos da página a partir desses objetos.
4. Confira a prévia e salve as alterações com **Commit changes**. Se o site estiver publicado a partir da branch `main`, o GitHub Pages atualizará o site conforme a configuração de publicação do repositório.

## Adicionar ou editar um projeto

- Cada projeto é um elemento `<article class="project-card">` na seção `#projetos` de `index.html`.
- Atualize título, descrição, ferramentas, imagem e os links do projeto. Para incluí-lo no filtro de design, acrescente `design` ao atributo `data-category`; para outro filtro, use os nomes já presentes nos botões.
- Os estudos de caso são configurados no objeto `caseData` de `script.js`. Use a mesma chave que aparece no atributo `data-project` do cartão.
- Se acrescentar um projeto, ajuste também os números apresentados no resumo e nos filtros para que continuem corretos.

## Trocar imagens

Envie a nova imagem para a pasta apropriada dentro de `assets/` e atualize o caminho em `index.html` (ou em `caseData`, quando for a imagem do modal). Prefira WebP ou imagens comprimidas e use texto alternativo descritivo. Imagens de projetos abaixo da primeira tela já usam carregamento tardio para reduzir o carregamento inicial.

## Atualizar o LinkedIn

O link aparece no topo e na seção de contato. Procure `linkedin.com/in/` em `index.html` e substitua o `href` nos dois lugares, mantendo o texto do botão.

## Ajustar o visual

As cores e componentes principais ficam no começo de `style.css`, em `:root`. As regras para telas menores estão nos blocos `@media`; mantenha o layout legível em celular ao alterar larguras, espaçamentos ou tipografia.
