# Nuno Garcia — Site do DJ

Site estático (HTML/CSS/JS puro, sem build) para o DJ Nuno Garcia. Cinco páginas: `index.html` (com a biografia em scroll), `eventos.html`, `servicos.html`, `galeria.html` e `contactos.html`, com o botão **"Pedir Orçamento"** sempre visível no cabeçalho, dentro de cada secção e numa barra fixa no telemóvel.

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
  fotos/
    hero/            → hero-dj.jpg              (banner principal, 1 foto)
    bio/             → retrato.jpg              (biografia, 1 foto)
    galeria/         → 18 espaços — ver images/fotos/galeria/README.md para a lista de nomes
    eventos/         → carrossel das 3 secções de eventos.html — casamentos-01.jpg a 05,
                        corporativos-01.jpg a 05, sociais-01.jpg a 05
    servicos/        → carrossel das 3 secções de servicos.html — dj-musico-01.jpg a 05,
                        dj-cantora-01.jpg a 05, audiovisuais-01.jpg a 05
```

Cada pasta tem o seu próprio `README.md` com a lista exata de nomes de ficheiro esperados.

**Sobre o logótipo:** não recebi o ficheiro que enviou — nesta sessão remota, imagens coladas na conversa não chegam até mim como ficheiro (só o texto chega). O logótipo do cabeçalho/rodapé está feito em CSS puro (fiel ao original) precisamente por isso. Para usar o ficheiro real: adicione-o a este repositório em `images/logos/` (por commit direto no GitHub, ou através de outra sessão que consiga aceder ao ficheiro) e depois avise — assim que o ficheiro estiver no repositório eu troco o logótipo em todas as páginas.

## O que já está pronto

- Design completo (paleta preto/dourado, tipografia forte, animações de scroll).
- Logótipo recriado em CSS puro (texto + "X" + risca diagonal), sem depender de nenhum ficheiro de imagem.
- Hero da página principal com o menu flutuante (transparente) sobreposto a uma foto de fundo, sem botões "Início" nem "Ver Galeria".
- Biografia real, lista de espaços onde já atuou, e as 3 áreas de evento (Casamentos, Corporativos, Sociais) em `eventos.html`.
- Serviços reais em `servicos.html`: Dupla DJ + Músico, Dupla DJ + Cantora, Audiovisuais e o catálogo completo da Get Wild Eventos.
- Carrossel infinito de fotos (auto-scroll, pausa ao passar o rato) à direita de cada uma das 3 secções em `eventos.html` e `servicos.html`.
- Galeria com 18 espaços de foto (um por cada espaço/venue real + genéricos), filtros por categoria e lightbox — a foto certa abre automaticamente ao clicar.
- Contactos reais (telefone e email) já ligados em todo o site a partir de `js/main.js`.
- Formulário de orçamento em `contactos.html` (abre o cliente de email do visitante com os dados preenchidos).
- Botão flutuante de WhatsApp e barra fixa de "Pedir Orçamento" no telemóvel.

## O que ainda falta para o site ficar 100% completo

1. **Fotos** — ver secção acima. É o maior "falta" do site neste momento: nenhum espaço de foto tem ainda um ficheiro real.
2. **Logótipo em ficheiro** — ver nota acima.
3. **Link da Get Wild Eventos** — em `servicos.html` e `eventos.html` há uma referência à Get Wild Eventos, mas não tínhamos o URL real do site. Defina-o em `js/main.js`, na linha `getwildUrl` dentro de `SITE_CONFIG` (o botão "Visitar Get Wild Eventos" fica inativo até lá).
4. **Redes sociais** — `js/main.js` (`SITE_CONFIG.instagram` / `.facebook`) ainda aponta para handles genéricos (`djnunogarcia`); confirme se estão corretos.
5. **Testemunhos** — a secção de testemunhos com citações de clientes foi removida (eram exemplos fictícios, e não é correto publicar avaliações inventadas atribuídas a clientes que não existem). Se quiser reintroduzi-la, use apenas avaliações reais de clientes.

## Estrutura

```
index.html        → Início: hero + biografia (scroll) + Duplas & Parcerias + Galeria (teaser)
eventos.html       → Casamentos, Eventos Corporativos, Eventos Sociais (com carrossel) + parceria Get Wild
servicos.html      → Dupla DJ+Músico, Dupla DJ+Cantora, Audiovisuais (com carrossel), Outros Serviços
galeria.html        → Galeria de fotos (18 espaços, filtros, lightbox)
contactos.html      → Formulário de orçamento + contactos
css/style.css        → Todo o design do site
js/main.js            → Menu, animações, formulário, lightbox, config de contactos (SITE_CONFIG)
images/               → Ver "Onde adicionar as fotos" acima
```

## Publicar em produção (Vercel)

Este é um site estático puro — não precisa de build nem de configuração especial no Vercel: basta ligar este repositório GitHub a um projeto Vercel (Framework Preset: "Other"/nenhum, sem build command, output = raiz do repositório). Depois disso, cada push/merge para o branch de produção (normalmente `main`) faz deploy automático.
