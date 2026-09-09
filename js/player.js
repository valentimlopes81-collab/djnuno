/* ==========================================================================
   NUNO GARCIA — DJ | Mini-player de áudio (cabeçalho, versão PC)
   ========================================================================== */

/* Lista de sons do leitor. Todos pertencem ao DJ Nuno Garcia.
   Vazia por omissão — o leitor fica escondido em todo o site até se
   acrescentar aqui a primeira faixa. Ver audio/README.md para o passo a
   passo (colocar o mp3 em audio/tracks/, a capa em audio/covers/, e
   acrescentar uma linha aqui). A ordem aqui não importa: a ordem de
   reprodução é baralhada de novo em cada nova visita (ver mais abaixo). */
const PLAYER_TRACKS = [
  { file: "ANOTR, 54 Ultra - Talk To You (Oscar Velazquez House Mix) FREE DOWNLOAD.mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Talk To You" },
  { file: "Calling to Blame, Scared To Be Lonely (Nuno Garcia Mashup Mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Calling to Blame / Scared to Be Lonely" },
  { file: "DJ Nuno Garcia - Amor (Original Tech Mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Amor" },
  { file: "FREE DL_ Shimza, AR_CO & Kasango - Fire Fire (Berat OZ & Orhan Aydin Remix) [MDM024].mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Fire Fire (Berat Öz Remix)" },
  { file: "Forget The World (DJ Nuno Garcia Dub Mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Forget The World (Dub Mix)" },
  { file: "Forget the World (DJ Nuno Garcia Main Mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Forget The World (Main Mix)" },
  { file: "HUGEL X Topic X Arash Feat. Daecolm - I Adore You (Loup Musa Remix) (Filtered Version).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "I Adore You" },
  { file: "Insomnia To Voices in My Head (Nuno Garcia Bootleg Mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Insomnia / Voices in My Head" },
  { file: "Let You Down in The Magic Room (Nuno Garcia Bootleg Original Mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Let You Down in The Magic Room" },
  { file: "Music is The Answer ( Nuno Garcia Remix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Music Is The Answer" },
  { file: "Preach (You Make It) (Nuno Garcia Main Club Mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Preach (You Make It)" },
  { file: "Rampa - The Church (Luch 4_4 Re-Touch).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "The Church" },
  { file: "Rapture To Mystify (Nuno Garcia Mashup Mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Rapture / Mystify" },
  { file: "Return To Oz To Back To Black (Nuno Garcia Reconstruction Mix ).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Return to Oz / Back to Black" },
  { file: "Santti & Malifoo Feat. Tryce - Lovezinho (Nuno Garcia Reconstruction extended Mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Lovezinho" },
  { file: "Secret ID VS Besito Coca Cola (Nuno Garcia Mashup Mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Secret ID vs. Besito Coca Cola" },
  { file: "Shimza x AR_CO x Kasango - Fire Fire (millforlife Remix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Fire Fire (millforlife Remix)" },
  { file: "Thriller (Halloween Nuno Garcia Reconstruction mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "Thriller (Halloween Mix)" },
  { file: "World, Hold On, Si Antes Te Hubiera Conocido (Nuno Garcia Reconstruction mix).mp3", cover: "Captura de ecrã 2026-09-09 010153.png", title: "World Hold On / Si Antes Te Hubiera Conocido" },
];

(function () {
  const TRACKS_BASE = "/audio/tracks/";
  const COVERS_BASE = "/audio/covers/";
  const DEFAULT_COVER = "/images/audio-cover-placeholder.svg";
  const STORAGE_KEY = "djng_player_state_v1";
  const ORDER_KEY = "djng_player_order_v1";

  let state = {
    trackIndex: 0,
    currentTime: 0,
    isPlaying: false,
    volume: 0.8,
    expanded: false,
  };

  /* Ordem de reprodução: baralhada uma vez por visita (sessionStorage — dura
     enquanto o separador estiver aberto, mesmo mudando de página; uma nova
     visita, ou um novo separador, gera uma ordem nova). */
  function getPlaylist() {
    let order = null;
    try {
      const raw = sessionStorage.getItem(ORDER_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === PLAYER_TRACKS.length) order = parsed;
      }
    } catch (e) {
      /* segue sem sessionStorage */
    }
    if (!order) {
      order = PLAYER_TRACKS.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      try {
        sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
      } catch (e) {
        /* ignora — não é crítico */
      }
    }
    return order.map((i) => PLAYER_TRACKS[i]);
  }

  function loadState(playlistLength) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      state = Object.assign({}, state, saved);
      if (state.trackIndex < 0 || state.trackIndex >= playlistLength) {
        state.trackIndex = 0;
      }
    } catch (e) {
      /* localStorage indisponível (modo privado, etc.) — segue com os valores por omissão */
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignora — não é crítico */
    }
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function init() {
    if (!PLAYER_TRACKS.length) return;
    const playlist = getPlaylist();
    loadState(playlist.length);

    const player = document.getElementById("mini-player");
    if (!player) return;

    const toggle = document.getElementById("mpToggle");
    const toggleCover = document.getElementById("mpToggleCover");
    const cover = document.getElementById("mpCover");
    const title = document.getElementById("mpTitle");
    const iconPlay = document.getElementById("mpIconPlay");
    const iconPause = document.getElementById("mpIconPause");
    const volumeSlider = document.getElementById("mpVolume");
    const seekSlider = document.getElementById("mpSeek");
    const currentTimeEl = document.getElementById("mpCurrentTime");
    const durationEl = document.getElementById("mpDuration");
    const audio = document.getElementById("mpAudio");

    const withFallback = (imgEl, src) => {
      imgEl.onerror = () => {
        imgEl.onerror = null;
        imgEl.src = DEFAULT_COVER;
      };
      imgEl.src = src;
    };

    function applyExpandedUI() {
      player.classList.toggle("is-open", state.expanded);
      toggle.setAttribute("aria-expanded", String(state.expanded));
    }

    function updatePlayIcon() {
      const playing = !audio.paused && !audio.ended;
      iconPlay.hidden = playing;
      iconPause.hidden = !playing;
      player.classList.toggle("is-playing", playing);
    }

    function updateSeekUI() {
      const dur = audio.duration || 0;
      seekSlider.max = "1000";
      seekSlider.value = dur ? String((audio.currentTime / dur) * 1000) : "0";
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent = formatTime(dur);
      const pct = dur ? (audio.currentTime / dur) * 100 : 0;
      seekSlider.style.setProperty("--mp-fill", pct + "%");
    }

    function loadTrack(index, { resumeTime = 0, autoplay = false } = {}) {
      state.trackIndex = ((index % playlist.length) + playlist.length) % playlist.length;
      const track = playlist[state.trackIndex];

      audio.src = TRACKS_BASE + encodeURIComponent(track.file);
      title.textContent = track.title || track.file;
      const coverSrc = track.cover ? COVERS_BASE + encodeURIComponent(track.cover) : DEFAULT_COVER;
      withFallback(cover, coverSrc);
      withFallback(toggleCover, coverSrc);

      const start = () => {
        if (resumeTime > 0) audio.currentTime = resumeTime;
        if (autoplay) {
          audio.play().catch(() => {
            state.isPlaying = false;
            updatePlayIcon();
            saveState();
          });
        }
        updateSeekUI();
      };
      audio.addEventListener("loadedmetadata", start, { once: true });
    }

    function playPause() {
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }

    function next() {
      const wasPlaying = !audio.paused;
      loadTrack(state.trackIndex + 1, { autoplay: wasPlaying });
      saveState();
    }

    function prev() {
      const wasPlaying = !audio.paused;
      loadTrack(state.trackIndex - 1, { autoplay: wasPlaying });
      saveState();
    }

    toggle.addEventListener("click", () => {
      state.expanded = true;
      applyExpandedUI();
      saveState();
    });

    player.querySelector('[data-mp="close"]').addEventListener("click", () => {
      state.expanded = false;
      applyExpandedUI();
      saveState();
    });

    player.querySelector('[data-mp="playpause"]').addEventListener("click", playPause);
    player.querySelector('[data-mp="prev"]').addEventListener("click", prev);
    player.querySelector('[data-mp="next"]').addEventListener("click", next);

    volumeSlider.addEventListener("input", () => {
      audio.volume = parseFloat(volumeSlider.value);
      state.volume = audio.volume;
      saveState();
    });

    let isSeeking = false;
    seekSlider.addEventListener("input", () => {
      isSeeking = true;
      const dur = audio.duration || 0;
      if (dur) {
        audio.currentTime = (parseFloat(seekSlider.value) / 1000) * dur;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        seekSlider.style.setProperty("--mp-fill", (parseFloat(seekSlider.value) / 10) + "%");
      }
    });
    seekSlider.addEventListener("change", () => {
      isSeeking = false;
    });

    audio.addEventListener("timeupdate", () => {
      if (isSeeking) return;
      updateSeekUI();
      state.currentTime = audio.currentTime;
    });
    audio.addEventListener("play", () => {
      state.isPlaying = true;
      updatePlayIcon();
      saveState();
    });
    audio.addEventListener("pause", () => {
      state.isPlaying = false;
      updatePlayIcon();
      saveState();
    });
    audio.addEventListener("ended", () => {
      loadTrack(state.trackIndex + 1, { autoplay: true });
    });

    window.addEventListener("beforeunload", () => {
      state.currentTime = audio.currentTime;
      saveState();
    });

    player.hidden = false;
    audio.volume = state.volume;
    volumeSlider.value = String(state.volume);
    applyExpandedUI();
    loadTrack(state.trackIndex, { resumeTime: state.currentTime, autoplay: state.isPlaying });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
