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
- As 4 páginas pedidas + biografia em scroll na página principal.
- Formulário de orçamento em `contactos.html` (abre o cliente de email do visitante com os dados preenchidos).
- Botão flutuante de WhatsApp e barra fixa de "Pedir Orçamento" no telemóvel.
- Filtros e lightbox na galeria.

## O que precisa de substituir antes de publicar

Como não houve acesso à internet nem ao ficheiro do logótipo durante a criação deste site, todo o conteúdo é **placeholder de alta qualidade**, pronto a editar:

1. **Contactos** — edite `js/main.js`, no topo (`SITE_CONFIG`): email, telefone, número de WhatsApp, Instagram, Facebook e cidade. Estes valores alimentam automaticamente o cabeçalho, rodapé, página de contactos e botão de WhatsApp em todas as páginas.
2. **Biografia** — texto em `index.html`, secção `id="biografia"`. Substitua pelo texto real (e números reais de anos de experiência / eventos realizados).
3. **Eventos** — datas e locais em `eventos.html` e na pré-visualização em `index.html`.
4. **Serviços e preços** — ajuste os textos e listas em `servicos.html` conforme os pacotes reais.
5. **Fotografias** — todas as imagens são placeholders visuais (ícone + gradiente). Para trocar por fotos reais:
   - Coloque as fotos em `images/`.
   - Em cada `.gallery-item`, `.bio-portrait`, etc., substitua o bloco `<div class="gallery-ph">...</div>` por `<img src="images/o-seu-ficheiro.jpg" alt="...">`.
6. **Logótipo real** — se preferir usar o ficheiro de logo original em vez da versão em CSS, substitua o bloco:
   ```html
   <span class="logo-word">NUNO</span>
   <span class="logo-x"></span>
   <span class="logo-word">GARCIA</span>
   <span class="logo-stripes"></span>
   ```
   por `<img src="images/logo.png" alt="Nuno Garcia">` em todos os locais onde aparece (cabeçalho e rodapé de cada página).
7. **Testemunhos** — substitua os exemplos em `index.html` por avaliações reais de clientes.

## Estrutura

```
index.html        → Início + biografia (scroll)
eventos.html       → Agenda de eventos
servicos.html      → Serviços e pacotes
galeria.html        → Galeria de fotos (com filtros)
contactos.html      → Formulário de orçamento + contactos
css/style.css        → Todo o design do site
js/main.js            → Menu, animações, formulário, config de contactos
```
