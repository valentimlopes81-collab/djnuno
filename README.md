# Nuno Garcia — Site do DJ

Site estático (HTML/CSS/JS puro, sem build) para o DJ Nuno Garcia. Cinco páginas: `index.html` (com a biografia em scroll), `eventos.html`, `servicos.html`, `galeria.html` e `contactos.html`, com o botão **"Pedir Orçamento"** sempre visível no cabeçalho, dentro de cada secção e numa barra fixa no telemóvel.

## Como ver o site localmente

Não precisa de instalar nada — basta um servidor estático simples:

```
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` no browser.

## O que já está pronto

- Design completo (paleta preto/dourado, tipografia forte, animações de scroll).
- Logótipo recriado em CSS puro (texto + "X" + risca diagonal), sem depender de nenhum ficheiro de imagem.
- Hero da página principal com o menu flutuante (transparente) sobreposto a uma foto de fundo, sem botões "Início" nem "Ver Galeria".
- Biografia real, lista de espaços onde já atuou, e as 3 áreas de evento (Casamentos, Corporativos, Sociais) em `eventos.html`.
- Serviços reais em `servicos.html`: Dupla DJ + Músico, Dupla DJ + Cantora, Audiovisuais e o catálogo completo da Get Wild Eventos.
- Contactos reais (telefone e email) já ligados em todo o site a partir de `js/main.js`.
- Formulário de orçamento em `contactos.html` (abre o cliente de email do visitante com os dados preenchidos).
- Botão flutuante de WhatsApp e barra fixa de "Pedir Orçamento" no telemóvel.
- Filtros e lightbox na galeria.

## O que ainda falta para o site ficar 100% completo

1. **Foto do hero** — não foi possível receber nenhuma foto real do DJ nesta sessão. Coloque a foto em `images/hero-dj.jpg` (ver comentário em `index.html` acima da secção `<!-- HERO -->` e a regra `.hero-photo` em `css/style.css`) — o site já está pronto para a usar, e mostra um fundo escuro elegante como reserva enquanto não é adicionada.
2. **Link da Get Wild Eventos** — em `servicos.html` e `eventos.html` há uma referência à Get Wild Eventos, mas não tínhamos o URL real do site. Defina-o em `js/main.js`, na linha `getwildUrl` dentro de `SITE_CONFIG` (o botão "Visitar Get Wild Eventos" fica inativo até lá).
3. **Fotografias da galeria e do retrato da biografia** — continuam a ser placeholders visuais (ícone + gradiente), já com legendas de espaços reais onde o Nuno já atuou. Para trocar por fotos reais:
   - Coloque as fotos em `images/`.
   - Em cada `.gallery-item`, `.bio-portrait`, etc., substitua o bloco `<div class="gallery-ph">...</div>` por `<img src="images/o-seu-ficheiro.jpg" alt="...">`.
4. **Logótipo em ficheiro** — se preferir usar o ficheiro de logo original em vez da versão em CSS, substitua o bloco:
   ```html
   <span class="logo-word">NUNO</span>
   <span class="logo-x"></span>
   <span class="logo-word">GARCIA</span>
   <span class="logo-stripes"></span>
   ```
   por `<img src="images/logo.png" alt="Nuno Garcia">` em todos os locais onde aparece (cabeçalho e rodapé de cada página).
5. **Redes sociais** — `js/main.js` (`SITE_CONFIG.instagram` / `.facebook`) ainda aponta para handles genéricos (`djnunogarcia`); confirme se estão corretos.
6. **Testemunhos** — a secção de testemunhos com citações de clientes foi removida (eram exemplos fictícios, e não é correto publicar avaliações inventadas atribuídas a clientes que não existem). Se quiser reintroduzi-la, use apenas avaliações reais de clientes.

## Estrutura

```
index.html        → Início + biografia (scroll)
eventos.html       → Casamentos, Eventos Corporativos, Eventos Sociais + parceria Get Wild
servicos.html      → Dupla DJ+Músico, Dupla DJ+Cantora, Audiovisuais, Outros Serviços
galeria.html        → Galeria de fotos (com filtros)
contactos.html      → Formulário de orçamento + contactos
css/style.css        → Todo o design do site
js/main.js            → Menu, animações, formulário, config de contactos (SITE_CONFIG)
```

## Publicar em produção (Vercel)

Este é um site estático puro — não precisa de build nem de configuração especial no Vercel: basta ligar este repositório GitHub a um projeto Vercel (Framework Preset: "Other"/nenhum, sem build command, output = raiz do repositório). Depois disso, cada push/merge para o branch de produção (normalmente `main`) faz deploy automático.
