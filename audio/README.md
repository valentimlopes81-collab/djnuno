# Áudio do leitor de música (mini-player do cabeçalho)

Todos os sons pertencem ao DJ Nuno Garcia e tocam no pequeno leitor de música
que aparece à esquerda do logótipo no cabeçalho (versão PC, para já).

```
audio/
  tracks/   → ficheiros .mp3
  covers/   → capa de cada som (.jpg ou .png), pode ter o nome que quiser
```

## Como adicionar um som

1. Coloque o ficheiro `.mp3` em `audio/tracks/`.
2. Coloque a capa correspondente (imagem quadrada, ex: 500x500px) em `audio/covers/`.
3. Abra `js/player.js` e acrescente uma linha à lista `PLAYER_TRACKS` no topo do
   ficheiro, com o nome exato dos dois ficheiros e o título a mostrar:

   ```js
   { file: "nome-do-ficheiro.mp3", cover: "nome-da-capa.jpg", title: "Nome da Faixa" },
   ```

Sem nenhuma faixa na lista, o leitor fica escondido em todas as páginas.

Este site é estático (sem base de dados nem upload por admin), por isso não é
possível descobrir os ficheiros automaticamente: a lista em `js/player.js` é
que diz ao leitor quais os ficheiros a usar. O `title` de cada faixa é o nome
curto que aparece no leitor — pode ser diferente do nome do ficheiro `.mp3`
(que pode manter o nome completo original).

## Como funciona

- **Ordem aleatória por visita**: a ordem de reprodução é baralhada de novo
  sempre que se entra no site (novo separador/nova visita); enquanto se
  navega de página em página nessa mesma visita, a ordem mantém-se (guardada
  em `sessionStorage`, que dura só enquanto o separador estiver aberto).
- O leitor mantém a faixa atual, a posição, o volume e se está aberto ou
  fechado guardados no `localStorage` do browser — por isso a música não
  recomeça do zero quando navega de página em página (embora, por ser um
  site estático sem "app shell", haja sempre um pequeno corte de som durante
  o próprio carregamento da página seguinte — isso não há como evitar sem
  reescrever o site como aplicação de página única).
- Ao terminar a última faixa da ordem, volta a tocar a primeira (loop).
- Sem capa correspondente, mostra uma capa genérica em vez de aparecer
  partido. Pode usar a mesma imagem de capa para todas as faixas, como está
  agora.
