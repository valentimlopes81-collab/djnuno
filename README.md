# Nuno Garcia — Site do DJ

Site estático (HTML/CSS/JS puro, sem build) para o DJ Nuno Garcia. Cinco páginas no menu principal — `index.html` (com a biografia em scroll), `eventos.html`, `servicos.html`, `galeria.html` e `contactos.html` — mais uma sexta página, `portfolio.html`, que existe mas **não está no menu** (só é acessível pelo botão "Portfólio Completo" na secção de biografia da página principal). O botão **"Pedir Orçamento"** está sempre visível no cabeçalho, dentro de cada secção e numa barra fixa no telemóvel.

## Como ver o site localmente

Não precisa de instalar nada — basta um servidor estático simples:

```
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` no browser.

## Onde adicionar as fotos (sem precisar de tocar em código)

Todos os espaços de foto do site já estão prontos a usar — basta colocar o ficheiro **com o nome exato** na pasta certa, dentro de `images/`, e a foto aparece automaticamente (sem editar HTML/CSS). Enquanto o ficheiro não existir, esse espaço mostra um fundo escuro elegante em vez de aparecer partido.

```
images/
  logos/            → ficheiro do logótipo original (ver nota abaixo)
    clubs/           → logótipos PNG dos clubs/espaços (para substituir os botões de texto
                        em "Já atuou em espaços como" e em portfolio.html — ver README dessa pasta)
  fotos/
    hero/            → hero-dj.jpg              (banner principal, 1 foto)
    bio/             → retrato.jpg              (biografia, 1 foto)
    galeria/         → 22 espaços — ver images/fotos/galeria/README.md para a lista de nomes
                        (por-organizar/ → fotos reais enviadas ainda sem venue confirmado)
    eventos/         → carrossel das 3 secções de eventos.html — casamentos-01.jpg a 05,
                        corporativos-01.jpg a 05, sociais-01.jpg a 05
    servicos/        → carrossel das 3 secções de servicos.html — dj-musico-01.jpg a 05,
                        dj-cantora-01.jpg a 05, audiovisuais-01.jpg a 05
audio/
  tracks/           → ficheiros .mp3 do mini-player do cabeçalho
  covers/           → capa de cada som (ver audio/README.md para o passo a passo completo)
```

Cada pasta tem o seu próprio `README.md` com a lista exata de nomes de ficheiro esperados.

**Sobre o logótipo:** já está a usar o ficheiro real (`images/logos/nuno-garcia-wordmark.png`, fundo removido) no cabeçalho, rodapé e hero de todas as páginas.

## O que já está pronto

- Design completo (paleta preto/dourado, tipografia forte, animações de scroll).
- Logótipo real (`images/logos/nuno-garcia-wordmark.png`) no cabeçalho, rodapé e hero de todas as páginas.
- Hero da página principal com o menu flutuante (transparente) sobreposto a uma foto de fundo, sem botões "Início" nem "Ver Galeria".
- Biografia real, lista de espaços onde já atuou, e as 3 áreas de evento (Casamentos, Corporativos, Sociais) em `eventos.html`.
- Serviços reais em `servicos.html`: Dupla DJ + Músico, Dupla DJ + Cantora, Audiovisuais e o catálogo completo da Get Wild Eventos.
- Carrossel infinito de fotos (auto-scroll, pausa ao passar o rato) à direita de cada uma das 3 secções em `eventos.html` e `servicos.html`.
- Galeria com 22 espaços de foto (um por cada espaço/venue real + genéricos), filtros por categoria e lightbox — a foto certa abre automaticamente ao clicar.
- **Primeiras fotos reais já colocadas**: foto de banner (hero), retrato da biografia, 6 espaços da galeria (MAIN Lisboa ×2, BBC Lisboa, Praia Verde, B Beach Oeiras, Água Moments Vilamoura, Gala Globos de Ouro — confirmados pelo logótipo visível em cada foto) e a primeira foto da secção "Dupla DJ + Músico" em `servicos.html`. As restantes 20 fotos reais enviadas ficaram em `images/fotos/galeria/por-organizar/` à espera de confirmação de venue/evento antes de serem colocadas num espaço com nome específico.
- Contactos reais (telefone e email) já ligados em todo o site a partir de `js/main.js`.
- Formulário de orçamento em `contactos.html` (abre o cliente de email do visitante com os dados preenchidos).
- Botão flutuante de WhatsApp e barra fixa de "Pedir Orçamento" no telemóvel.
- Animação de brilho + zoom ao passar o rato (ou focar) nos botões tipo "pill" (a lista de espaços e os catálogos da Get Wild Eventos).
- Rodapé simplificado: só logótipo/redes sociais e contacto (sem as colunas de navegação e serviços repetidas).
- Página `portfolio.html`, fora do menu principal (só acessível pelo botão "Portfólio Completo"), com duas secções — **Portfólio Eventos** (restaurantes, hotéis e eventos de marca) e **Portfólio Clubbing** (clubs por década) — cada uma com um espaço de logótipos para os parceiros/espaços mais importantes.
- **8 logótipos reais já colocados**: Mome Lisboa, Cuá Cuá Algarve, Bliss Algarve, Casino Estoril, Praia no Parque, Praia Verde, Tamariz Estoril e Lust in Rio — com fundo removido e, nos que estavam a preto, convertidos para branco para ficarem visíveis no tema escuro do site. Aparecem em "Já atuou em espaços como" (`index.html`) e em "Portfólio Clubbing" (`portfolio.html`); os espaços sem logótipo ainda foram removidos dessas duas listas até termos o ficheiro.
- **Mini-player de áudio no cabeçalho** (`js/player.js`, por agora só na versão PC — a versão mobile vai ser tratada numa próxima fase): ícone circular com a capa do som atual à esquerda do logótipo; ao clicar, abre um leitor completo (capa, título, anterior/reproduzir/seguinte, volume, barra de progresso e um botão para fechar/retrair). A faixa, posição, volume e se está aberto ou fechado ficam guardados no browser, por isso não reiniciam ao mudar de página — ver `audio/README.md` para como adicionar os primeiros sons. Sem nenhum som na lista, o leitor fica escondido.

