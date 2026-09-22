# Prompt de implementação — landing page cinematográfica de Onirium

Você é um diretor de arte digital e desenvolvedor front-end sênior especializado em experiências web cinematográficas para jogos. Crie uma landing page premium, responsiva e altamente imersiva para **Onirium**, um jogo/projeto de TCC. O resultado deve parecer um híbrido entre um site oficial de lançamento de jogo AAA, um menu de videogame e um artbook interativo — inspirado no impacto visual e no ritmo editorial de sites de grandes jogos, como GTA VI, mas sem copiar layout, identidade, assets ou elementos proprietários de nenhuma marca.

## Objetivo criativo

As **ilustrações e pôsteres são os protagonistas absolutos**. Textos, menus, botões e ornamentos devem enquadrar e valorizar as artes, nunca competir com elas. Construa uma narrativa visual contínua: o usuário não deve sentir que está apenas descendo uma página, e sim atravessando cenas de um sonho. Use composição cinematográfica, grandes áreas de imagem, profundidade, parallax controlado, luz, névoa, grão e transições orgânicas.

As imagens finais serão adicionadas depois. Portanto, crie componentes e placeholders claramente identificados, com proporções realistas e fáceis de substituir, sem inventar imagens finais. Use nomes como `hero-poster`, `discover-poster`, `world-poster-01`, `character-lucci`, etc. Todo placeholder deve continuar visualmente elegante e indicar a proporção recomendada.

## Stack e implementação

- Use **React com Vite**, CSS moderno e JavaScript.
- Use **GSAP + ScrollTrigger** para timelines, pinning, reveals, scrub e transições entre cenas.
- Use **Lenis** integrado corretamente ao ticker do GSAP para smooth scroll, preservando acessibilidade e navegação por teclado.
- Use SVG masks, `clip-path`, filtros e texturas leves para criar bordas de aquarela/papel rasgado nas imagens.
- Evite dependências desnecessárias, WebGL pesado e efeitos que prejudiquem carregamento.
- Estruture o código em componentes reutilizáveis e mantenha os dados de personagens, pôsteres e navegação separados da apresentação.
- Entregue uma implementação completa e executável, sem pseudocódigo, sem TODOs funcionais e sem exigir serviços externos.

## Identidade visual obrigatória

Use os arquivos reais existentes em `/assets`:

- `/assets/logo.svg`: elemento central da marca. Deve dominar o Hero, aparecer reduzido no menu e retornar como selo, marca d'água ou transição em outros momentos da experiência.
- `/assets/paleta.png`: fonte de verdade para a paleta.
- `/assets/lucci_vida_cheia.svg` e `/assets/c_c.svg`: incorpore como elementos da interface, HUD, personagem, ícone, ornamento ou detalhe narrativo, respeitando o conteúdo original.

Direção cromática aproximada observada na paleta: azul-violeta, roxo ameixa profundo, lilás muito claro, off-white e quase preto arroxeado. Extraia as cores reais de `paleta.png` e converta-as em CSS custom properties; não substitua a identidade por preto puro ou roxos neon genéricos. O roxo é a cor principal, com o azul como contraste atmosférico e os tons claros como papel/luz.

Crie uma estética de **aquarela sombria + fantasia onírica + interface de jogo cinematográfica**:

- bordas irregulares de tinta e papel nas molduras;
- manchas translúcidas e pigmento acumulado nas extremidades;
- fundos escuros com névoa azul-violeta, vinheta e grão muito sutil;
- tipografia de display com personalidade para títulos e uma sans-serif legível para UI e corpo;
- pequenos labels, coordenadas, números de capítulo, retículas, linhas finas, indicadores e prompts de interação;
- profundidade em camadas, evitando glassmorphism corporativo, gradientes genéricos e excesso de cards.

## Estrutura obrigatória

A página deve conter, nesta ordem e com estes IDs semânticos: **Hero, Discover, World, Personagens e About**.

### 1. Hero

