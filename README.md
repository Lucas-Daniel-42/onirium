# Onirium

Landing page estática em HTML, CSS e JavaScript. Execute `npm run dev` e abra `http://127.0.0.1:4173`. `npm run build` prepara a pasta `dist`.

## Cenários

Os seis arquivos `assets/scene-*.jpg` são cópias sem alterações dos JPGs fornecidos. A galeria em World ocupa uma viewport e troca as imagens horizontalmente conforme o scroll vertical. Cada imagem usa `object-fit: contain`: não há corte, distorção ou filtro. Diferenças de proporção produzem faixas escuras.

A cópia de clipboard do interlúdio é idêntica ao JPG e não foi duplicada. O PSD permanece como arquivo de trabalho original; o site utiliza o JPG correspondente, já fornecido.

Os títulos e a ordem da galeria estão nos elementos `.scene` em `index.html`. As artes podem ser substituídas mantendo os mesmos caminhos, ou alterando o atributo `src`.

## Moldura

`assets/watercolor-frame-original.svg` preserva o SVG fornecido. `watercolor-frame.svg` contém os mesmos paths, com `preserveAspectRatio="none"` na raiz para ajustar somente a borda decorativa. A moldura é aplicada por máscara de luminância no Discover: o preto do original fica transparente e o branco vira a borda na cor do fundo. Não é aplicada sobre as imagens da galeria em tela cheia.

## Interface

A fonte é Inter. A galeria, as setas, o teclado, o menu e o modal funcionam sem GSAP; a biblioteca acrescenta entradas discretas. Em `prefers-reduced-motion`, o scroll longo é desativado e os cenários continuam acessíveis pelas setas, teclado e gesto horizontal. O teaser ainda é um aviso de disponibilidade, pois nenhum vídeo foi fornecido.

As fontes Google e o GSAP são carregados pela rede. O layout mantém fonte de sistema e os controles essenciais se esses serviços não estiverem disponíveis.