## O que ainda falta para o site ficar 100% completo

1. **Fotos** — ver secção acima. Já há 8 fotos reais colocadas (hero, retrato, 6 espaços da galeria, 1 do carrossel de serviços); faltam as restantes (carrosséis de eventos.html e servicos.html, e os espaços da galeria ainda sem foto). Há mais 20 fotos reais em `images/fotos/galeria/por-organizar/` prontas a usar assim que soubermos a que venue/evento cada uma pertence.
2. **Restantes logótipos de clubs/hotéis** — 8 já estão no site (ver acima); faltam os das secções "Portfólio Eventos" (Tivoli, Intercontinental, Corinthia, Grupo Pestana, Grupo Sana) e mais alguns clubs (Main Lisboa, Kapital, Nuts Club, News, BBC, Paradise Garage) — ver `images/logos/clubs/README.md` para a lista completa e como enviar mais.
3. **Link da Get Wild Eventos** — em `servicos.html` e `eventos.html` há uma referência à Get Wild Eventos, mas não tínhamos o URL real do site. Defina-o em `js/main.js`, na linha `getwildUrl` dentro de `SITE_CONFIG` (o botão "Visitar Get Wild Eventos" fica inativo até lá).
4. **Redes sociais** — `js/main.js` (`SITE_CONFIG.instagram` / `.facebook`) ainda aponta para handles genéricos (`djnunogarcia`); confirme se estão corretos.
5. **Testemunhos** — a secção de testemunhos com citações de clientes foi removida (eram exemplos fictícios, e não é correto publicar avaliações inventadas atribuídas a clientes que não existem). Se quiser reintroduzi-la, use apenas avaliações reais de clientes.
6. **Sons do mini-player** — o leitor de áudio do cabeçalho já está todo pronto no código, mas ainda sem nenhum som (fica escondido até lá). Ver `audio/README.md` para colocar o primeiro mp3 + capa.

## Estrutura

```
index.html        → Início: hero + biografia (scroll) + Duplas & Parcerias + Galeria (teaser)
eventos.html       → Casamentos, Eventos Corporativos, Eventos Sociais (com carrossel) + parceria Get Wild
servicos.html      → Dupla DJ+Músico, Dupla DJ+Cantora, Audiovisuais (com carrossel), Outros Serviços
galeria.html        → Galeria de fotos (22 espaços, filtros, lightbox), aba "DJ Sets"
contactos.html      → Formulário de orçamento + contactos
portfolio.html       → Espaços/clubs onde já atuou (fora do menu — só link é o botão na homepage)
css/style.css        → Todo o design do site
js/main.js            → Menu, animações, formulário, lightbox, config de contactos (SITE_CONFIG)
js/player.js          → Mini-player de áudio do cabeçalho (lista de faixas, estado persistente)
images/               → Ver "Onde adicionar as fotos" acima
audio/                → Faixas e capas do mini-player — ver audio/README.md
```

## Publicar em produção (Vercel)

Este é um site estático puro — não precisa de build nem de configuração especial no Vercel: basta ligar este repositório GitHub a um projeto Vercel (Framework Preset: "Other"/nenhum, sem build command, output = raiz do repositório). Depois disso, cada push/merge para o branch de produção (normalmente `main`) faz deploy automático.