- Ocupa a viewport inteira e funciona como a tela inicial de um jogo.
- Um pôster principal cobre a cena em múltiplas camadas preparadas para parallax: fundo, atmosfera, personagem/objeto e foreground. Caso só exista uma imagem, simule profundidade com recortes, escalas e overlays discretos sem deformá-la.
- Posicione `/assets/logo.svg` em grande destaque, com entrada cinematográfica: máscara de tinta revelando o símbolo, leve bloom e respiração quase imperceptível.
- Inclua navegação minimalista para as cinco seções, indicador `01 / 05`, um pequeno status como `ENTER THE DREAM` e CTAs: **Descobrir Onirium** e **Assistir teaser**.
- O CTA do teaser pode abrir um modal cinematográfico acessível com placeholder de vídeo 16:9.
- Ao iniciar o scroll, fixe o Hero por um trecho. A arte deve ser revelada por uma máscara orgânica de aquarela; simultaneamente, a câmera faz um push-in sutil, o logo se afasta e as camadas ganham parallax. Termine em uma transição de pigmento que “invade” a tela e conduz ao Discover.
- Inclua indicador de scroll estilizado como prompt de controle, sem parecer scrollbar convencional.

### 2. Discover

- Apresente o conceito do jogo como um capítulo de descoberta, com headline curta, texto enxuto e uma grande composição de pôster.
- Use layout assimétrico editorial: texto ocupando no máximo 30–35% e arte ocupando o restante.
- Durante o scroll, mantenha a seção pinada e revele o pôster horizontal ou diagonalmente por uma borda de tinta que se espalha. Evite simples `fade-up`.
- Faça palavras-chave surgirem em ritmo sequencial, como legendas de trailer.
- Inclua um CTA **Conheça a jornada** e pequenos dados de UI, como gênero, plataforma e estado do projeto, usando conteúdo placeholder facilmente editável.

### 3. World

- Construa uma sequência imersiva de 2 a 4 pôsteres/cenários em tela cheia, como páginas de um artbook vivo.
- O scroll vertical deve controlar uma narrativa horizontal ou uma troca de cenas pinada. Cada cenário entra com parallax multicamada, máscara aquarelada e mudança gradual da cor ambiente.
- Inclua nomes de locais, uma frase breve e índice de capítulo; não crie blocos longos de texto.
- Entre cenas, utilize manchas de tinta, véus de névoa e o símbolo da logo como transição. Não use carrossel tradicional com bolinhas.
- CTA final: **Explore este mundo**.

### 4. Personagens

- Crie um showcase de personagens inspirado em uma tela de seleção de jogo, porém sofisticado e editorial.
- Destaque um personagem por vez com arte recortada ou pôster vertical grande; ao lado, exiba nome, função narrativa, frase curta e atributos/ícones de interface.
- Integre `/assets/lucci_vida_cheia.svg` como conteúdo real de personagem/HUD quando adequado e `/assets/c_c.svg` como elemento complementar da interface ou da identidade.
- A troca entre personagens pode responder ao scroll pinado, clique e teclado. Anime silhueta, iluminação, nome e dados em timelines coordenadas.
- Miniaturas devem parecer fragmentos pintados, não cards de produto.
- CTA: **Conheça os personagens**.

### 5. About

- Feche a experiência como os créditos de um jogo/filme.
- Conte, de modo conciso, que Onirium é um projeto de TCC e reserve campos fáceis de editar para sinopse, equipe, instituição, curso, ano e contatos.
- Use um último pôster ou composição ampla com moldura de aquarela, seguido de créditos minimalistas.
- Faça `/assets/logo.svg` retornar com força no encerramento e inclua CTAs **Assistir teaser**, **Acompanhar o projeto** e **Entrar em contato**.
- Inclua footer com navegação, redes/contato e créditos, mantendo o clima visual até o último pixel.

## Movimento e experiência de scroll

O scroll deve ser uma ferramenta narrativa, não uma rolagem comum. Construa uma sequência contínua com:

- seções pinadas apenas onde agregam narrativa;
- scrub suave e preciso;
- reveals por máscaras orgânicas em vez de opacidade simples;
- transições de câmera com escala moderada, deslocamento em profundidade e mudanças de foco;
- parallax com velocidades diferentes e limites sutis;
- títulos que entram por recorte, tracking e deslocamento;
- progresso lateral ou numérico `01—05` indicando o capítulo atual;
- menu que muda de contraste conforme a cena e evidencia a seção ativa;
- cursor customizado apenas em desktop/pointer preciso, com estados `explorar`, `arrastar` e `assistir`, sem prejudicar cliques.

Mantenha as animações elegantes e legíveis: nada deve girar ou saltar sem propósito. Priorize sensação de direção de câmera. Garanta uma versão responsiva específica para mobile — não apenas a redução do desktop — diminuindo pinning e parallax quando necessário.

## Molduras de aquarela

Crie um componente reutilizável `WatercolorFrame` para todas as artes principais. Ele deve:

- usar máscara SVG/CSS com bordas irregulares e pequenas variações por instância;
- aceitar proporções horizontal, vertical e full-bleed;
- permitir layers de papel, bleed de pigmento e sombra difusa;
- revelar a imagem progressivamente via `clip-path` ou máscara animada pelo ScrollTrigger;
- preservar o foco da imagem com `object-position` configurável;
- possuir fallback visual estável para browsers sem suporte completo a mask.

## Conteúdo e tom

Escreva todo o texto visível em **português brasileiro**, com frases curtas, poéticas e misteriosas, adequadas a uma fantasia onírica. Não invente detalhes definitivos sobre a história que não foram fornecidos: use conteúdo demonstrativo claramente fácil de substituir. Não use lorem ipsum.

## Responsividade, acessibilidade e performance

- Desktop-first cinematográfico, mas totalmente funcional em tablet e mobile.
- HTML semântico, heading hierarchy correta, landmarks e labels acessíveis.
- Navegação integral por teclado, foco visível e modal com focus trap/ESC.
- Respeite `prefers-reduced-motion`: remova smooth scroll, pinning extenso e parallax, mantendo uma experiência bonita com reveals simples.
- Mantenha contraste WCAG AA para textos essenciais.
- Use `picture`, `srcset`, `sizes`, lazy loading abaixo da dobra e dimensões explícitas para evitar layout shift.
- Não aplique lazy loading ao pôster LCP do Hero; use preload/fetch priority adequadamente.
- Animações devem usar principalmente `transform`, `opacity`, masks otimizadas e `will-change` somente durante a animação.
- Limpe todos os ScrollTriggers e listeners no unmount.

## Arquitetura sugerida

Organize, no mínimo:

- `App`
- `Navigation`
- `HeroSection`
- `DiscoverSection`
- `WorldSection`
- `CharactersSection`
- `AboutSection`
- `WatercolorFrame`
- `ChapterIndicator`
- `VideoModal`
- `GameHud`
- hooks para Lenis, ScrollTrigger, reduced motion e media queries
- arquivo de dados editável para pôsteres, personagens e textos

Use CSS custom properties para cores, tipografia, espaçamento e timing. Não coloque toda a aplicação em um único componente ou arquivo.

## Critérios de aceite

1. As cinco seções existem na ordem solicitada e formam uma narrativa contínua.
2. `/assets/logo.svg` está em destaque no Hero e retorna em outros pontos relevantes.
3. Os demais assets são usados com intenção, não como decoração aleatória.
4. As imagens/pôsteres ocupam a maior parte da composição e são simples de substituir.
5. Todas as imagens principais usam moldura/reveal aquarelado convincente.
6. O scroll possui momentos pinados, scrub, parallax e transições dirigidas, sem parecer um template comum.
7. O site funciona bem em desktop e mobile e respeita reduced motion.
8. Não há textos ilegíveis, over-animation, scrollbar sequestrada de forma frágil ou dependência de hover para conteúdo essencial.
9. O código está organizado, executável e sem erros no console.
10. A aparência final comunica claramente: **jogo cinematográfico, sonho, mistério, aquarela e identidade Onirium**.

Antes de finalizar, rode a aplicação, teste as transições em diferentes tamanhos de tela, verifique console, links, foco, performance e ausência de overflow horizontal. Apresente ao final uma lista curta dos arquivos criados, como executar o projeto e onde substituir cada pôster e texto.
